'use client';

// Extend Window interface to include Vue.js feature flags
declare global {
  interface Window {
    __VUE_OPTIONS_API__?: boolean;
    __VUE_PROD_DEVTOOLS__?: boolean;
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__?: boolean;
  }
}

// Define Vue.js feature flags before importing n8n chat
if (typeof window !== 'undefined') {
  window.__VUE_OPTIONS_API__ = true;
  window.__VUE_PROD_DEVTOOLS__ = false;
  window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
}

import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.srv1197436.hstgr.cloud/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat',
      webhookConfig: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      mode: 'window',
      showWelcomeScreen: true,
      loadPreviousSession: false,
      initialMessages: [
        "👋 Welcome to Henry's AI Assistant!",
        "I'm here to help answer questions about Henry's experience, skills, and projects.",
        "What would you like to know?"
      ],
      i18n: {
        en: {
          title: "Henry's AI Assistant",
          subtitle: 'Professional portfolio assistant powered by AI',
          footer: 'Built with ❤️ using n8n',
          getStarted: 'Get Started',
          inputPlaceholder: 'Ask me anything about Henry...',
          closeButtonTooltip: 'Close chat',
        },
      },
    });
  }, []);

  return null; // The chat widget is rendered by the n8n library
};

export default ChatWidget;
