// Array of AI models from different platforms
const AI_MODELS = [
    {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'openai',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .5158 4.9107 6.051 6.051 0 0 0 6.5098 2.9001A5.9847 5.9847 0 0 0 13.1027 24a6.051 6.051 0 0 0 6.4869-2.9001 5.9894 5.9894 0 0 0 3.9977-2.9 6.0557 6.0557 0 0 0-.7525-7.0966zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5097-2.6067-1.4997z" fill="currentColor"/></svg>'
    },
    {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'openai',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .5158 4.9107 6.051 6.051 0 0 0 6.5098 2.9001A5.9847 5.9847 0 0 0 13.1027 24a6.051 6.051 0 0 0 6.4869-2.9001 5.9894 5.9894 0 0 0 3.9977-2.9 6.0557 6.0557 0 0 0-.7525-7.0966zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5097-2.6067-1.4997z" fill="currentColor"/></svg>'
    },
    {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'anthropic',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'claude-3-sonnet',
        name: 'Claude 3 Sonnet',
        provider: 'anthropic',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        provider: 'google',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 8.5C13.5 9.88071 12.3807 11 11 11C9.61929 11 8.5 9.88071 8.5 8.5C8.5 7.11929 9.61929 6 11 6C12.3807 6 13.5 7.11929 13.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.4118 21C7.22632 21 5.03053 17.9602 5.03053 14.6978M11.4118 21C15.5972 21 17.793 17.9602 17.793 14.6978M11.4118 21C8.92681 21 7.5 19.5609 7.5 17.0909V14.6978M11.4118 21C13.897 21 15.3238 19.5609 15.3238 17.0909V14.6978M7.5 14.6978C7.5 12.8478 8.88502 11.3696 10.719 11.3696H12.1047C13.9387 11.3696 15.3237 12.8478 15.3237 14.6978M7.5 14.6978H15.3237" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'gemini-pro-vision',
        name: 'Gemini Pro Vision',
        provider: 'google',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 8.5C13.5 9.88071 12.3807 11 11 11C9.61929 11 8.5 9.88071 8.5 8.5C8.5 7.11929 9.61929 6 11 6C12.3807 6 13.5 7.11929 13.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.4118 21C7.22632 21 5.03053 17.9602 5.03053 14.6978M11.4118 21C15.5972 21 17.793 17.9602 17.793 14.6978M11.4118 21C8.92681 21 7.5 19.5609 7.5 17.0909V14.6978M11.4118 21C13.897 21 15.3238 19.5609 15.3238 17.0909V14.6978M7.5 14.6978C7.5 12.8478 8.88502 11.3696 10.719 11.3696H12.1047C13.9387 11.3696 15.3237 12.8478 15.3237 14.6978M7.5 14.6978H15.3237" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'llama-3-70b',
        name: 'Llama 3 70B',
        provider: 'meta',
        logo: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 12.5C9.0913 12.5 10.5 12.0858 10.5 10.5C10.5 8.91421 9.0913 7.5 7.5 7.5C5.9087 7.5 4.5 8.91421 4.5 10.5C4.5 12.0858 5.9087 12.5 7.5 12.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7.5V4.5C6 3.83696 6.26339 3.20107 6.73223 2.73223C7.20107 2.26339 7.83696 2 8.5 2C9.16304 2 9.79893 2.26339 10.2678 2.73223C10.7366 3.20107 11 3.83696 11 4.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 10.5L3 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 10.5L12 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'llama-3-8b',
        name: 'Llama 3 8B',
        provider: 'meta',
        logo: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 12.5C9.0913 12.5 10.5 12.0858 10.5 10.5C10.5 8.91421 9.0913 7.5 7.5 7.5C5.9087 7.5 4.5 8.91421 4.5 10.5C4.5 12.0858 5.9087 12.5 7.5 12.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 7.5V4.5C6 3.83696 6.26339 3.20107 6.73223 2.73223C7.20107 2.26339 7.83696 2 8.5 2C9.16304 2 9.79893 2.26339 10.2678 2.73223C10.7366 3.20107 11 3.83696 11 4.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 10.5L3 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 10.5L12 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'grok-1',
        name: 'Grok-1',
        provider: 'xai',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5M8 18L2 22V4C2 3.44772 2.44772 3 3 3H16C16.5523 3 17 3.44772 17 4V18C17 18.5523 16.5523 19 16 19H9C8.5 19 8.2 19 8 18ZM17 12H20C20.5523 12 21 11.5523 21 11V7C21 6.44772 20.5523 6 20 6H17V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'mistral-large',
        name: 'Mistral Large',
        provider: 'mistral',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V5M19.0711 4.92893L17.6569 6.34315M5 12H3M21 12H19M17.6569 17.6569L19.0711 19.0711M6.34315 6.34315L4.92893 4.92893M8.46447 15.5355L12 12L15.5355 8.46447M7.75736 7.75736L16.2426 16.2426M12 19V21M4.92893 19.0711L6.34315 17.6569" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'mistral-medium',
        name: 'Mistral Medium',
        provider: 'mistral',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3V5M19.0711 4.92893L17.6569 6.34315M5 12H3M21 12H19M17.6569 17.6569L19.0711 19.0711M6.34315 6.34315L4.92893 4.92893M8.46447 15.5355L12 12L15.5355 8.46447M7.75736 7.75736L16.2426 16.2426M12 19V21M4.92893 19.0711L6.34315 17.6569" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'claude-3-haiku',
        name: 'Claude 3 Haiku',
        provider: 'anthropic',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'qwen-max',
        name: 'Qwen Max',
        provider: 'alibaba',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5858 11.0001L14 12.4143M12.5858 11.0001L11.1716 12.4143M12.5858 11.0001L12.5858 7.00008M12.5858 11.0001L9 11.0001M12.5858 11.0001L16.5 11M14 9.58587L12.5858 11.0001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 11.9174C5 9.69881 5 8.58952 5.33886 7.66926C5.84118 6.38771 6.84736 5.38154 8.1289 4.87921C9.04916 4.54036 10.1584 4.54036 12.377 4.54036H12.623C14.8416 4.54036 15.9508 4.54036 16.8711 4.87921C18.1526 5.38154 19.1588 6.38771 19.6611 7.66926C20 8.58952 20 9.69881 20 11.9174V13.0834C20 15.302 20 16.4113 19.6611 17.3315C19.1588 18.6131 18.1526 19.6193 16.8711 20.1216C15.9508 20.4604 14.8416 20.4604 12.623 20.4604H12.377C10.1584 20.4604 9.04916 20.4604 8.1289 20.1216C6.84736 19.6193 5.84118 18.6131 5.33886 17.3315C5 16.4113 5 15.302 5 13.0834V11.9174Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        provider: 'deepseek',
        logo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 19H19C20.1046 19 21 18.1046 21 17V9.82843C21 9.29799 20.7893 8.78929 20.4142 8.41421L16.5858 4.58579C16.2107 4.21071 15.702 4 15.1716 4H5C3.89543 4 3 4.89543 3 6V17C3 18.1046 3.89543 19 5 19H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13V9M12 13V9M16 13V9M8 21V17H16V21H8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    }
];
