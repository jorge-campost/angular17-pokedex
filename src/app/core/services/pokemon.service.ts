import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NamedAPIResourceList, NamedApiResource } from '../models/pokemon.model';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getByPage(page: number, limit: number = 20): Observable<NamedApiResource[]> {
    const offset = limit * (page - 1);
    return this.http.get<NamedAPIResourceList>(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .pipe(
        take(1),
        map(res => {
          if (res.results.length > 0) {
            return res.results
          }
          return [];
        })
      );
  }

  getById(id: string) {
    return this.http.get<NamedAPIResourceList>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getDescription() {

  }
}
