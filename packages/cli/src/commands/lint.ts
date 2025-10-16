import * as fs from 'fs';
import * as path from 'path';
import { TokenParser } from '@tokiforge/core';

interface LintResult {
  errors: string[];
  warnings: string[];
}

export async function lintCommand(projectPath: string = process.cwd()): Promise<void> {
  const configPath = path.join(projectPath, 'tokiforge.config.json');

  if (!fs.existsSync(configPath)) {
    console.error('❌ tokiforge.config.json not found. Run "tokiforge init" first.');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const inputPath = path.resolve(projectPath, config.input);

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Token file not found: ${inputPath}`);
    process.exit(1);
  }

  console.log('🔍 Linting tokens...\n');

  const result: LintResult = { errors: [], warnings: [] };

  try {
    TokenParser.parse(inputPath, { validate: true });

    if (config.themes && Array.isArray(config.themes)) {
      for (const theme of config.themes) {
        const tokens = theme.tokens;
        if (tokens?.color) {
          const textPrimary = tokens.color?.text?.primary?.value;
          const bgDefault = tokens.color?.background?.default?.value;
          
          if (textPrimary && bgDefault) {
            const brightness = (hex: string) => {
              const rgb = hex.match(/[0-9a-f]{2}/gi)?.map(v => parseInt(v, 16)) || [];
              return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
            };
            
            const textBright = brightness(String(textPrimary).replace('#', ''));
            const bgBright = brightness(String(bgDefault).replace('#', ''));
            const contrast = Math.abs(textBright - bgBright);
            
            if (contrast < 50) {
              result.warnings.push(
                `Theme "${theme.name}": Low contrast between text.primary and background.default (${contrast.toFixed(0)})`
              );
            }
          }
        }
      }
    }

    const checkDuplicates = (obj: any, prefix: string = '', seen: Set<string> = new Set()) => {
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (obj[key] && typeof obj[key] === 'object' && 'value' in obj[key]) {
          if (seen.has(fullKey)) {
            result.warnings.push(`Duplicate token name: ${fullKey}`);
          }
          seen.add(fullKey);
        } else if (obj[key] && typeof obj[key] === 'object') {
          checkDuplicates(obj[key], fullKey, seen);
        }
      }
    };

    const tokens = TokenParser.parse(inputPath);
    checkDuplicates(tokens);

    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log('✅ All tokens are valid!\n');
    } else {
      if (result.errors.length > 0) {
        console.error('❌ Errors:\n');
        result.errors.forEach(err => console.error(`   ${err}`));
        console.log('');
      }
      if (result.warnings.length > 0) {
        console.warn('⚠️  Warnings:\n');
        result.warnings.forEach(warn => console.warn(`   ${warn}`));
        console.log('');
      }
    }

    if (result.errors.length > 0) {
      process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

