import { Transform } from '@/models/transform';
import { ImageParameter, Parameter } from '@/models/parameter';

export abstract class Filter {
    private _id: number;
    private _name: string;
    private _position: Transform;
    private _parameters: Parameter[];

    constructor(id: number, name: string, position: Transform) {
        this._id = id;
        this._name = name;
        this._position = position;
        this._parameters = [];
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get position(): Transform {
        return this._position;
    }

    set position(pos: Transform) {
        this._position = pos;
    }

    get parameters(): Parameter[] {
        return this._parameters;
    }

    protected set paramaters(params: Parameter[]) {
        this._parameters = params;
    }
}

export class OutputFilter extends Filter {
    constructor(id: number, position: Transform) {
        super(id, "Ouptut", position);
        this.paramaters = [ new ImageParameter("Image") ];
    }
}