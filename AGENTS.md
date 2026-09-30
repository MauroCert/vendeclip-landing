# Working on this website

- Use `vendeclip-home/` as the Next.js application directory.
- Preview changes locally at http://localhost:3000. Do not use Sites tooling or publish to the former chatgpt.site deployment.
- Deployment target is Vercel, connected to the GitHub repository. A commit and push can trigger deployment; do not push until the user requests deployment or approves the local changes.
- Vercel project Root Directory must be `vendeclip-home`; use the Next.js framework preset and default build/output settings.
- Keep language routing automatic on unprefixed URLs and respect explicit locale URLs and saved manual preferences.
- Billing currency follows the detected country, not the display language.
