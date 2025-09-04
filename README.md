# Carys — Full Site

A polished Next.js app (App Router) with NextAuth (Google + Email), Tailwind (light theme by default, toggleable),
scrollable/collapsible sidebar, Chat (OpenAI), ElevenLabs TTS, legal pages, and a 404.

## Quick Start

1. Copy `.env.example` to `.env.local` and fill the values.
2. `npm install`
3. `npm run dev`

### Required environment (for full functionality)

- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- Email (for magic link): `EMAIL_SERVER_*` and `EMAIL_FROM`
- ElevenLabs: `ELEVENLABS_API_KEY` (and optional `ELEVENLABS_VOICE_ID`)
- (Optional) Stripe: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`

### Deploy on Vercel

- Make sure **you are not using `next export`**.
- Add the env variables in Project → Settings → Environment Variables.
- Set `NEXTAUTH_URL` to your Vercel URL (e.g. https://your-app.vercel.app).

## Icons/Branding

Place your favicons and PWA icons in `public/icons`. A placeholder logo is at `public/logo.svg`.
`app/layout.jsx` already wires icons and manifest.

## Notes

- Chat API gracefully returns a message if `OPENAI_API_KEY` is missing (so builds never fail).
- Email sign-in quietly logs the magic link if SMTP isn't configured during development.
- ElevenLabs TTS route returns 400 if API key missing (build safe, runtime-gated).
