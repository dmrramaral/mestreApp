import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PwaService } from '../../../core/services/pwa.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  pwaService = inject(PwaService);
  authService = inject(AuthService);

  constructor() { }

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

  getUserAvatarUrl(): string {
    const u = this.authService.usuarioAtual;
    if (u?.avatar) return u.avatar;
    const inicial = (u?.nome || '?')[0].toUpperCase();
    return `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2216%22 fill=%22%23667eea%22/%3E%3Ctext x=%2216%22 y=%2221%22 text-anchor=%22middle%22 font-size=%2216%22 font-family=%22sans-serif%22 fill=%22white%22%3E${inicial}%3C/text%3E%3C/svg%3E`;
  }
}
