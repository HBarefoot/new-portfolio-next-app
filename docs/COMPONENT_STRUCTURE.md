# Chat Widget Component Structure

## Visual Hierarchy

```
┌─────────────────────────────────────────────────┐
│                                                 │
│                 Your Website                    │
│                                                 │
│                                          ┌─────┐│
│                                          │  💬 ││  ← Floating Button
│                                          └─────┘│
└─────────────────────────────────────────────────┘

When opened:

┌─────────────────────────────────────────────────┐
│                                                 │
│                 Your Website                    │
│                                                 │
│                              ┌──────────────┐   │
│                              │ ✨ Henry's  │   │  ← Chat Header
│                              │ AI Assistant │   │    (Gradient)
│                              │ 🟢 Online    │   │
│                              ├──────────────┤   │
│                              │              │   │
│                              │ 👋 Welcome! │   │  ← Bot Message
│                              │              │   │
│                              │      Hello!  │   │  ← User Message
│                              │              │   │
│                              │   ⋯         │   │  ← Typing
│                              ├──────────────┤   │
│                              │ [Input] [📤]│   │  ← Input Area
│                              └──────────────┘   │
│                                          ┌─────┐│
│                                          │  ❌ ││  ← Close Button
│                                          └─────┘│
└─────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Floating Action Button (FAB)
```tsx
<motion.button>
  {isOpen ? <X /> : <MessageCircle />}
</motion.button>
```
- **Position**: Fixed bottom-right
- **States**: Open (X icon) / Closed (Message icon)
- **Animation**: Smooth icon rotation
- **Indicator**: Green pulse dot when closed

### 2. Chat Window
```tsx
<motion.div> <!-- Container -->
  <Header />
  <MessagesArea />
  <InputArea />
</motion.div>
```

#### 2a. Header Section
```tsx
<div className="bg-gradient-to-r from-primary to-accent">
  <Sparkles icon />
  <Title>Henry's AI Assistant</Title>
  <Status>🟢 Online - Ready to help</Status>
</div>
```
- **Styling**: Gradient background (primary → accent)
- **Icon**: Sparkles in a circle
- **Status**: Green dot + text

#### 2b. Messages Area
```tsx
<div className="messages-container">
  {messages.map(msg => (
    <MessageBubble>
      <Text>{msg.text}</Text>
      <Timestamp>{msg.timestamp}</Timestamp>
    </MessageBubble>
  ))}
  {isTyping && <TypingIndicator />}
</div>
```
- **Bot Messages**: Left-aligned, white bg (dark: gray-800)
- **User Messages**: Right-aligned, gradient bg
- **Typing Indicator**: Animated dots
- **Auto-scroll**: Always shows latest message

#### 2c. Input Area
```tsx
<div className="input-container">
  <input placeholder="Ask me anything..." />
  <button>
    {isLoading ? <Loader /> : <Send />}
  </button>
</div>
```
- **Input**: Full-width, rounded
- **Button**: Gradient, animated send icon
- **States**: Normal, loading, disabled

## State Management

```typescript
interface State {
  isOpen: boolean;              // Chat window open/closed
  messages: Message[];          // All messages
  inputValue: string;           // Current input text
  isLoading: boolean;           // Webhook request in progress
  isTyping: boolean;            // Bot is "typing"
}

interface Message {
  id: string;                   // Unique identifier
  text: string;                 // Message content
  sender: 'user' | 'bot';       // Who sent it
  timestamp: Date;              // When it was sent
}
```

## Data Flow

```
User Types
    ↓
Enter Key / Click Send
    ↓
sendMessage() function
    ↓
1. Add user message to state
2. Set isLoading = true
3. Set isTyping = true
    ↓
Fetch webhook (POST)
    ↓
Wait for response
    ↓
Parse response data
    ↓
1. Set isTyping = false
2. Add bot message to state
3. Set isLoading = false
    ↓
Auto-scroll to bottom
```

## Webhook Communication

### Request Flow:
```javascript
// User sends message
"Hello" 
    ↓
// ChatWidget prepares request
{
  message: "Hello",
  sessionId: "session-1234567890-abc123",
  timestamp: "2026-01-05T12:00:00.000Z"
}
    ↓
// POST to n8n webhook
fetch(WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(...)
})
    ↓
// n8n processes (RAG, AI, etc.)
    ↓
// n8n returns response
{
  "output": "Hi! How can I help you today?"
}
    ↓
// ChatWidget displays response
```

### Response Parsing:
```javascript
// Flexible response handling
if (data.output) → Use data.output
else if (data.response) → Use data.response
else if (data.message) → Use data.message
else if (data.text) → Use data.text
else if (typeof data === 'string') → Use data
else → Show error message
```

## Styling Architecture

### Color System:
```css
/* Light Mode */
--primary: #3b82f6     /* Blue */
--accent: #06b6d4      /* Cyan */
--background: #ffffff
--foreground: #171717

/* Dark Mode */
--primary: #60a5fa     /* Lighter blue */
--accent: #22d3ee      /* Lighter cyan */
--background: #0a0a0a
--foreground: #ededed
```

### Gradients:
```css
/* Used for: Header, Buttons, User Messages */
background: linear-gradient(to right, var(--primary), var(--accent))
```

### Shadows:
```css
/* Chat Window */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)  /* shadow-2xl */

/* Message Bubbles */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)        /* shadow-sm */
```

## Responsive Breakpoints

### Desktop (≥640px):
```css
position: fixed;
bottom: 6rem;
right: 1.5rem;
width: 380px;
height: 600px;
border-radius: 1rem;
```

### Mobile (<640px):
```css
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
width: 100%;
height: 100%;
border-radius: 0;
```

## Animation Timeline

### Opening Chat:
```
1. Button rotates (X replaces MessageCircle)
2. Chat window fades in (opacity 0 → 1)
3. Chat window slides up (translateY 20px → 0)
4. Chat window scales up (scale 0.95 → 1)

Duration: 200ms
Easing: ease-out
```

### Closing Chat:
```
1. Button rotates (MessageCircle replaces X)
2. Chat window fades out (opacity 1 → 0)
3. Chat window slides down (translateY 0 → 20px)
4. Chat window scales down (scale 1 → 0.95)

Duration: 200ms
Easing: ease-out
```

### Typing Indicator:
```
Three dots animate in sequence:
Dot 1: y: 0 → -8px → 0 (offset: 0ms)
Dot 2: y: 0 → -8px → 0 (offset: 200ms)
Dot 3: y: 0 → -8px → 0 (offset: 400ms)

Duration: 600ms per cycle
Repeat: Infinite
```

### Send Button Hover:
```
Icon translates:
x: 0 → 0.5px
y: 0 → -0.5px

Duration: 300ms
Easing: ease-in-out
```

## Accessibility Features

### Keyboard Navigation:
- **Enter**: Send message
- **Tab**: Navigate between input and button
- **Escape**: Close chat (could be added)

### ARIA Labels:
```html
<button aria-label="Toggle chat">...</button>
<button aria-label="Send message">...</button>
```

### Focus Management:
```typescript
// Auto-focus input when chat opens
useEffect(() => {
  if (isOpen && inputRef.current) {
    inputRef.current.focus();
  }
}, [isOpen]);
```

### Semantic HTML:
```html
<button>   <!-- Interactive elements -->
<div>      <!-- Containers -->
<input>    <!-- User input -->
```

## Performance Optimizations

### React Hooks:
```typescript
useRef()     // DOM references (no re-render)
useState()   // Component state
useEffect()  // Side effects
```

### Efficient Re-renders:
```typescript
// Only re-render when specific deps change
useEffect(() => {
  messagesEndRef.current?.scrollIntoView();
}, [messages, isTyping]);  // Not on every state change
```

### Lazy Loading:
```typescript
// Component only loads on client side
'use client';
```

## Session Management

### Session ID Generation:
```typescript
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('chat-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random()...}`;
    sessionStorage.setItem('chat-session-id', sessionId);
  }
  return sessionId;
};
```

### Benefits:
- Maintains conversation context
- Persists across page reloads (same tab)
- New session per browser tab
- Cleared when tab is closed

## Error Handling

### Network Errors:
```typescript
try {
  const response = await fetch(...);
  // Handle response
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

### Response Validation:
```typescript
if (!response.ok) {
  throw new Error(`Failed: ${response.status}`);
}
```

### User Feedback:
```
❌ Error → Red error message in chat
⏳ Loading → Disabled input + loading spinner
⋯ Typing → Animated dots in chat
```

## Dependencies

### Already in Project:
- ✅ `react` - Core framework
- ✅ `framer-motion` - Animations
- ✅ `lucide-react` - Icons
- ✅ `tailwindcss` - Styling

### No New Dependencies Added!

## File Size

```
ChatWidget.tsx:  ~12KB (uncompressed)
                 ~3KB (gzipped)
                 
Total Impact:    ~50KB (with dependencies)
```

## Browser Compatibility

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile Safari (iOS 14+)  
✅ Chrome Mobile  

## Testing Checklist

- [ ] Chat button appears
- [ ] Button opens/closes chat
- [ ] Icon animates smoothly
- [ ] Welcome message displays
- [ ] Can type in input
- [ ] Enter key sends message
- [ ] Send button sends message
- [ ] Loading state shows spinner
- [ ] Typing indicator appears
- [ ] Bot response displays
- [ ] Timestamps show correctly
- [ ] Auto-scrolls to bottom
- [ ] Dark mode works
- [ ] Mobile fullscreen works
- [ ] Session persists on reload
- [ ] Console logs webhook data
- [ ] Error handling works

---

**This structure ensures a robust, maintainable, and user-friendly chat experience!**
