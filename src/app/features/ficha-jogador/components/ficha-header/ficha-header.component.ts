import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RpgSystemType } from '../../../../core/constants/rpg.constants';

@Component({
  selector: 'app-ficha-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-header.component.html',
  styleUrl: './ficha-header.component.scss'
})
export class FichaHeaderComponent {
  @Input() jogador: any;
  @Input() isCyberPun2080 = false;
  @Input() estaAutenticado = false;
  @Input() descricaoSessao = '';
  @Input() fichaSelecionadaId = '';
  @Input() sincronizandoComServidor = false;
  @Input() erroSincronizacao = '';
  @Input() mensagemSessao = '';
  @Input() systemOptions: Array<{ id: RpgSystemType; nome: string }> = [];

  @Output() trocarFichaDaConta = new EventEmitter<void>();
  @Output() criarNovaFichaNaConta = new EventEmitter<void>();
  @Output() abrirEditarFicha = new EventEmitter<void>();
  @Output() selecionarSistema = new EventEmitter<RpgSystemType>();
  @Output() baixarJogador = new EventEmitter<void>();
  @Output() jogadorImportado = new EventEmitter<any>();
  @Output() confirmarLimparCache = new EventEmitter<void>();

  onSistemaChange(valor: unknown): void {
    this.selecionarSistema.emit(valor as RpgSystemType);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result;
      if (typeof content !== 'string') {
        return;
      }

      try {
        const parsed = JSON.parse(content);
        this.jogadorImportado.emit(parsed);
      } catch {
        // Mantém comportamento resiliente sem quebrar a UI por JSON inválido.
      }
    };
    reader.readAsText(file);
  }
}
