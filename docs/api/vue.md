# Vue API Reference

Complete API reference for `@tokiforge/vue`.

## provideTheme

Provides theme context to Vue components.

### Signature

```typescript
function provideTheme(
  config: ThemeConfig,
  selector?: string,
  prefix?: string,
  defaultTheme?: string
): ThemeContext
```

### Parameters

- `config: ThemeConfig` - Theme configuration object
- `selector?: string` - CSS selector (default: `:root`)
- `prefix?: string` - CSS variable prefix (default: `hf`)
- `defaultTheme?: string` - Override default theme name

### Returns

`ThemeContext` - Context object (usually not needed)

### Example

```vue
<script setup>
import { provideTheme } from '@tokiforge/vue';

provideTheme({
  themes: [
    { name: 'light', tokens: lightTokens },
    { name: 'dark', tokens: darkTokens },
  ],
  defaultTheme: 'light',
});
</script>
```

## useTheme

Composable to access theme context.

### Signature

```typescript
function useTheme(): ThemeContext
```

### Returns

```typescript
interface ThemeContext {
  theme: Ref<string>;
  tokens: ComputedRef<DesignTokens>;
  setTheme: (themeName: string) => void;
  nextTheme: () => void;
  availableThemes: ComputedRef<string[]>;
  runtime: ThemeRuntime;
}
```

### Example

```vue
<script setup>
import { useTheme } from '@tokiforge/vue';

const { theme, tokens, setTheme } = useTheme();

function toggleTheme() {
  setTheme(theme.value === 'light' ? 'dark' : 'light');
}
</script>

<template>
  <button @click="toggleTheme">
    Current: {{ theme }}
  </button>
</template>
```

## Types

All types are exported from `@tokiforge/core`. See [Core API](/api/core) for details.

## Examples

See [Vue Example](/examples/vue) for complete usage examples.


