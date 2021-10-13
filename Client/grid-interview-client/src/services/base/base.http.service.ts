import axios from 'axios'

export abstract class BaseHttpService {
    private _baseUrl: string;

    private readonly config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    private readonly getAbsoluteUrl = (query: string) => `${this._baseUrl}/${query}`;

    protected readonly get = (query: string) => 
        axios.get(this.getAbsoluteUrl(query));
}