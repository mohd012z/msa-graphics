# MSA Graphics

Android graphics research project. Version 0.10.2 (`versionCode 12`, `applicationId org.msa.graphics`).

## Layout

- `engine/` — 11 JavaScript ES modules (core, render, simulation, spatial, world, fft, integration, project, animation, production, advanced).
- `android/app/src/main/assets/` — Copies of the engine modules plus the HTML front-ends. CI fails if any engine module differs from its asset copy, so edit `engine/` first and copy.
- `android/app/src/main/java/org/msa/graphics/` — `MainActivity.java`, `NativeScene.java`.
- `tests/` — Node test suite (`node --test tests/*.test.mjs`).
- `.github/workflows/android.yml` — CI for the `build/android-v0.8.1` branch.

## Checks

- JavaScript: `node --test tests/*.test.mjs` (Node 22). Last local run: 100 pass, 0 fail.
- Debug APK: `gradle -p android assembleDebug` with Android platform 35 and build-tools 35.0.0. Requires an Android SDK; not run locally.

## Branches

- `build/android-v0.8.1` — Build branch; its code is version 0.10.2, so the name predates the current version.
- `main` — Mirrors the build branch content through the PR that added this README.
