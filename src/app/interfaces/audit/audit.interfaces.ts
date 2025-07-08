export interface Audit {
    id?: number;  // opcional si es para creación
    entity_type: 'laboratory' | 'institute';
    entity_id: number;
    auditor: number | null;
    internal_auditor: number | null;
    coordinator: number | null;
    date: string; // formato 'YYYY-MM-DD'
    status: number | null;  // ID del estado
    applicable_standard: number | null; // ID de la norma
    observations?: string;
    supporting_documents?: string;
    code?: string;
    questions: AuditQuestion[];
}

export interface AuditEdit {
    id?: number;  // opcional si es para creación
    entity_type: 'laboratory' | 'institute';
    entity_id: number;
    auditor: any | null;
    internal_auditor: any | null;
    coordinator: any | null;
    date: string; // formato 'YYYY-MM-DD'
    status: any | null;  // ID del estado
    applicable_standard: any | null; // ID de la norma
    observations?: string;
    supporting_documents?: string;
    code?: string;
    questions: AuditQuestion[];
}

export interface LaboratorioCombo {
    id: number;
    nombre: string;
    encargado_id: number | null;
    encargado_nombre?: string;
}

export interface InstitutoCombo {
    id: number;
    nombre: string;
    encargado_id: number | null;
    encargado_nombre?: string;
}

export interface AuditApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Audit[];
}

// audit-status.model.ts
export interface AuditStatus {
    id?: number;
    name: string;
    description?: string;
}


export interface AuditQuestion {
    id?: number;
    question_text: string;
    compliance: string | null;
    observations: string | null;
    supporting_document: string | null;
    audit: number;
    norm_subitem: number;
    created_at?: string;
    updated_at?: string;
}
