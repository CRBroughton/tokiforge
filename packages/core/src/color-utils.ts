export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSL {
  h: number;
  s: number;
  l: number;
}

export class ColorUtils {
  static hexToRgb(hex: string): ColorRGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  static rgbToHsl(r: number, g: number, b: number): ColorHSL {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  static hslToRgb(h: number, s: number, l: number): ColorRGB {
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  static lighten(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.l = Math.min(100, hsl.l + percent);
    const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
    return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  static darken(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.l = Math.max(0, hsl.l - percent);
    const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
    return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  static saturate(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.s = Math.min(100, hsl.s + percent);
    const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
    return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  static desaturate(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.s = Math.max(0, hsl.s - percent);
    const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
    return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  static generateShades(baseColor: string, count: number = 10): Record<string, string> {
    const shades: Record<string, string> = {};
    const rgb = this.hexToRgb(baseColor);
    if (!rgb) return shades;

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    for (let i = 0; i < count; i++) {
      const lightness = (i / (count - 1)) * 100;
      const newHsl = { ...hsl, l: Math.round(lightness) };
      const newRgb = this.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      const shadeName = `${i * 100}`;
      shades[shadeName] = this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    return shades;
  }

  static generatePalette(baseColor: string, count: number = 5): string[] {
    const rgb = this.hexToRgb(baseColor);
    if (!rgb) return [baseColor];

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const palette: string[] = [];

    for (let i = 0; i < count; i++) {
      const hueShift = (i * 360) / count;
      const newHsl = {
        h: (hsl.h + hueShift) % 360,
        s: hsl.s,
        l: hsl.l,
      };
      const newRgb = this.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      palette.push(this.rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }

    return palette;
  }

  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    if (!rgb1 || !rgb2) return 1;

    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  static isAccessible(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }

  static findAccessibleColor(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): string {
    if (this.isAccessible(foreground, background, level)) {
      return foreground;
    }

    const rgb = this.hexToRgb(foreground);
    if (!rgb) return foreground;

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const targetRatio = level === 'AA' ? 4.5 : 7;

    let minLightness = 0;
    let maxLightness = 100;
    let bestColor = foreground;

    for (let i = 0; i < 20; i++) {
      const testLightness = (minLightness + maxLightness) / 2;
      const testHsl = { ...hsl, l: testLightness };
      const testRgb = this.hslToRgb(testHsl.h, testHsl.s, testHsl.l);
      const testColor = this.rgbToHex(testRgb.r, testRgb.g, testRgb.b);
      const ratio = this.getContrastRatio(testColor, background);

      if (ratio >= targetRatio) {
        bestColor = testColor;
        maxLightness = testLightness;
      } else {
        minLightness = testLightness;
      }
    }

    return bestColor;
  }

  static generateDarkTheme(lightTokens: Record<string, any>): Record<string, any> {
    const darkTokens: Record<string, any> = {};

    for (const [key, value] of Object.entries(lightTokens)) {
      if (typeof value === 'object' && value !== null && 'value' in value) {
        if (value.type === 'color' && typeof value.value === 'string') {
          const hex = value.value;
          const rgb = this.hexToRgb(hex);
          if (rgb) {
            const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            if (key.includes('background') || key.includes('surface')) {
              hsl.l = Math.max(10, hsl.l - 40);
            } else if (key.includes('text')) {
              hsl.l = Math.min(90, hsl.l + 30);
            } else {
              hsl.l = 100 - hsl.l;
            }

            const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
            darkTokens[key] = {
              ...value,
              value: this.rgbToHex(newRgb.r, newRgb.g, newRgb.b),
            };
          } else {
            darkTokens[key] = value;
          }
        } else {
          darkTokens[key] = value;
        }
      } else if (typeof value === 'object') {
        darkTokens[key] = this.generateDarkTheme(value);
      } else {
        darkTokens[key] = value;
      }
    }

    return darkTokens;
  }
}

