// API Key Manager
const apiKeyManager = (() => {
    // Storage key prefix for API keys
    const API_KEY_PREFIX = 'api_key_';
    const API_KEY_ID_PREFIX = 'api_key_id_';
    
    // Get providers from models
    const getProviders = () => {
        const providers = [];
        const providerSet = new Set();
        
        AI_MODELS.forEach(model => {
            if (!providerSet.has(model.provider)) {
                providerSet.add(model.provider);
                providers.push({
                    id: model.provider,
                    name: capitalizeFirstLetter(model.provider)
                });
            }
        });
        
        return providers;
    };
    
    // Save API key to localStorage
    const saveApiKey = (provider, apiKey) => {
        localStorage.setItem(`${API_KEY_PREFIX}${provider}`, apiKey);
    };
    
    // Get API key from localStorage
    const getApiKey = (provider) => {
        return localStorage.getItem(`${API_KEY_PREFIX}${provider}`);
    };
    
    // Save API key ID to localStorage
    const saveApiKeyId = (provider, apiKeyId) => {
        localStorage.setItem(`${API_KEY_ID_PREFIX}${provider}`, apiKeyId);
    };
    
    // Get API key ID from localStorage
    const getApiKeyId = (provider) => {
        return localStorage.getItem(`${API_KEY_ID_PREFIX}${provider}`);
    };
    
    // Helper function to capitalize first letter
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    // Return public methods
    return {
        getProviders,
        saveApiKey,
        getApiKey,
        saveApiKeyId,
        getApiKeyId
    };
})();
