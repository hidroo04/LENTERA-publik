import api from "./axios";

import { ENDPOINTS } from "../constants";

import type {
    Statistics,
    ApiResponse,
} from "../types";

/**
 * ============================================================================
 * Statistics API
 * ============================================================================
 *
 * Seluruh request yang berkaitan dengan statistik Website Publik.
 */

const statisticsApi = {

    /**
     * =========================================================================
     * Get Statistics
     * =========================================================================
     *
     * Mengambil ringkasan statistik prestasi.
     */

    getStatistics: async (): Promise<ApiResponse<Statistics>> => {

        const response =
            await api.get<ApiResponse<Statistics>>(
                ENDPOINTS.STATISTICS
            );

        return response.data;

    },

};

export default statisticsApi;
