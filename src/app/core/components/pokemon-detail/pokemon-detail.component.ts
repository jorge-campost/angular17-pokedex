import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Pokemon } from '../../models/pokemon.model';
import { NgClass, NgFor } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    ListItemComponent, NgFor, NgClass
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnChanges {
  pokemonService = inject(PokemonService);
  description: string = ""
  @Input() pokemon?: Pokemon;
  @Input() isOpen?: boolean;
  @Output() changeOpen = new EventEmitter();

  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokemonService.getDescription(this.pokemon.id + "").subscribe((data: any) => {
        const text = data.flavor_text_entries.find((t: any) => t.language.name === "es");
        this.description = text.flavor_text;
      });
    }
  }
}
