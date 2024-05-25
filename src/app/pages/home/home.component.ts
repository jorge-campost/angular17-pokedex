import { Component } from '@angular/core';
import { PokemonImageComponent } from '../../core/components/pokemon-image/pokemon-image.component';
import { ListItemComponent } from '../../core/components/list-item/list-item.component';
import { PokemonListComponent } from '../../core/components/pokemon-list/pokemon-list.component';
import { Pokemon } from '../../core/models/pokemon.model';
import { PokemonDetailComponent } from '../../core/components/pokemon-detail/pokemon-detail.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonImageComponent,
    ListItemComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedPokemon?: Pokemon;
  isOpen: boolean = false;

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  changeOpenState() {
    if (this.selectedPokemon) {
      this.isOpen = !this.isOpen;
    }
  }
}
