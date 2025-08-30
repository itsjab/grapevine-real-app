import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export async function generateVarietalGuide(variety: string) {
  const { text } = await generateText({
    model: anthropic('claude-4-sonnet-20250514'),
    temperature: 1,
    system:
      'You are a wine expert, writing grape varietal guides. You know your way around wine, but you are not a wine snob.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "<examples>\n<example>\n<GRAPE_VARIETY>\nRiesling\n</GRAPE_VARIETY>\n<ideal_output>\n# Riesling\naromatic, vibrant acidity, intense fruit, fine minerality, great aging potential\n\n## Growing Regions\nRiesling is a cool climate grape variety that prefers steep slopes. In Germany, Riesling is cultivated in all wine-growing regions. In Alsace, Riesling is the most important grape variety alongside Pinot Blanc and Gewürztraminer, grown in numerous Grand Cru sites.\nIn Austria, Riesling thrives along the Danube in the DACs Wachau, Kremstal and Kamptal and on the steep slopes of Styria.\nIn the New World, high-quality Riesling wines are produced in Australia (Clare Valley and Eden Valley) and the US states of New York (Finger Lakes) and Michigan.\n\n## Wine Styles\nRiesling is vinified into dry, semi-dry (off-dry) and fruity sweet wines. It is typically produced without oak. Sweet wines in particular have great aging potential. Aged Trockenbeerenauslese (noble rot selection) are among the most expensive wines in the world.\n\n**Dry**\nDry Rieslings often exhibit vibrant acidity and intense fruit aromas that vary depending on the ripeness of the grapes.\n\n**Semi-dry**\nOff-dry Rieslings thrive on the balance between subtle residual sweetness and lively acidity, accompanied by characteristic aromas such as peach, apricot and delicate citrus notes.\n\n**Fruity sweet**\nA fruity sweet Riesling is characterized by a distinctly noticeable, natural sweetness and offers intense aromas of ripe fruits such as apricot, peach and honeydew melon, often accompanied by honey notes. The high acidity provides freshness and balance.\n\n**Sparkling wine**\nRiesling is increasingly used for sparkling wine production. Riesling sparkling wine is typically fresh and crisp, with high acidity and intense fruit notes. This makes it suitable as a food companion.\n\n## Tasting Profile\nRiesling typically produces wines with high acidity and intense fruit aromas. Notes of citrus fruits, stone fruits and exotic fruits are typical. Many Rieslings have a mineral note, and aged wines can exhibit petrol notes.\n\n### Characteristics\n\n👁️ Color: generally green to golden, depending on age and ripeness\n\n⚡️ Acidity: high\n\n🏋️ Body: light to medium\n\n### Primary Aromas\n\n🌸 Floral: citrus blossoms\n\n🍋 Citrus: lemon, lime\n\n🍏 Green Fruit: apple, pear\n\n🍑 Stone Fruit (in sweeter styles): apricot, nectarine\n\n🍍 Tropical Fruit (in riper examples): pineapple, honeydew melon\n\n🏔️Mineral: flint, wet stone, salt\n\n### Secondary Aromas\n\nRiesling usually does not show strong secondary aromas. Most producers avoid malolactic fermentation to retain Riesling’s characteristic high acidity and dominant fruit flavor. Oaked examples are rare.\n\n### Tertiary Aromas\n\n🍑 Dried fruit: dried apricot, dried pineapple\n\n🍯 Spice: honey, ginger\n\n⛽️ Other: petrol, wax\n\n## Other grape varieties you might like\n* [Gewürztraminer](/varieties/gewuerz-traminer) - Similar aromatic profile\n* [Chenin Blanc](/varieties/chenin-blanc) - Comparable acidity and versatility\n* [Grüner Veltliner](/varieties/gruener-veltliner) - Similar mineral character\n* [Albariño](/varieties/albarinho) - Comparable citrus profile and acidity\n</ideal_output>\n</example>\n<example>\n<GRAPE_VARIETY>\nGamay\n</GRAPE_VARIETY>\n<ideal_output>\n# Gamay\\nlight-bodied, high acidity, fresh fruit character, low tannins, often overlooked\\n\\n## Growing Regions\\nGamay is primarily associated with the Beaujolais region in France, where it produces the famous Beaujolais wines across ten crus including Morgon, Moulin-à-Vent, and Fleurie. The grape thrives in the granite soils of northern Beaujolais and the clay-limestone soils of the south.\\n\\nOutside of Beaujolais, Gamay is cultivated in the Loire Valley, particularly in Touraine, where it produces fresh, everyday wines. Small plantings exist in Switzerland's Valais region and parts of eastern France. In the New World, Gamay can be found in cooler regions of California, Oregon, and Ontario, Canada, though plantings remain limited.\\n\\n## Wine Styles\\nGamay is typically vinified using carbonic maceration or semi-carbonic maceration, which preserves the grape's fresh fruit character and results in wines with bright color and low tannins. Most Gamay wines are meant for early consumption, though some cru Beaujolais can age for several years.\\n\\n**Beaujolais Nouveau**\\nReleased just weeks after harvest, these wines showcase Gamay's bright, fresh fruit character with banana and bubble gum notes from the carbonic maceration process.\\n\\n**Beaujolais Villages**\\nMore structured than Nouveau, these wines offer greater depth while maintaining Gamay's characteristic lightness and food-friendly nature.\\n\\n**Cru Beaujolais**\\nThe ten crus produce more complex expressions of Gamay, with varying characteristics depending on terroir. Some, like Morgon and Moulin-à-Vent, can develop earthy, more structured profiles with age.\\n\\n## Tasting Profile\\nGamay produces light to medium-bodied wines with high acidity and low tannins. The wines are known for their bright fruit character and food-friendly nature, making them excellent companions to a wide range of dishes\n\n### Characteristics\n\n👁️ Color: light to medium ruby, often with violet highlights\n\n⚡️ Acidity: medium to high\n\n🏋️ Body: light to medium\n\n🍇 Tannins: light to medium\n\n### **Primary Aromas**\n\n🍒 Red Fruit: sour cherry, strawberry\n\n🫐 Dark Fruit: dark cherry, blueberry\n\n### Secondary Aromas\n\n🍇 Carbonic Maceration: cherry, banana, bubblegum, spice\n\n🪵 Oak Aging:  \n\n### Tertiary Aromas\n\n🍄‍🟫 Earthy: mushroom, forest floor, leather\n\n## Other grape varieties you might like\\n* [Pinot Noir](/varieties/pinot-noir) - Similar light body and red fruit character\\n* [Dolcetto](/varieties/dolcetto) - Comparable low tannins and food-friendly style\\n* [Cinsault](/varieties/cinsault) - Similar fresh, light-bodied profile\\n* [Barbera](/varieties/barbera) - Comparable high acidity and bright fruit\\n* [Zweigelt](/varieties/zweigelt) - Similar cherry notes and approachable style\n</ideal_output>\n</example>\n<example>\n<GRAPE_VARIETY>\nAlbariñho\n</GRAPE_VARIETY>\n<ideal_output>\n# Albariño\\nhigh acidity, mineral-driven, citrus and stone fruit flavors, saline character, hip & trendy\\n\\n## Growing Regions\\nAlbariño is primarily cultivated in the Rías Baixas region of northwestern Spain, where it thrives in the cool, humid Atlantic climate. The grape performs exceptionally well in the granite and sandy soils of Galicia's coastal subzones, including Val do Salnés, Condado do Tea, and O Rosal.\\n\\nOutside of Spain, Albariño has found success in Portugal's Vinho Verde region, where it is known as Alvarinho and often blended with other local varieties. Small but growing plantings exist in California's Central Coast, particularly in Monterey and San Luis Obispo counties, as well as in Australia's Adelaide Hills and parts of Chile's coastal regions.\\n\\n## Wine Styles\\nAlbariño is typically vinified as a dry white wine, with most producers emphasizing the grape's natural acidity and mineral character. The majority of Albariño wines are made in stainless steel to preserve freshness and fruit purity, though some premium examples undergo partial barrel fermentation or lees aging to add texture and complexity.\\n\\n**Traditional Style**\\nClassic Albariño wines are crisp, mineral-driven, and unoaked, showcasing the grape's characteristic saline quality and bright acidity. These wines are designed for immediate consumption and pair excellently with seafood.\\n\\n**Premium Style**\\nHigher-end Albariño wines may incorporate techniques such as sur lie aging, partial malolactic fermentation, or brief oak contact to create more textured, complex wines while maintaining the variety's essential freshness.\\n\\n**Blends**\\nIn some regions, particularly Portugal, Albariño is blended with varieties like [Loureiro](/varieties/loureiro) and [Trajadura](/varieties/trajadura) to create multi-dimensional white wines.\\n\\n## Tasting Profile\\nAlbariño produces wines with bright acidity and a distinctive mineral character often described as saline or sea-spray-like. The wines typically show citrus and stone fruit flavors with a clean, refreshing finish that makes them ideal partners for seafood and light dishes.\\n\\n### Characteristics\\n\\n👁️ Color: pale lemon to light gold, typically with green highlights\\n\\n⚡️ Acidity: medium+ to high\\n\\n🏋️ Body: light to medium\\n\\n### Primary Aromas\\n\\n🍋 Citrus: lemon, lime, grapefruit\\n\\n🍏 Green Fruit: green apple, pear\\n\\n🍑 Stone Fruit: peach, apricot, nectarine\\n\\n🌸 Floral: white flowers, citrus blossom\\n\\n🏔️ Mineral: wet stone, saline, sea spray\\n\\n### Secondary Aromas\\n\\nAlbariño is typically fermented and aged in stainless steel, resulting in minimal secondary aromas. Premium examples that undergo lees contact or partial oak aging may show:\\n\\n🍞 Lees: biscuit, bread dough\\n\\n🪵 Oak (minimal): subtle vanilla, light spice\\n\\n### Tertiary Aromas\\n\\n🍯 Spice: honey, almond\\n\\n🥜 Nuts: hazelnut (in aged examples)\\n\\n🌿 Herbal: dried herbs, mineral complexity\\n\\n## Other grape varieties you might like\\n* [Riesling](/varieties/riesling) - Similar high acidity and mineral character\\n* [Sancerre](/varieties/sauvignon-blanc) - Comparable citrus profile and food-friendliness\\n* [Muscadet](/varieties/muscadet) - Similar saline quality and seafood pairing ability\\n* [Godello](/varieties/godello) - Another Spanish white with mineral complexity\\n* [Arinto](/varieties/arinto) - Portuguese variety with comparable acidity and structure\n</ideal_output>\n</example>\n</examples>\n\n",
          },
          {
            type: 'file',
            mediaType: 'application/pdf',
            data: 'https://www.wsetglobal.com/media/3119/wset_l3_wines_sat_en_jun-2016.pdf',
          },
          {
            type: 'text',
            text: `
              You are tasked with writing a concise guide for a specific grape variety. Follow these instructions carefully to create an informative and well-structured guide:

              1. The grape variety you will be writing about is:
              <grape_variety>
              ${variety}
              </grape_variety>

              2. Write your guide in markdown format, following this structure:
                a. Start with a level 1 heading (#) of the grape variety name
                b. Include a brief description (1-2 lines) of key characteristics
                c. Use only aromas from the aroma list below to create a variety's tasting profile.
                d. Do not list aromas from malolactic conversion such as butter, cream for red grape varieties.
                e. Select only aromas that are commonly associated with the variety, e.g. black pepper and savory notes with Syrah. As a rule of thumb, less is more when selecting aromas.


              3. When mentioning other grape varieties, wrap them in a link with the following format: [Variety Name](/varieties/variety-name). For example: [Chardonnay](/varieties/chardonnay). Do not wrap the main grape variety you are writing about in a link.

              4. Avoid using superlative terms such as "the king of grapes" or "finds its spiritual home in".

              5. Conclude your guide with a section titled "Other grape varieties you might like". List 3-5 recommended varietals that are grown in the same region or have similar characteristics to the main grape variety. Format these as a bulleted list with links, as described in point 3.

              6. Ensure your guide follows a similar structure and level of detail as the example provided for Riesling, Gamay & Albariñho.

              Aroma List

              Primary aromas
              The aromas and flavours of the grape and alcoholic fermentation

              🌸 Floral
              blossom, elderflower, honeysuckle, jasmine, rose, violet

              🍏 Green Fruit
              apple, pear, gooseberry, grape

              🍋 Citrus
              grapefruit, lemon, lime, orange, tangerine

              🍑 Stone Fruit
              peach, apricot, nectarine

              🍍 Tropical Fruit
              banana, lychee, mango, melon, passion fruit, pineapple

              🍒 Red Fruit
              redcurrant, cranberry, raspberry, strawberry, red cherry, red plum

              🫐 Black Fruit
              blackcurrant, blackberry, blueberry, black cherry, black plum

              🫑 Herbaceous
              green bell pepper (capsicum), grass, tomato leaf, asparagus

              🌿 Herbal
              eucalyptus, mint, fennel, dill, dried herbs (e.g. thyme, oregano)

              🫚 Spice
              black pepper, white pepper, cinnamon, clove, ginger, nutmeg, anise, licorice

              ☀️ Fruit Ripeness
              unripe fruit, ripe fruit, dried fruit, cooked fruit

              🏔️ Other
              wet stone, flint, chalk, salt

              Secondary Aromas and Flavours
              The aromas and flavours of post-fermentation winemaking

              🍞 Yeast
              fresh bred, pastry, brioche, lees

              🧈 Malolactic conversion
              butter & butter milk, joghurt, cream

              🪵 Oak
              vanilla, cloves, coconut, cedar, charred wood, smoke, chocolate, coffee

              Tertiary Aromas and Flavours
              The aromas and flavours of maturation

              🍑 Dried Fruit
              white: apricot, raisin, orange marmelade
              red: fig, date, plum, cherry, banana

              🍄‍🟫 Earthy
              white: wet soil, champignon
              red: wet soil, forest floor, mushrooms, truffle

              🪵 Smoky/Spicy
              red: tobacco, cigar box, black tea

              🥩 Savory
              red: game, olive tapenade, leather, soy sauce

              🥜 Nuts
              white: almond, hazelnut, walnut

              🍯 Caramalized
              white: honey, caramel

              ⛽️ Other
              white: petroleum, kerosene, wax, wool
            `,
          },
        ],
      },
    ],
  });

  return text;
}

export async function generateSummary(variety: string) {
  const { text } = await generateText({
    model: anthropic('claude-4-sonnet-20250514'),
    temperature: 1,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "<examples>\n<example>\n<GRAPE_VARIETY>\nMalbec\n</GRAPE_VARIETY>\n<ideal_output>\nArgentina's adopted red grape. Blueberry Cake. Spicy and rich in Argentina, gamay in Cahors.\n</ideal_output>\n</example>\n<example>\n<GRAPE_VARIETY>\nChenin Blanc\n</GRAPE_VARIETY>\n<ideal_output>\nExtremely versatile: honey, damp straw, apple characters.\n</ideal_output>\n</example>\n<example>\n<GRAPE_VARIETY>\nSangiovese\n</GRAPE_VARIETY>\n<ideal_output>\nItaly's most-planted red grape. Tangy, lively, fairly pale, variable flavors: from prunes to farmyard\n</ideal_output>\n</example>\n<example>\n<GRAPE_VARIETY>\nSyrah\n</GRAPE_VARIETY>\n<ideal_output>\nHome to the Northern Rhône, now planted all around the globe. Dense and rich with the signature savory kick: dark fruit, black pepper, dark chocolate, notable tannin.\n</ideal_output>\n</example>\n</examples>\n\n",
          },
          {
            type: 'text',
            text: `You are a wine expert. Your task is to create a concise, one-sentence statement of a grape variety\nHere is the grape variety\n<grape_variety\n${variety}\n</grape_variety>\n\nTo create your summary, follow these guidelines:\n1. Your summary should be concise yet comprehensive, capturing the essence of the grape varietal in about 10-15 words.\n\n4. Focus on the grape\'s primary characteristics, such as its flavor profile, acidity, body, or any unique qualities that set it apart from other varietals.\n\n5. If relevant, you may mention a place or country associated with the grape variety. This should only be included if it\'s particularly significant or helps to define the grape\'s identity.\n\n6. Follow the style of the provided examples.\n\n7. Avoid using phrases like "This grape is..." or "Known for...". Instead, aim for a more direct and impactful description.\n\n8. Avoid superlatives like "The king of grapes" or "The world\'s most...".\n\nOnce you have crafted your summary, simply return it as a string\n\nRemember, your goal is to create a concise yet informative summary that captures the essence of the grape varietal in a single, well-crafted sentence.`,
          },
        ],
      },
    ],
  });

  return text;
}
