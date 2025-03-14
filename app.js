// app.js - Updated for separate chat history for each model
document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const newChatBtn = document.getElementById('newChatBtn');
    const modelSelector = document.getElementById('modelSelector');
    const conversationHistory = document.getElementById('conversationHistory');
    const settingsBtn = document.getElementById('settingsBtn');
    const currentModelDisplay = document.getElementById('currentModelDisplay');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const modelStatus = document.getElementById('modelStatus');
    const stopGeneratingBtn = document.getElementById('stopGeneratingBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // State variables
    let currentModel = null;
    let conversation = [];
    let isGenerating = false;

    // --- Helper functions ---
    const showWelcomeMessage = () => {
        welcomeMessage.classList.remove('hidden');
    };

    const hideWelcomeMessage = () => {
        welcomeMessage.classList.add('hidden');
    };

    const parseMarkdown = (markdownText) => {
        try {
            return marked.parse(markdownText);
        } catch (error) {
            console.error("Error parsing Markdown:", error);
            return '<p>Error displaying content.</p>';
        }
    };

    const displayMessage = (sender, message, isError = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('fade-in', 'flex', 'flex-col', 'mb-4');
        if (sender === 'user') {
            messageDiv.classList.add('items-end');
            messageDiv.innerHTML = `
                <div class="user-message max-w-2xl text-right">${message}</div>
                <div class="text-xs text-gray-500 mt-1">You</div>
            `;
        } else if (sender === 'ai') {
            messageDiv.classList.add('items-start');
            const parsedMessage = parseMarkdown(message);
            messageDiv.innerHTML = `
                <div class="ai-message max-w-2xl">${parsedMessage}</div>
                <div class="text-xs text-gray-500 mt-1">AI</div>
            `;
        } else if (sender === 'error') {
            messageDiv.classList.add('items-start');
            messageDiv.innerHTML = `
                <div class="ai-message max-w-2xl bg-red-800 border-red-700">${message}</div>
                <div class="text-xs text-gray-500 mt-1">System</div>
            `;
        }
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const setModelStatus = (status) => {
        modelStatus.textContent = status;
    };

    // Function to clear the chat history for the current model
    const clearChat = () => {
        conversation = [];
        chatContainer.innerHTML = '';
        saveConversationHistory(); // Clear the saved history in localStorage
        showWelcomeMessage();
    };

    // Function to generate a unique key for storing conversation history
    const getConversationKey = (model) => {
        return `conversation_${model.id}`; // Unique key per model
    };

    // Function to load conversation history from localStorage for the current model
    const loadConversationHistory = (model) => {
        if (!model) return; // Ensure a model is selected

        const conversationKey = getConversationKey(model);
        const savedConversation = localStorage.getItem(conversationKey);

        if (savedConversation) {
            conversation = JSON.parse(savedConversation);
            conversation.forEach(msg => {
                displayMessage(msg.sender, msg.message);
            });
            hideWelcomeMessage();
        } else {
            showWelcomeMessage();
        }
    };

    // Function to save conversation history to localStorage for the current model
    const saveConversationHistory = () => {
        if (!currentModel) return; // Ensure a model is selected

        const conversationKey = getConversationKey(currentModel);
        localStorage.setItem(conversationKey, JSON.stringify(conversation));
    };

    const fetchCompletion = async (model, prompt) => {
        try {
            setModelStatus('Generating...');
            isGenerating = true;
            sendMessageBtn.disabled = true;
            stopGeneratingBtn.classList.remove('hidden');
            userInput.disabled = true;

            const apiKey = apiKeyManager.getApiKey(model.provider);

            if (!apiKey) {
                displayMessage('error', `API Key not found for provider: ${model.provider}. Please add it in settings.`);
                setModelStatus('API Key Missing');
                return;
            }

            const apiKeyId = apiKeyManager.getApiKeyId(model.provider);
            if (!apiKeyId) {
                displayMessage('error', `API Key ID not found for provider: ${model.provider}. Please add it in settings.`);
                setModelStatus('API Key ID Missing');
                return;
            }

            const response = await fetch('http://localhost:8000/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer your_auth_token`
                },
                body: JSON.stringify({
                    model: model.id,
                    prompt: prompt,
                    api_key_id: apiKeyId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.text) {
                displayMessage('ai', data.text);
                conversation.push({ sender: 'ai', message: data.text });
                saveConversationHistory();
            } else {
                displayMessage('error', 'No completion received from the AI.');
            }

        } catch (error) {
            console.error('Error fetching completion:', error);
            displayMessage('error', `Error generating response: ${error.message}`);
        } finally {
            setModelStatus('');
            isGenerating = false;
            sendMessageBtn.disabled = false;
            stopGeneratingBtn.classList.add('hidden');
            userInput.disabled = false;
            userInput.focus();
        }
    };

    const createModelButton = (model) => {
        const button = document.createElement('button');
        button.classList.add('model-button', 'flex', 'items-center', 'justify-start', 'w-full', 'p-3', 'rounded-md', 'hover:bg-gray-800', 'transition-colors', 'duration-200', 'text-sm');
        button.dataset.modelId = model.id;
        button.innerHTML = `
            <span class="mr-2">${model.logo}</span>
            <span>${model.name}</span>
        `;

        button.addEventListener('click', () => {
            // Save current conversation before switching models
            saveConversationHistory();
            // Clear current conversation
            conversation = [];
            chatContainer.innerHTML = '';

            currentModel = model;
            currentModelDisplay.textContent = model.name;

            // Load chat history for the new selected model
            loadConversationHistory(currentModel);

            document.querySelectorAll('.model-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            sendMessageBtn.disabled = false;
            userInput.focus();

            hideWelcomeMessage();
        });

        return button;
    };

    // --- Event Listeners ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    newChatBtn.addEventListener('click', () => {
        clearChat();
    });

    settingsBtn.addEventListener('click', () => {
        settingsModal.open();
    });

    clearChatBtn.addEventListener('click', () => {
        clearChat();
    });

    sendMessageBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            displayMessage('user', message);
            conversation.push({ sender: 'user', message: message });
            saveConversationHistory();
            userInput.value = '';
            fetchCompletion(currentModel, message);
            hideWelcomeMessage();
        }
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessageBtn.click();
        }
    });

    stopGeneratingBtn.addEventListener('click', () => {
        console.log('Stop generating clicked - functionality needs to be implemented.');
        setModelStatus('Stopping...');
        setModelStatus('Stopped');
    });

    // --- Initialization ---
    AI_MODELS.forEach(model => {
        const button = createModelButton(model);
        modelSelector.appendChild(button);
    });

    // Load conversation history for the initially selected model (if any)
    if (AI_MODELS.length > 0) {
        // Select first model by default, loading its chat history
        currentModel = AI_MODELS[0];
        currentModelDisplay.textContent = currentModel.name;
        document.querySelector(`.model-button[data-model-id="${currentModel.id}"]`).classList.add('active');
        loadConversationHistory(currentModel); // Load history for the initial model
        hideWelcomeMessage();
    } else {
        showWelcomeMessage();
    }
});
