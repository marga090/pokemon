import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public pokemons: Pokemon[] = [];
  public filteredPokemons: Pokemon[] = [];
  public nextPage: string | null = "";
  public prevPage: string | null = "";
  public searchTerm: string = "";

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonList();
  }

  private getPokemonList(url: string = ""): void {
    this.pokemonService.getList(url || undefined).subscribe(
      (data: any) => {
        const { next, previous, results } = data;
        this.pokemons = results;
        this.filteredPokemons = this.pokemons;
        this.nextPage = next;
        this.prevPage = previous;
      },
      (error) => {
        console.error("Error obteniendo la lista de Pokémon:", error);
      }
    );
  }

  public next(): void {
    if (this.nextPage) {
      this.getPokemonList(this.nextPage);
    }
  }

  public prev(): void {
    if (this.prevPage) {
      this.getPokemonList(this.prevPage);
    }
  }

  public getImageByPokemon(pokemon: Pokemon): string {
    const urlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    const urlSplitted = pokemon.url.split("/");
    const id = urlSplitted[urlSplitted.length - 2];
    return `${urlImage}${id}.png`;
  }

  public getUrlDetailPokemon(pokemon: Pokemon): string {
    const urlSplitted = pokemon.url.split("/");
    return `/detail/${urlSplitted[urlSplitted.length - 2]}`;
  }

  public capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  public searchPokemon(): void {
    if (!this.pokemons) return;
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

