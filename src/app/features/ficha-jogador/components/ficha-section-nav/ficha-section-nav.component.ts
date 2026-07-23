import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ficha-section-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-section-nav.component.html',
  styleUrl: './ficha-section-nav.component.scss'
})
export class FichaSectionNavComponent {
  @Input() isDnd5e = false;
}
