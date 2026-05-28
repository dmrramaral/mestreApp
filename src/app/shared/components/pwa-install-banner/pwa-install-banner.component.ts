import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PwaService } from '../../../core/services/pwa.service';

@Component({
  selector: 'app-pwa-install-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pwa-install-banner.component.html',
  styleUrl: './pwa-install-banner.component.scss'
})
export class PwaInstallBannerComponent {
  pwaService = inject(PwaService);

  async install(): Promise<void> {
    const accepted = await this.pwaService.showInstallPrompt();
    if (accepted) {
      this.pwaService.dismissBanner();
    }
  }

  dismiss(): void {
    this.pwaService.dismissBanner();
  }
}
