import { Component, OnInit, inject } from '@angular/core';
import { PokemonImageComponent } from '../../core/components/pokemon-image/pokemon-image.component';
import { ListItemComponent } from '../../core/components/list-item/list-item.component';
import { PokemonService } from '../../core/services/pokemon.service';
import { NamedApiResource } from '../../core/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../../core/components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonImageComponent,
    ListItemComponent,
    PokemonListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
