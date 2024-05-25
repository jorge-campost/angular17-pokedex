import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-image',
  standalone: true,
  imports: [NgIf],
  templateUrl: './pokemon-image.component.html',
  styleUrl: './pokemon-image.component.scss'
})
export class PokemonImageComponent {
  @Input() pokemon?: Pokemon;
}
