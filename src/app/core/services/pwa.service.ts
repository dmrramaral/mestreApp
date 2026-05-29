import { ApplicationRef, Injectable, NgZone, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { filter, first } from 'rxjs/operators';

const BANNER_DISMISSED_KEY = 'pwa-install-banner-dismissed';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  /** Evento `beforeinstallprompt` capturado (Android/Chrome) */
  private promptEvent = signal<any>(null);

  /** Controla visibilidade reativa do banner */
  readonly bannerVisible = signal(false);

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private ngZone: NgZone
  ) {
    this.init();
  }

  private init(): void {
    if (typeof window === 'undefined') return;

    // 1. Recupera evento capturado antes do Angular carregar (via index.html)
    const earlyEvent = (window as any).__pwaInstallEvent;
    if (earlyEvent) {
      this.promptEvent.set(earlyEvent);
      (window as any).__pwaInstallEvent = null;
      this.updateBannerVisibility();
    }

    // 2. Listener para eventos que chegam depois da inicialização
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      // NgZone.run garante que o Angular detecta a mudança e re-renderiza o template
      this.ngZone.run(() => {
        this.promptEvent.set(event);
        this.updateBannerVisibility();
      });
    });

    // 3. iOS não dispara beforeinstallprompt — mostra banner com instruções manuais
    if (this.isIos() && !this.isInstalled) {
      this.ngZone.run(() => this.updateBannerVisibility());
    }

    if (this.swUpdate.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      concat(appIsStable$, everySixHours$).subscribe(async () => {
        try {
          await this.swUpdate.checkForUpdate();
        } catch (err) {
          console.error('Erro ao verificar atualizações', err);
        }
      });

      this.swUpdate.versionUpdates
        .pipe(filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          }
        });

      this.swUpdate.unrecoverable.subscribe(() => {
        if (confirm('Ocorreu um erro. A aplicação precisa ser recarregada. Deseja recarregar agora?')) {
          window.location.reload();
        }
      });
    }
  }

  private updateBannerVisibility(): void {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    const canShow = !this.isInstalled && !dismissed && (!!this.promptEvent() || this.isIos());
    this.bannerVisible.set(canShow);
  }

  /** Exibe o prompt nativo de instalação (Android/Chrome) */
  async showInstallPrompt(): Promise<boolean> {
    const event = this.promptEvent();
    if (!event) return false;

    event.prompt();
    const result = await event.userChoice;
    this.promptEvent.set(null);
    return result.outcome === 'accepted';
  }

  /** Dispensa o banner e grava no localStorage */
  dismissBanner(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(BANNER_DISMISSED_KEY, '1');
    }
    this.bannerVisible.set(false);
  }

  /** Detecta dispositivos iOS (iPhone / iPad / iPod) */
  isIos(): boolean {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  /** Verifica se o app já está instalado (modo standalone) */
  get isInstalled(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  // Mantido por compatibilidade com o botão no header
  captureInstallEvent(): void {}
  get canInstall(): boolean { return !!this.promptEvent(); }
  get showBanner(): boolean { return this.bannerVisible(); }
}
