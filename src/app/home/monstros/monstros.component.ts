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
  styleUrls: ['./monstros.component.scss']
})
export class MonstrosComponent {

  monstros : any;

  filter = {
    name: '',
    alignment: '',
    size: '',
    type: '',
    xp: ''
  };

  monsterTypes: any[] = [];

  names: any[] = [];
  alignments: any[] = [];
  sizes: any[] = [];
  types: any[] = [];
  xp: any[] = [];

 
  constructor(private monstrosService : MonstrosService) { }

  ngOnInit() {
    this.monstrosService.getMonstros().subscribe((data: any) => {
      this.monstros = data;
      this.types = [...new Set(this.monstros.map((monster: any) => monster.type as string))].sort((a, b) => (a as string).localeCompare(b as string));
      this.sizes = [...new Set(this.monstros.map((monster: any) => monster.size))].sort((a, b) => (a as string).localeCompare(b as string));
      this.alignments = [...new Set(this.monstros.map((monster: any) => monster.alignment as string))].sort((a, b) => (a as string).localeCompare(b as string));
      this.names = Array.from(new Set(this.monstros.map((monster: any) => monster.name as string))).sort((a, b) => (a as string).localeCompare(b as string));
      this.xp = [...new Set(this.monstros.map((monster: any) => monster.xp))].sort((a, b) => (a as number) - (b as number));
  
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
