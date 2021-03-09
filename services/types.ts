
export interface Rule {
    check(...args: unknown[]): string|null;
}

export interface Data {
    [key: string] : unknown;
}

export interface Request {
    (data: Data) : void;
}

export interface Form {
    fields: Field[];
    request: Request | null;

    submit(): boolean;
    detach(el: Field): void;
    register(el: Field): void;
}

export interface Field {
    name: string;

    focus(): void;
    compute(): unknown;
    validate(): boolean;
}