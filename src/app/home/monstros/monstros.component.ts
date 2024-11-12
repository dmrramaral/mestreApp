import { Component } from '@angular/core';
import { MonstrosService } from './monstros.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monstros',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './monstros.component.html',
  styleUrl: './monstros.component.scss'
})
export class MonstrosComponent {

  monstros : any;
  constructor(private monstrosService : MonstrosService) { }

  ngOnInit() {
    this.monstrosService.getMonstros().subscribe((data: any) => {
      console.log(data);
      this.monstros = data;
    });
  }




}
