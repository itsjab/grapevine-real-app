'use client';

import { delay, wrap } from 'motion';
import { Typewriter } from 'motion-plus/react';
import { useState } from 'react';

export default function WineTypewriter({
  text = [
    'Pressing Grapes',
    'Fining',
    'Bottling',
    'Pruning',
    'Trellising',
    'Harvesting',
    'Fermenting',
    'Crushing',
    'Racking',
    'Blending',
  ],
}: {
  text?: string[];
}) {
  const [index, setIndex] = useState(0);

  return (
    <Typewriter
      as="div"
      onComplete={() => {
        delay(() => setIndex(wrap(0, text.length, index + 1)), 1);
      }}
    >
      {text[index]}
    </Typewriter>
  );
}
