// ------------ subnivel ------------
export interface NormSubItem {
    id: number;
    name: string;
    interpretation: string;
    created_at: string;
    updated_at: string;
    item: number;
    example_files: unknown[];      // ajusta si necesitas tipar estos archivos
}

// ------------ nivel intermedio ------------
export interface NormItem {
    id: number;
    name: string;
    norm: number;
    created_at: string;
    updated_at: string;
    subitems: NormSubItem[];
}

// ------------ raíz ------------
export interface Norm {
    id: number;
    code: string;
    organization: string;
    title: string;
    version_year: number;
    description: string;
    about: string;
    video_link: string;
    category: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    files: unknown[];             // idem: tipa si tienes estructura
    items: NormItem[];
}

export interface NormApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Norm[];
}
