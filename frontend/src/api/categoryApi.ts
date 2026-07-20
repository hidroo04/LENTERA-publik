import api from "./axios";

import { ENDPOINTS } from "../constants";

import type {
    Category,
    ApiResponse,
} from "../types";

/**
 * ============================================================================
 * Category API
 * ============================================================================
 *
 * Seluruh request yang berkaitan dengan kategori prestasi publik.
 */

const categoryApi = {

    /**
     * =========================================================================
     * Get Category List
     * =========================================================================
     *
     * Mengambil seluruh kategori prestasi.
     */

    list: async (): Promise<ApiResponse<Category[]>> => {

        const response =
            await api.get<ApiResponse<Category[]>>(
                ENDPOINTS.CATEGORIES
            );

        return response.data;

    },

};

export default categoryApi;
