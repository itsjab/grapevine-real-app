import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';

import { z } from 'zod';

import type { TastingNoteSelect } from '@/lib/db/schema/wine';

const DEFAULT_GRADIENT = {
  backgroundColor: 'oklch(92.4% 0.12 95.746)',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1111 1111' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\"),      radial-gradient(circle at 15% 25%, oklch(75% 0.08 220) 0%, transparent 65%),      radial-gradient(circle at 85% 15%, oklch(90% 0.15 85) 0%, transparent 70%),      radial-gradient(circle at 70% 80%, oklch(85% 0.12 65) 0%, transparent 60%),      radial-gradient(circle at 30% 90%, oklch(70% 0.08 80) 0%, transparent 55%)",
  backgroundBlendMode: 'overlay, normal, normal, normal, normal',
};

export async function generateGradientFromTastingNote(
  tastingNote: TastingNoteSelect,
) {
  try {
    const { object: gradient } = await generateObject({
      model: anthropic('claude-sonnet-4-20250514'),
      schema: z.object({
        backgroundColor: z
          .string()
          .describe('The background color in oklch format'),
        backgroundImage: z
          .string()
          .describe('The background image CSS property'),
        backgroundBlendMode: z
          .string()
          .describe('The background blend mode CSS property'),
      }),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: '<examples>\n<example>\n<WINE_TASTING_NOTE>\n{\n    "wineName": "Numen Fumé Blanc",\n    "regionName": "Weinviertel",\n    "nose": "Pronounced intensity with clean mineral notes of flint stone and gunpowder. Underneath, gentle fruit aromas of citrus, tangerine, and apricots create a complex aromatic profile.",\n    "palate": "On the palate, fresh citrus fruit flavors of tangerines, lemon zest, apple, and some bruised apple. The finish is medium+ with distinct mineral notes of flint and gunpowder. Bone dry with vibrant medium+ acidity, medium body, and medium alcohol.",\n    "appearance": "Medium lemon-gold color with some haziness, appearing unfiltered.",\n    "acidity": "medium+",\n    "tannins": "low",\n    "sweetness": "dry"\n  }\n</WINE_TASTING_NOTE>\n<ideal_output>\n{\n\t"backgroundColor": "oklch(92.4% 0.12 95.746)",\n\t"backgroundImage": "url(\\"data:image/svg+xml,%3Csvg viewBox=\'0 0 1111 1111\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E\\"),      radial-gradient(circle at 15% 25%, oklch(75% 0.08 220) 0%, transparent 65%),      radial-gradient(circle at 85% 15%, oklch(90% 0.15 85) 0%, transparent 70%),      radial-gradient(circle at 70% 80%, oklch(85% 0.12 65) 0%, transparent 60%),      radial-gradient(circle at 30% 90%, oklch(70% 0.08 80) 0%, transparent 55%)",\n\t"backgroundBlendMode": "overlay, normal, normal, normal, normal"\n}\n</ideal_output>\n</example>\n</examples>\n\n',
            },
            {
              type: 'text',
              text: `You will be creating a mash gradient that reflects a wine's tasting note. The tasting note will be provided to you, and it will contain information about the wine's color, sweetness, acidity, tannins, and various aromas.\n\nHere is the wine tasting note:\n<wine_tasting_note>\n${tastingNote}\n</wine_tasting_note>\n\nYour task is to analyze this tasting note and create a mash gradient representation using specific color values for each attribute. Follow these steps:\n\n1. Parse the tasting note to identify the following attributes:\n   - Color\n   - Sweetness\n   - Acidity\n   - Tannins\n   - Primary aromas\n   - Secondary aromas\n   - Tertiary aromas\n\n2. For each attribute, select the appropriate color value based on the following guidelines:\n\n   Color:\n   White wine:\n   - green: oklch(96.7% 0.067 122.328)\n   - lemon: oklch(97.3% 0.071 103.193)\n   - gold: oklch(92.4% 0.12 95.746)\n   - amber: oklch(87.9% 0.169 91.605)\n   - brown: oklch(55.5% 0.163 48.998)\n\n   Rosé wine:\n   - pink: oklch(94.8% 0.028 342.258)\n   - salmon: oklch(90.1% 0.076 70.697)\n   - orange: oklch(83.7% 0.128 66.29)\n\n   Red wine:\n   - purple: oklch(38.1% 0.176 304.987)\n   - ruby: oklch(40.8% 0.153 2.432)\n   - garnet: oklch(50.5% 0.213 27.518)\n   - brick: oklch(47% 0.157 37.304)\n   - brown: oklch(27.9% 0.077 45.635)\n\n   Sweetness:\n   - dry: oklch(98.7% 0.026 102.212)\n   - off-dry: oklch(97.3% 0.071 103.193)\n   - medium-dry: oklch(94.5% 0.129 101.54)\n   - medium-sweet: oklch(90.5% 0.182 98.111)\n   - sweet: oklch(85.2% 0.199 91.936)\n\n   Acidity:\n   - light: oklch(98.2% 0.018 155.826)\n   - medium-: oklch(96.2% 0.044 156.743)\n   - medium: oklch(92.5% 0.084 155.995)\n   - medium+: oklch(87.1% 0.15 154.449)\n   - high: oklch(79.2% 0.209 151.711)\n\n   Tannins:\n   - low: oklch(93.6% 0.032 17.717)\n   - medium-: oklch(88.5% 0.062 18.334)\n   - medium: oklch(70.4% 0.191 22.216)\n   - medium+: oklch(57.7% 0.245 27.325)\n   - pronounced: oklch(44.4% 0.177 26.899)\n\n   For aromas, choose appropriate color values that best represent the described scents.\n\n   Important considerations:\n   - For red wines, avoid using green tones in the gradient.\n   - For red wines with high acidity, use lighter shades of red and pink depending on the aromas.\n   - Ensure that the chosen colors create a harmonious gradient without white spots.\n\n3. Generate the mash gradient by combining the selected color values. Use the following structure:\n   - backgroundColor: Use the color value for the wine's primary color\n   - backgroundImage: Create a string with the following components:\n     a. SVG noise filter (use the provided example as a template)\n     b. Four radial gradients, each representing a different attribute or aroma\n   - backgroundBlendMode: Use 'overlay, normal, normal, normal, normal'\n\n4. Format the final output as a JavaScript object with the following properties:\n   - backgroundColor\n   - backgroundImage\n   - backgroundBlendMode\n\nEnsure that the output is formatted exactly as shown in the example.\n\nReturn only a valid JSON object containing the mash gradient as depicted in the example.`,
            },
          ],
        },
      ],
    });

    return gradient;
  } catch {
    return DEFAULT_GRADIENT;
  }
}
