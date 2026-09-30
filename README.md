# VendeClip landing website

The Next.js application is in `vendeclip-home/`, a regular folder, not a submodule.

```sh
cd vendeclip-home
npm ci
npm run dev
```

Preview at http://localhost:3000. The site automatically redirects to a supported browser language. Language selection in the header remains available and remembers the visitor's choice.

## Vercel deployment

Connect `MauroCert/vendeclip-landing` to Vercel, choose **Next.js**, and set **Root Directory** to `vendeclip-home`. Keep the default build and output settings. Use `main` as the production branch. Once the Git integration is connected, pushes trigger deployment. The repository configuration alone does not create that integration.

Review changes locally before committing and pushing. Do not deploy through Sites.

`npm run build` creates a normal Next.js production build in `.next/`; `npm start` serves it. Static export is disabled so browser-language redirects and country-aware pricing can run on the server.

The `output/` folder contains the fictional Villa Luma property photo/video kit. Dependencies, build output, local environment files, and Git metadata are excluded.
