import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NamedApiResource } from '../../models/pokemon.model';
import { NgIf, TitleCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgIf, TitleCasePipe],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent implements OnChanges {
  pokemonService = inject(PokemonService)
  @Input() data?: NamedApiResource;
  id?: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.extractId()
  }

  extractId() {
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      this.pokemonService.getById(this.id).subscribe(data => {
        // console.log(data);
      });
    }
  }


}
