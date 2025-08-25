const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    USERS: `${API_BASE_URL}/users`,
    REFRESH_TOKEN: `${API_BASE_URL}/token/refresh`,
    ME: `${API_BASE_URL}/users/me`,
};
