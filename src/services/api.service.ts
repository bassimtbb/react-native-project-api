import axios from 'axios';

// Instance personnalisée avec baseURL et timeout
const apiClient = axios.create({
    baseURL: 'https://api.disneyapi.dev',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour le debug des requêtes
apiClient.interceptors.request.use((config) => {
    console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

// Intercepteur pour la gestion globale des erreurs
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : 'Network Error';
        console.error(`❌ [API Error] Status: ${status} - ${error.message}`);
        return Promise.reject(error);
    }
);

export default apiClient;
