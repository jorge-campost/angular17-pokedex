import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { NamedApiResource } from '../../models/pokeapi.model';
import { PokemonService } from '../../services/pokemon.service';
import { ListItemComponent } from '../list-item/list-item.component';
import { NgFor, NgIf } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ListItemComponent, NgFor, NgIf],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  @ViewChild("container") containeRef!: ElementRef;
  @Output() selectedPokemonEvent = new EventEmitter<Pokemon>();
  @Output() changeOpen = new EventEmitter();

  pokemonService = inject(PokemonService)
  pokemonList: NamedApiResource[] = [];
  pageCounter = 1;
  isLoading: boolean = false;
  selectedPokemon?: Pokemon;
  isError: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    this.pokemonService.getByPage(this.pageCounter).subscribe({
      next: (res) => {
        this.pokemonList = [...this.pokemonList, ...res];
        this.pageCounter++;
        this.isLoading = false;
      },
      error: () => {
        this.isError = true;
      }
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

  async selectPokemon(pokemonId: string) {
    if (this.selectedPokemon && pokemonId === this.selectedPokemon.id.toString()) {
      this.changeOpen.emit();
    }

    this.selectedPokemon = await lastValueFrom(this.pokemonService.getById(pokemonId));
    this.selectedPokemonEvent.emit(this.selectedPokemon);
  }
}
