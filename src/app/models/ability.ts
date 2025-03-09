export class Ability{
    private _id: number;
    private _name: string;
    private _url: string;
    private _desc: string;

    constructor(id: number, name: string, url: string, desc: string){
        this._id = id;
        this._name = name;
        this._url = url;
        this._desc = desc;
    }

    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get url(): string { return this._url; }
    public set url(value: string) { this._url = value; }
    public get desc(): string { return this._desc; }
    public set desc(value: string) { this._desc = value; }
}