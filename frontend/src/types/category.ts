/**
 * ============================================================================
 * Category Type
 * ============================================================================
 */

export interface Category {

    id: number;

    name: string;

    slug: string;

    description: string | null;

    achievements_count: number;

    created_at: string;

    updated_at: string;

}
