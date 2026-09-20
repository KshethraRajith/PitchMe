# PitchMe

Voice interview coaching MVP for Shipaton 2026. This prototype delivers the complete local UI loop: select a format, answer a prompt, view structured coaching, retry, and compare performance.

## Run

```sh
npm install
npm run start
```

The current prototype uses local, clearly labelled mock analysis data. Before release, route recorded audio to a server-side speech-to-text and structured-analysis endpoint; do not expose AI provider keys in the app.
