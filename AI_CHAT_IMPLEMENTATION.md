# AI Chat Widget Implementation

## Overview
Custom AI chat interface integrated with n8n webhook for Henry Barefoot's portfolio website.

## Features Implemented

### 🎨 Professional UI Design
- **Gradient branding** - Uses primary-to-accent gradient consistent with site design
- **Dark mode support** - Fully compatible with the site's theme switcher
- **Smooth animations** - Framer Motion for professional transitions
- **Responsive design** - Works perfectly on mobile and desktop

### 💬 Chat Functionality
- **Real-time messaging** - Instant communication with n8n webhook
- **Session management** - Maintains conversation context via session IDs
- **Typing indicators** - Shows when AI is processing
- **Message timestamps** - Time display for each message
- **Auto-scroll** - Automatically scrolls to latest messages
- **Error handling** - Graceful fallbacks for network issues

### 🚀 User Experience
- **Floating action button** - Bottom-right toggle with online indicator
- **Smooth open/close** - Animated chat window transitions
- **Keyboard shortcuts** - Press Enter to send messages
- **Focus management** - Auto-focuses input when chat opens
- **Loading states** - Visual feedback during API calls

## Technical Details

### Webhook Integration
```typescript
const WEBHOOK_URL = 'https://n8n.srv1197436.hstgr.cloud/webhook/customer-service-rag';

// Request format sent to n8n:
{
  message: string,        // User's message
  sessionId: string,      // Unique session identifier
  timestamp: string       // ISO timestamp
}

// Expected response formats (flexible):
{
  output: string          // Primary response field
  // OR
  response: string        // Alternative response field
  // OR
  message: string         // Fallback response field
}
```

### Component Structure
- **State Management**: React hooks for messages, loading states
- **Session Persistence**: SessionStorage for maintaining conversation context
- **Error Boundaries**: Try-catch blocks for robust error handling
- **Type Safety**: Full TypeScript interfaces for messages and responses

### Styling
- **Tailwind CSS** - Utility-first styling matching site design
- **Custom scrollbar** - Thin, styled scrollbar for chat messages
- **Gradient accents** - Primary-to-accent gradients on interactive elements
- **Shadow layers** - Professional depth with shadow-2xl

## Usage

The chat widget automatically appears on all pages (included via layout).

### For Users:
1. Click the chat bubble in the bottom-right corner
2. Type your question about Henry's experience, skills, or projects
3. Press Enter or click Send
4. Receive AI-powered responses instantly

### For Development:
The component is fully self-contained in:
```
src/components/ChatWidget.tsx
```

## Customization Options

### Change Welcome Message
Edit the initial message in the useEffect hook:
```typescript
setMessages([
  {
    id: '1',
    text: "Your custom welcome message here",
    sender: 'bot',
    timestamp: new Date(),
  },
]);
```

### Adjust Colors
The component uses CSS variables from `globals.css`:
- `--primary` - Main brand color
- `--accent` - Secondary accent color
- `--background` - Page background
- `--foreground` - Text color

### Modify Response Handling
Update the response parsing in `sendMessage()`:
```typescript
const botResponse = data.output || data.response || data.message || "Fallback message";
```

## Browser Compatibility
- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility
- Semantic HTML elements
- ARIA labels on buttons
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Performance Considerations
- Lazy loading via client-side component
- Optimized re-renders with proper React hooks
- Efficient message list rendering
- Session storage for lightweight persistence

## Security
- HTTPS-only webhook communication
- No sensitive data stored in localStorage
- Session IDs are randomly generated
- Error messages don't expose system details

## Future Enhancements (Optional)
- [ ] Message persistence across sessions
- [ ] File upload support
- [ ] Voice input integration
- [ ] Multi-language support
- [ ] Chat history export
- [ ] Suggested quick replies
- [ ] Rich media responses (images, links)

## Troubleshooting

### Chat not appearing?
Check that ChatWidget is imported in layout.tsx

### Messages not sending?
1. Verify webhook URL is correct
2. Check network tab for CORS errors
3. Ensure n8n webhook is active

### Styling issues?
1. Verify Tailwind CSS is properly configured
2. Check dark mode class is applied to html/body
3. Clear browser cache

## Support
For issues or questions about this implementation, refer to the code comments in ChatWidget.tsx or check the n8n webhook configuration.
