# AI Chat Widget - Quick Start Guide

## ✅ What's Been Implemented

Your portfolio now has a **custom AI chat interface** that integrates directly with your n8n webhook!

### Key Features:
- 🎨 **Professional Design** - Matches your portfolio's branding perfectly
- 📱 **Fully Responsive** - Works great on desktop and mobile (fullscreen on small devices)
- 🌓 **Dark Mode Support** - Seamlessly switches with your site theme
- ⚡ **Smooth Animations** - Professional transitions using Framer Motion
- 💬 **Real-time Chat** - Instant communication with your n8n webhook
- 🔄 **Session Management** - Maintains conversation context
- ⌨️ **Keyboard Shortcuts** - Press Enter to send messages
- 🎯 **Error Handling** - Graceful fallbacks if webhook fails

## 🚀 How It Works

### User Experience:
1. Users see a floating chat button (bottom-right corner)
2. Click to open the chat window
3. Type questions and press Enter or click Send
4. Receive AI-powered responses instantly

### Technical Flow:
```
User Message → ChatWidget → n8n Webhook → AI Processing → Response → ChatWidget → User
```

### Webhook Integration:
- **URL**: `https://n8n.srv1197436.hstgr.cloud/webhook/customer-service-rag`
- **Method**: POST
- **Request Format**:
```json
{
  "message": "User's question",
  "sessionId": "unique-session-id",
  "timestamp": "2026-01-05T..."
}
```

## 📝 n8n Webhook Configuration

Your n8n workflow should:

1. **Accept POST requests** to the webhook URL
2. **Receive the request body** with message, sessionId, and timestamp
3. **Process the message** (RAG, AI, database query, etc.)
4. **Return a JSON response** in one of these formats:

```json
// Option 1 (preferred):
{
  "output": "Your AI response here"
}

// Option 2:
{
  "response": "Your AI response here"
}

// Option 3:
{
  "message": "Your AI response here"
}

// Option 4:
{
  "text": "Your AI response here"
}

// Or even a direct string response
```

The chat widget is smart and handles all these response formats!

## 🎨 Customization

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: #3b82f6;    /* Main color */
  --accent: #06b6d4;     /* Accent color */
}
```

### Modify Welcome Message
Edit `src/components/ChatWidget.tsx` (around line 28):
```typescript
setMessages([
  {
    id: '1',
    text: "Your custom welcome message",
    sender: 'bot',
    timestamp: new Date(),
  },
]);
```

### Adjust Position
Edit the button classes in `ChatWidget.tsx`:
```typescript
className="fixed bottom-6 right-6..." // Change bottom-6, right-6
```

## 🐛 Testing & Debugging

### View Console Logs:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Open chat and send a message
4. Look for:
   - `Webhook response status: 200`
   - `Webhook response data: {...}`

### Common Issues:

**Chat button not appearing?**
- Check that `<ChatWidget />` is in `src/app/page.tsx` ✅ (already there)
- Reload the page

**Messages not sending?**
1. Check webhook URL is correct
2. Verify n8n workflow is active
3. Check for CORS errors in console
4. Test webhook directly with Postman/curl

**Styling looks off?**
- Clear browser cache
- Check dark mode toggle
- Verify Tailwind is compiling

## 📂 Files Modified

1. **src/components/ChatWidget.tsx** - Complete rewrite with custom UI
2. **src/app/globals.css** - Added scrollbar utilities
3. **AI_CHAT_IMPLEMENTATION.md** - Full documentation
4. **QUICK_START.md** - This file

## 🎯 Next Steps

1. **Test the chat** - Click the button and send a message
2. **Verify webhook** - Check n8n logs for incoming requests
3. **Customize** - Adjust colors, messages, or position as needed
4. **Monitor** - Watch console for any errors

## 📞 Testing the Integration

### Quick Test:
```bash
# Test your webhook directly:
curl -X POST https://n8n.srv1197436.hstgr.cloud/webhook/customer-service-rag \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"test-123","timestamp":"2026-01-05T12:00:00Z"}'
```

Expected response should have one of: `output`, `response`, `message`, or `text` field.

## ✨ Bonus Features Included

- ✅ Auto-scroll to latest messages
- ✅ Typing indicators with animated dots
- ✅ Message timestamps
- ✅ Loading states
- ✅ Session persistence
- ✅ Keyboard navigation
- ✅ Mobile fullscreen mode
- ✅ Smooth animations
- ✅ Error recovery
- ✅ Console logging for debugging

## 🎉 You're All Set!

Your AI chat is ready to go! The widget will appear on your homepage automatically.

**Need help?** Check:
- Console logs in DevTools
- n8n workflow execution logs
- Network tab for webhook requests

---

Built with ❤️ for Henry Barefoot's Portfolio
