import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonDetail } from '../../models/pokemon-detail';
import { Move } from '../../models/move';
import { MoveService } from '../../services/move.service';
import { Type } from '../../models/type';
import { TypeService } from '../../services/type.service';
import { Ability } from '../../models/ability';
import { AbilityService } from '../../services/ability.service';
import { SpeciesService } from '../../services/species.service';
import { Specie } from '../../models/specie';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{

  private _location: Location;
  private _pokemonService: PokemonService;
  private _moveService: MoveService;
  private _typeService: TypeService;
  private _abilityService: AbilityService;
  private _specieService: SpeciesService;
  private _route: ActivatedRoute;
  public pokemon: PokemonDetail | null = null;
  public moves: Move[] = [];
  public types: Type[] = [];
  public abilities: Ability[] = [];
  public specie: Specie | null = null;
  public id: number = 0;
  public cries: string = "";

  constructor(location: Location, pokemonService: PokemonService, route: ActivatedRoute, moveService: MoveService, typeService: TypeService, abilityService: AbilityService, specieService: SpeciesService){
    this._pokemonService = pokemonService;
    this._route = route;
    this._location = location;
    this._moveService = moveService;
    this._typeService = typeService;
    this._abilityService = abilityService;
    this._specieService = specieService;
  }

  public ngOnInit(): void {
    let idParam = this._route.snapshot.paramMap.get("id");
    if(idParam){
      this.id = Number(idParam);
    }

    if(this.id){
      this._pokemonService.getDetail(this.id).subscribe(
        (data:any) => {
          this.pokemon = data;
          this.cries = data.cries.legacy;
          }
      );

      //Obtener datos de la especie
      if(this.pokemon?.species != null){
        this._specieService.getDetail(this.pokemon.species.url).subscribe(
          (data:any) => {
            const specie: Specie = data;
            specie.name = this.getNameByLanguage(data.names, 'es');
            specie.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
            specie.isLegend = data.is_legendary;
            specie.isSingular = data.is_mythical;
            this.specie = specie;
          }
        );
      }

      //Obtener las habilidades
      this.pokemon?.abilities.forEach(
        (data:any)=>{
          this._abilityService.getDetail(data.ability.url).subscribe(
            (data:any)=>{
              const ability: Ability = data;
              ability.name = this.getNameByLanguage(data.names, 'es');
              ability.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
              this.abilities.push(ability);
            }
          );
          
        }
      );

      //Obtener los tipos
      this.pokemon?.types.forEach(
        (data:any)=>{
          this._typeService.getDetail(data.type.url).subscribe(
            (data:any) =>{
              const type: Type = data;
              type.name = this.getNameByLanguage(data.names,'es');
              type.image = this.getTypeImageById(type.id);
              this.types.push(type);
            }
          )
          
        }
      );

      //Obtener los movimientos
      this.pokemon?.moves.forEach(
        (data:any) => {
          this._moveService.getDetail(data.move.url).subscribe(
            (data:any) => {
              const move: Move = data;
              move.name = this.getNameByLanguage(data.names, 'es');
              move.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
              this.moves.push(move);
            }
          )
        }
      );
    }

  }

  getTypeImageById(id: number): string{
    const urlImageType = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/xd/";

    return urlImageType + id + ".png";
  }

  //Traduccion del nombre del movimiento al español
  getNameByLanguage(names: string[], language: string): string{
    let result = "";
    names.forEach((name:any)=>{
      if(name.language.name == language){
        result = name.name;
      }
    });
    return result;
  }

  //Traduccion del efecto del movimiento al español
  getDescByLanguage(names: string[], language: string): string{
    let result = "";
    names.forEach((flavor_text:any)=>{
      if(flavor_text.language.name == language){
        result = flavor_text.flavor_text;
      }
    });
    return result;
  }

  goBack(): void {
    this._location.back();
  }

  goPrev(): string {
    return "/detail/" + (this.id - 1);
  }

  goNext(): string {
    return "/detail/" + (this.id + 1);
  }

  getImageByPokemon(pokemonDetail: PokemonDetail, shiny: boolean = false){
    let urlImage: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    if(shiny){
      urlImage += "shiny/"
    }
    return urlImage + pokemonDetail?.id + ".png";
  }

  capitalizeFirstLetter(text: string ): string {
      return text.charAt(0).toUpperCase() + text.slice(1);
  }

  playAudio(audio: HTMLAudioElement): void {
    audio.play();
  }

  pauseAudio(audio: HTMLAudioElement): void {
    audio.pause();
  }

  stopAudio(audio: HTMLAudioElement): void {
    audio.pause();
    audio.currentTime = 0; // Reset playback position
  } 

}
