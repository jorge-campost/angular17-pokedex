export interface NamedAPIResourceList {
    count: number;
    next: string;
    previous: string;
    results: NamedApiResource[];
}


export interface NamedApiResource {
    name: string;
    url: string;
}

