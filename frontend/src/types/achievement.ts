import type { Category } from "./category";

/**
 * ============================================================================
 * Achievement Type
 * ============================================================================
 */

export interface Achievement {

    id: number;

    title: string;

    slug: string;

    recipient: string;

    organizer: string;

    level:
        | "Kabupaten"
        | "Provinsi"
        | "Nasional"
        | "Internasional";

    achievement_date: string | null;

    description: string;

    short_description: string;

    level_badge:
        | "secondary"
        | "info"
        | "success"
        | "danger"
        | "primary";

    status: {

        published: boolean;

        label: string;

    };

    is_featured: boolean;

    featured_label: string;

    thumbnail_url: string | null;

    attachment_url?: string | null;

    featured: boolean;

    is_published: boolean;

    published_at: string | null;

    category: Pick<Category, "id" | "name" | "slug">;

    creator: {

        id: number | null;

        name: string | null;

        email: string | null;

    };

    created_at: string;

    updated_at: string;

}

/**
 * ============================================================================
 * Achievement Filters
 * ============================================================================
 */

export interface AchievementFilters {

    search?: string;

    category_id?: number | string;

    level?: string;

    sort?: string;

    per_page?: number;

    page?: number;

}
