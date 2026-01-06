# Formspree Setup Guide - Vercel Integration

## Option 1: Vercel Integration (Recommended)

### Step 1: Install Formspree Integration
1. Go to your Vercel dashboard: https://vercel.com/integrations/formspree
2. Click "Add Integration"
3. Select your portfolio project
4. Follow the prompts to connect Formspree

### Step 2: Automatic Configuration
The Vercel integration automatically:
- Creates a Formspree project
- Sets up the `NEXT_PUBLIC_FORM` environment variable
- Configures spam protection and email notifications

### Step 3: Deploy
Your next deployment will automatically have the form configured!

---

## Option 2: Manual Setup (Alternative)

### Step 1: Create a Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create a New Form
1. Click "New Form" in your Formspree dashboard
2. Enter a form name (e.g., "Portfolio Contact Form")
3. Choose your settings:
   - **Redirect URL**: Leave blank (we handle success in React)
   - **Email notifications**: Enable to receive emails when someone submits
   - **Spam protection**: Enable reCAPTCHA if desired

### Step 3: Get Your Form ID
1. After creating the form, you'll see a form endpoint like:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
2. Copy the `YOUR_FORM_ID` part (the random string after `/f/`)

### Step 4: Update Environment Variable
1. Update the Contact component to use:
   ```typescript
   const [state, handleSubmit] = useForm("YOUR_FORM_ID");
   ```
   Or add to `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id
   ```

### Step 5: Deploy to Vercel
Add the environment variable to your Vercel project:
```bash
vercel env add NEXT_PUBLIC_FORMSPREE_FORM_ID
```

## Step 6: Test Your Form
1. Visit your deployed site
2. Fill out the contact form
3. Check your email for the submission
4. Check your Formspree dashboard to see the submission

## Features Included:
- ✅ Real form submission to your email
- ✅ Spam protection
- ✅ Form validation with error messages
- ✅ Loading states and success messages
- ✅ Professional email notifications
- ✅ Submission history in Formspree dashboard

## Formspree Free Plan Includes:
- 50 submissions per month
- Spam filtering
- Email notifications
- Form submissions dashboard

For higher volume, upgrade to a paid plan at https://formspree.io/pricing
