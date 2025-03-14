// Settings Modal
const settingsModal = (() => {
    const modalElement = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const apiKeyInputs = document.getElementById('apiKeyInputs');
    
    // Initialize the modal
    const init = () => {
        // Close modal when clicking the close button
        closeSettingsBtn.addEventListener('click', close);
        
        // Save settings when clicking the save button
        saveSettingsBtn.addEventListener('click', saveSettings);
        
        // Close modal when clicking outside
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                close();
            }
        });
        
        // Generate API key inputs for all providers
        generateApiKeyInputs();
    };
    
    // Open the settings modal
    const open = () => {
        modalElement.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };
    
    // Close the settings modal
    const close = () => {
        modalElement.classList.add('hidden');
        document.body.style.overflow = '';
    };
    
    // Generate API key inputs
    const generateApiKeyInputs = () => {
        const providers = apiKeyManager.getProviders();
        apiKeyInputs.innerHTML = '';
        
        providers.forEach(provider => {
            const savedApiKey = apiKeyManager.getApiKey(provider.id) || '';
            const savedApiKeyId = apiKeyManager.getApiKeyId(provider.id) || generateApiKeyId();
            
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('space-y-2');
            
            inputGroup.innerHTML = `
                <label for="api-key-${provider.id}" class="block text-sm font-medium text-gray-400">${provider.name} API Key</label>
                <input 
                    type="password" 
                    id="api-key-${provider.id}" 
                    class="w-full bg-[#1c1c1c] text-white rounded-md px-3 py-2 border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Enter your ${provider.name} API key"
                    value="${savedApiKey}"
                    data-provider="${provider.id}"
                    data-key-id="${savedApiKeyId}"
                />
                <div class="flex justify-between items-center">
                    <span class="text-xs text-gray-500">Used for ${provider.name} models</span>
                    <button class="text-xs text-indigo-500 hover:text-indigo-400 toggle-visibility" data-target="api-key-${provider.id}">
                        Show
                    </button>
                </div>
            `;
            
            apiKeyInputs.appendChild(inputGroup);
            
            // Add toggle visibility functionality
            const toggleBtn = inputGroup.querySelector('.toggle-visibility');
            const input = inputGroup.querySelector(`#api-key-${provider.id}`);
            
            toggleBtn.addEventListener('click', () => {
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleBtn.textContent = 'Hide';
                } else {
                    input.type = 'password';
                    toggleBtn.textContent = 'Show';
                }
            });
        });
    };
    
    // Save all settings
    const saveSettings = () => {
        const inputs = apiKeyInputs.querySelectorAll('input');
        
        inputs.forEach(input => {
            const provider = input.dataset.provider;
            const apiKey = input.value.trim();
            const apiKeyId = input.dataset.keyId;
            
            if (apiKey) {
                apiKeyManager.saveApiKey(provider, apiKey);
                apiKeyManager.saveApiKeyId(provider, apiKeyId);
            }
        });
        
        // Show success notification
        showNotification('Settings saved successfully');
        
        // Close the modal
        close();
    };
    
    // Generate a random API key ID
    const generateApiKeyId = () => {
        return Math.random().toString(36).substring(2, 15);
    };
    
    // Show notification
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.classList.add('fixed', 'bottom-4', 'right-4', 'bg-indigo-600', 'text-white', 'py-2', 'px-4', 'rounded-md', 'shadow-lg', 'z-50', 'fade-in');
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };
    
    // Initialize on script load
    init();
    
    // Return public methods
    return {
        open,
        close
    };
})();
