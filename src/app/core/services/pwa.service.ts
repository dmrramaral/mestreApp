import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { filter, first } from 'rxjs/operators';

/**
 * Serviço para gerenciar atualizações do Progressive Web App
 * Monitora e notifica sobre novas versões disponíveis
 */
const BANNER_DISMISSED_KEY = 'pwa-install-banner-dismissed';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.init();
  }

  /**
   * Inicializa o serviço de PWA
   */
  private init(): void {
    // Registra o evento de instalação o mais cedo possível
    this.captureInstallEvent();

    if (this.swUpdate.isEnabled) {
      // Verifica atualizações quando o app fica estável
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(async () => {
        try {
          const updateFound = await this.swUpdate.checkForUpdate();
          console.log(updateFound ? 'Nova versão disponível' : 'Já está na versão mais recente');
        } catch (err) {
          console.error('Erro ao verificar atualizações', err);
        }
      });

      // Detecta quando uma nova versão está disponível
      this.swUpdate.versionUpdates
        .pipe(filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe((evt: VersionReadyEvent) => {
          if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
            this.activateUpdate();
          }
        });

      // Detecta erros de versão não recuperáveis
      this.swUpdate.unrecoverable.subscribe((event: { reason: string }) => {
        console.error('Erro não recuperável:', event.reason);
        if (confirm('Ocorreu um erro. A aplicação precisa ser recarregada. Deseja recarregar agora?')) {
          window.location.reload();
        }
      });
    }
  }

  /**
   * Ativa a atualização e recarrega a página
   */
  private activateUpdate(): void {
    this.swUpdate.activateUpdate().then(() => {
      document.location.reload();
    });
  }

  /**
   * Captura o evento de instalação do PWA
   */
  captureInstallEvent(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.promptEvent = event;
      });
    }
  }

  /**
   * Exibe o prompt de instalação do PWA
   */
  async showInstallPrompt(): Promise<boolean> {
    if (!this.promptEvent) {
      return false;
    }

    this.promptEvent.prompt();
    const result = await this.promptEvent.userChoice;
    this.promptEvent = null;

    return result.outcome === 'accepted';
  }

  /**
   * Verifica se o prompt de instalação está disponível
   */
  get canInstall(): boolean {
    return !!this.promptEvent;
  }

  /**
   * Verifica se está rodando como PWA instalado
   */
  get isInstalled(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  /**
   * Retorna true se deve exibir o banner de instalação
   */
  get showBanner(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    return this.canInstall && !this.isInstalled && !dismissed;
  }

  /**
   * Marca o banner como dispensado (não exibe mais nessa sessão/dispositivo)
   */
  dismissBanner(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(BANNER_DISMISSED_KEY, '1');
    }
  }
}
