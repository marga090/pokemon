import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon';

import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string = '';
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}


  searchPokemon(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  }

