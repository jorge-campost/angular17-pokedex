import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { NamedApiResource } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { ListItemComponent } from '../list-item/list-item.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ListItemComponent, NgFor, NgIf],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  pokemonService = inject(PokemonService)
  pokemonList: NamedApiResource[] = [];
  pageCounter = 1;
  @ViewChild("container") containeRef!: ElementRef;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    this.pokemonService.getByPage(this.pageCounter).subscribe(data => {
      this.pokemonList = [...this.pokemonList, ...data];
      this.pageCounter++;
      this.isLoading = false;
    });
  }

  onScroll(event: Event) {
    if (this.isLoading) return;

    const target = event.target as HTMLElement;
    if (target) {
      if (Math.round(this.containeRef.nativeElement.clientHeight + this.containeRef.nativeElement.scrollTop) === target.scrollHeight) {
        this.loadData();
      }
    }
  }

}
