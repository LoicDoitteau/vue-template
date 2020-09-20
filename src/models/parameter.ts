import { ParameterType } from '@/models/enums/parameterType';

export abstract class Parameter {
    private _name: string;
    private _type: ParameterType;
    
    constructor(name: string, type: ParameterType) {
        this._name = name;
        this._type = type;
    }
    
    get name(): string {
        return this._name;
    }
    
    get type(): ParameterType {
        return this._type;
    }
}

export class ImageParameter extends Parameter {
    constructor(name: string) {
        super(name, ParameterType.IMAGE);
    }
}
