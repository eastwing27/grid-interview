import { BaseHttpService } from "./base/base.http.service";

export class MatrixService extends BaseHttpService {
    private readonly getNumbers = (query: string) => 
        this.get(query).then(
            doc => doc.data as number[][],
            err => { throw err }
        );

    public readonly generateMatrix = (size: number) => this.getNumbers(`${size}`);

    public readonly getGroup = (x: number, y: number) => this.getNumbers(`group/${x}/${y}`);
}