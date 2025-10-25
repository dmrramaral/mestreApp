import { Component, inject } from '@angular/core';
import { ThemeService } from '../core/services/theme.service';
import { PwaService } from '../core/services/pwa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  pwaService = inject(PwaService);

  constructor() {
    this.pwaService.captureInstallEvent();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  async installPwa(): Promise<void> {
    const installed = await this.pwaService.showInstallPrompt();
    if (installed) {
      console.log('PWA instalado com sucesso!');
    }
  }

  getThemeIcon(): string {
    const theme = this.themeService.theme();
    if (theme === 'auto') {
      return 'fas fa-adjust';
    }
    return this.themeService.isDark() ? 'fas fa-sun' : 'fas fa-moon';
  }

  getThemeLabel(): string {
    const theme = this.themeService.theme();
    if (theme === 'light') {
      return 'Mudar para tema escuro';
    } else if (theme === 'dark') {
      return 'Mudar para tema automático';
    } else {
      return 'Mudar para tema claro';
    }
  }
}
