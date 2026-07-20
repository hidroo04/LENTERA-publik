import api from './axios';
import { ENDPOINTS } from '../constants';
import { buildQuery } from '../utils';

import type {
    Achievement,
    AchievementFilters,
    PaginatedResponse,
    ApiResponse,
} from "../types";

/**
 * ============================================================================
 * Public Achievement API
 * ============================================================================
 */
const achievementApi = {

    /**
     * ============================================================================
     * List Achievement
     * ============================================================================
     * Ambil daftar prestasi yang sudah dipublikasikan (status published).
     */
    list: async (filters: AchievementFilters = {}): Promise<PaginatedResponse<Achievement>> => {
        // Karena endpoint /public/achievements tidak mendukung filter & meta dengan baik,
        // kita menggunakan /achievements yang merupakan public API dengan full support,
        // namun memaksa filter published: true
        const params = buildQuery({ ...filters, published: true } as Record<string, unknown>);

        const response = await api.get<any>(
            "/achievements",
            { params }
        );
        
        // Backend mengembalikan object paginasi di dalam key "pagination",
        // sementara frontend kita mendefinisikannya sebagai "meta".
        // Karena kita dilarang mengubah backend, kita melakukan penyesuaian (mapping) di sini.
        return {
            ...response.data,
            meta: response.data.pagination || response.data.meta,
        };
    },

    /**
     * ============================================================================
     * Detail Achievement
     * ============================================================================
     * Ambil detail satu prestasi berdasarkan slug-nya.
     */
    detail: async (slug: string): Promise<ApiResponse<Achievement>> => {
        const response = await api.get<ApiResponse<Achievement>>(
            ENDPOINTS.achievementDetail(slug)
        );
        return response.data;
    },

    /**
     * ============================================================================
     * Featured Achievement
     * ============================================================================
     * Ambil daftar prestasi unggulan (featured = true & published).
     */
    featured: async (): Promise<ApiResponse<Achievement[]>> => {
        const response = await api.get<ApiResponse<Achievement[]>>(
            ENDPOINTS.FEATURED_ACHIEVEMENTS
        );
        return response.data;
    },

};

export default achievementApi;
