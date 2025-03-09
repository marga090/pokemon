export class Pokemon {
    private _name: string;
    private _url: string;

    constructor(name: string, url: string) {
        this._name = this.capitalizeFirstLetter(name);
        this._url = url;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = this.capitalizeFirstLetter(value); }
    public get url(): string { return this._url; }
    public set url(value: string) { this._url = value; }

    private capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
