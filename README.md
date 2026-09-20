# PitchMe

Voice interview coaching MVP for Shipaton 2026. This prototype delivers the complete local UI loop: select a format, answer a prompt, view structured coaching, retry, and compare performance.

## Run

```sh
npm install
npm run start
```

## Android

PitchMe is configured with an Android application ID and the microphone permission. For immediate device testing, install **Expo Go** on an Android phone, run `npm run start`, then scan the QR code.

To create an installable Android preview APK after signing into EAS:

```sh
npx eas-cli build --platform android --profile preview
```

The microphone flow records an answer locally on-device and allows replay from the feedback screen. The coaching scores are still clearly labelled mock data; before release, upload the recording to a server-side speech-to-text and structured-analysis endpoint, and never expose AI provider keys in the app.
