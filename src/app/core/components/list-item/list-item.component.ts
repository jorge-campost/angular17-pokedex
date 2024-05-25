import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { NamedApiResource } from '../../models/pokeapi.model';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgIf, TitleCasePipe, NgClass],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent implements OnChanges {

  pokemonService = inject(PokemonService);
  @Input() data?: NamedApiResource;
  @Input() selected?: boolean = false;
  @Input() allData?: Pokemon;
  @Output() selectedPokemonEvent = new EventEmitter<string>();

  id?: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.extractId()
  }

  extractId() {
    if (this.data && this.data.url !== "") {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      return;
    }

    if (this.allData) {
      this.id = this.allData.species.url.substring(42, this.allData.species.url.length - 1);
      this.data = {
        name: this.allData.species.name,
        url: ""
      }
    }
  }
}
