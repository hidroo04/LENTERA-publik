// =============================================================================
// TypeScript Types — Website Publik LENTERA
// =============================================================================
// Semua tipe ini mengikuti struktur AchievementResource.php dari backend.

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  achievements_count: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  slug: string;
  recipient: string;
  organizer: string;
  level: 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internasional';
  achievement_date: string | null;
  description: string;
  short_description: string;
  level_badge: 'secondary' | 'info' | 'success' | 'danger' | 'primary';
  status: {
    published: boolean;
    label: string;
  };
  is_featured: boolean;
  featured_label: string;
  thumbnail_url: string | null;
  featured: boolean;
  is_published: boolean;
  published_at: string | null;
  category: {
    id: number | null;
    name: string | null;
    slug: string | null;
  };
  creator: {
    id: number | null;
    name: string | null;
    email: string | null;
  };
  created_at: string;
  updated_at: string;
}

export interface Statistics {
  total: number;
  published: number;
  draft: number;
  featured: number;
  national: number;
  international: number;
  total_achievements: number;
  total_categories: number;
}

// Struktur response pagination dari backend
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

// Struktur response biasa (non-paginated)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
