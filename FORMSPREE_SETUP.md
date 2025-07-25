# Formspree Setup Guide

## Step 1: Create a Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a New Form
1. Click "New Form" in your Formspree dashboard
2. Enter a form name (e.g., "Portfolio Contact Form")
3. Choose your settings:
   - **Redirect URL**: Leave blank (we handle success in React)
   - **Email notifications**: Enable to receive emails when someone submits
   - **Spam protection**: Enable reCAPTCHA if desired

## Step 3: Get Your Form ID
1. After creating the form, you'll see a form endpoint like:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
2. Copy the `YOUR_FORM_ID` part (the random string after `/f/`)

## Step 4: Update Environment Variable
1. Open `.env.local` file in your project root
2. Replace `YOUR_FORM_ID` with your actual form ID:
   ```
   NEXT_PUBLIC_FORMSPREE_FORM_ID=abcdef123456
   ```

## Step 5: Deploy to Vercel
1. Add the environment variable to your Vercel project:
   ```bash
   vercel env add NEXT_PUBLIC_FORMSPREE_FORM_ID
   ```
   Or add it through the Vercel dashboard:
   - Go to https://vercel.com/your-project/settings/environment-variables
   - Add `NEXT_PUBLIC_FORMSPREE_FORM_ID` with your form ID

2. Redeploy your project:
   ```bash
   vercel --prod
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
