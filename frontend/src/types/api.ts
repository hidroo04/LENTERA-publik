/**
 * ============================================================================
 * API Response Types
 * ============================================================================
 */

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PaginationLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];

    meta: PaginationMeta;

    links?: PaginationLinks;
}
