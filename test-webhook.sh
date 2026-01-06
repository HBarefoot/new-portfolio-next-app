#!/bin/bash

# Test script for n8n webhook integration
# This tests if your webhook is working correctly

echo "🧪 Testing n8n Webhook Integration..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

WEBHOOK_URL="https://n8n.srv1197436.hstgr.cloud/webhook/customer-service-rag"
TEST_MESSAGE="Hello, this is a test message"
SESSION_ID="test-session-$(date +%s)"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

echo ""
echo "📤 Sending test request..."
echo "URL: $WEBHOOK_URL"
echo "Message: $TEST_MESSAGE"
echo "Session ID: $SESSION_ID"
echo ""

# Make the request and save response
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"$TEST_MESSAGE\",
    \"sessionId\": \"$SESSION_ID\",
    \"timestamp\": \"$TIMESTAMP\"
  }")

# Split response body and status code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📥 Response received:"
echo ""

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Status: $HTTP_CODE (OK)"
    echo ""
    echo "Response Body:"
    echo "$HTTP_BODY" | jq '.' 2>/dev/null || echo "$HTTP_BODY"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Webhook is working correctly!"
    
    # Check if response has expected fields
    if echo "$HTTP_BODY" | jq -e '.output // .response // .message // .text' > /dev/null 2>&1; then
        echo "✅ Response format is compatible with ChatWidget"
    elif [ -n "$HTTP_BODY" ]; then
        echo "⚠️  Response format might need adjustment"
        echo "   Expected fields: output, response, message, or text"
    fi
else
    echo "❌ Status: $HTTP_CODE (ERROR)"
    echo ""
    echo "Response:"
    echo "$HTTP_BODY"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❌ Webhook test failed!"
    echo ""
    echo "Possible issues:"
    echo "  1. Webhook URL is incorrect"
    echo "  2. n8n workflow is not active"
    echo "  3. Webhook is not configured properly"
    echo "  4. CORS settings need adjustment"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Next steps:"
echo "  1. If test passed, try the chat widget in your browser"
echo "  2. Open DevTools Console (F12) to see detailed logs"
echo "  3. Send a message and check for webhook response data"
echo ""
