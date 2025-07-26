'use client';

import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.henrybarefoot.com/webhook/bbc7802e-32f2-4aa5-b7e9-e13cda48c638/chat',
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
        "Welcome to Henry's AI Assistant! 👋",
        "Before we start, I'd love to know who I'm talking to.",
        "Please share your name and email so I can provide personalized assistance:",
        "Example: 'Hi, I'm John Smith, john@company.com. I'd like to know about Henry's React experience.'"
      ],
      i18n: {
        en: {
          title: "Henry's AI Assistant",
          subtitle: 'Get instant answers about Henry\'s experience & skills',
          footer: 'Built with ❤️ using n8n',
          getStarted: 'Start Conversation',
          inputPlaceholder: 'Start with your name and email...',
          closeButtonTooltip: 'Close chat',
        },
      },
    });
  }, []);

  return null; // The chat widget is rendered by the n8n library
};

export default ChatWidget;
