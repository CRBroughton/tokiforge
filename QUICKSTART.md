# Quick Start Guide

Get started with TokiForge in 5 minutes!

## Installation

```bash
npm install @tokiforge/core @tokiforge/react
```

Or for Vue:

```bash
npm install @tokiforge/core @tokiforge/vue
```

Or for Svelte:

```bash
npm install @tokiforge/core @tokiforge/svelte
```

## Using the CLI

### 1. Initialize

```bash
npx tokiforge-cli init
```

This creates:
- `tokens.json` - Your design tokens
- `TokiForge.config.json` - Configuration file

### 2. Define Your Tokens

Edit `tokens.json`:

```json
{
  "color": {
    "primary": { "value": "#7C3AED", "type": "color" },
    "accent": { "value": "#06B6D4", "type": "color" }
  },
  "radius": {
    "lg": { "value": "12px", "type": "dimension" }
  }
}
```

### 3. Build

```bash
npx TokiForge-cli build
```

This generates:
- `dist/tokens.css` - CSS custom properties
- `dist/tokens.js` - JavaScript exports
- `dist/tokens.ts` - TypeScript exports
- `dist/tokens.scss` - SCSS variables

### 4. Use in Your App

**React:**

```tsx
import { ThemeProvider, useTheme } from '@tokiforge/react';

function App() {
  return (
    <ThemeProvider config={themeConfig}>
      <YourComponents />
    </ThemeProvider>
  );
}

function Button() {
  const { tokens, setTheme } = useTheme();
  return (
    <button
      style={{
        backgroundColor: tokens.color.primary,
        borderRadius: tokens.radius.lg,
      }}
    >
      Click me
    </button>
  );
}
```

**Vue:**

```vue
<script setup>
import { provideTheme, useTheme } from '@tokiforge/vue';

provideTheme(themeConfig);
const { tokens, setTheme } = useTheme();
</script>
```

**Svelte:**

```svelte
<script>
import { createThemeStore } from '@tokiforge/svelte';

const themeStore = createThemeStore(themeConfig);
</script>

<button style="background-color: var(--hf-color-primary);">
  Click me
</button>
```

## Development

Preview your themes:

```bash
npx TokiForge-cli dev
```

Opens a local server at http://localhost:3000 with live theme preview.

## Next Steps

- Read the [full README](./README.md)
- Check out [examples](./examples/)
- See [Contributing Guide](./CONTRIBUTING.md)

