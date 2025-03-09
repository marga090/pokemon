import { Ability } from "./ability";
import { Move } from "./move";
import { Specie } from "./specie";
import { Type } from "./type";

export class PokemonDetail{
    private _id: number;
    private _name: string;
    private _weight: string;
    private _height: string;
    private _image: string;
    private _types: Type[];
    private _moves: Move[];
    private _abilities: Ability[];
    private _species: Specie;
    private _cries: string;

    constructor(id: number, name: string, weight: string, height: string, image: string, types: Type[], moves: Move[], abilities: Ability[], species: Specie, cries: string){
        this._name = name;
        this._id = id;
        this._weight = weight;
        this._height = height;
        this._image = image;
        this._types = types;
        this._moves = moves;
        this._abilities = abilities;
        this._species = species;
        this._cries = cries;
    }

    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get weight(): string { return this._weight; }
    public set weight(value: string) { this._weight = value; }
    public get height(): string { return this._height; }
    public set height(value: string) { this._height = value; }
    public get image(): string { return this._image; }
    public set image(value: string) { this._image = value; }
    public get types(): Type[] { return this._types; }
    public set types(value: Type[]) { this._types = value; }
    public get moves(): Move[] { return this._moves; }
    public set moves(value: Move[]) { this._moves = value; }
    public get abilities(): Ability[] { return this._abilities; }
    public set abilities(value: Ability[]) { this._abilities = value; }
    public get species(): Specie { return this._species; }
    public set species(value: Specie) { this._species = value; }
    public get cries(): string { return this._cries; }
    public set cries(value: string) { this._cries = value; }
    
}