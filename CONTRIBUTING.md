# Contributing

## Requirements and setup

- Node 22+.

```bash
npm install
npx playwright install chromium
```

## Project basics

The main source code this this project lives in `src` and is written in TypeScript. This TypeScript is executed directly by node, so it can only use strip-types safe features (e.g. no enums).


## Scenario scripts

Scripts are plain `.mjs` files you can inspect and hand-edit:

```js
// Auto-generated scenario code
// Source: scenarios/editor-overview.prompt.md
// prompt-hash: a1b2c3d4e5f6

export const files = {
  "src/app.ts": `import express from 'express';
const app = express();`,
};

export default async function(helpers) {
  await helpers.openFile('src/app.ts');
  await helpers.wait(1000);
  await helpers.saveScreenshot('Editor showing app.ts');
}
```

### Helpers API

Scripts receive a `helpers` object with these methods:

| Method | Description |
|--------|-------------|
| `helpers.openFile(filename)` | Open a file via Quick Open |
| `helpers.runCommand(command)` | Run a Command Palette command |
| `helpers.pressKey(key)` | Press a key or key combo |
| `helpers.typeText(text, delay?)` | Type text with optional delay between keystrokes |
| `helpers.wait(ms)` | Wait for a duration |
| `helpers.saveScreenshot(description?)` | Capture and save a screenshot |
