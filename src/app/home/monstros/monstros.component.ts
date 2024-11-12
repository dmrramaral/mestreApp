import { Component } from '@angular/core';
import { MonstrosService } from './monstros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monstros',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './monstros.component.html',
  styleUrl: './monstros.component.scss'
})
export class MonstrosComponent {

  monstros : any;

  filter = {
    name: '',
    alignment: '',
    size: '',
    type: ''
  };

  monsterTypes: any[] = [];

  name: any[] = [];
  alignments: any[] = [];
  sizes: any[] = [];
  types: any[] = [];

 
  constructor(private monstrosService : MonstrosService) { }

  ngOnInit() {
    this.monstrosService.getMonstros().subscribe((data: any) => {
      console.log(data);
      this.monstros = data;
      this.types = [...new Set(this.monstros.map((monster: any) => monster.type))];
      this.sizes = [...new Set(this.monstros.map((monster: any) => monster.size))];
      this.alignments = [...new Set(this.monstros.map((monster: any) => monster.alignment))];
      this.name = [...new Set(this.monstros.map((monster: any) => monster.name))];;  
    });
  }

  applyFilters() {
    this.monstrosService.getMonstros().subscribe((data: any) => {
      this.monstros = data.filter((monstro: any) => {
        return (this.filter.name ? monstro.name.includes(this.filter.name) : true) &&
               (this.filter.alignment ? monstro.alignment === this.filter.alignment : true) &&
               (this.filter.size ? monstro.size === this.filter.size : true) &&
               (this.filter.type ? monstro.type === this.filter.type : true);
      });
    });
  }




}
