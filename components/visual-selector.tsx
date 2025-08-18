'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Item {
  id: string;
  name: string;
  value: string;
  color: string;
  description?: string;
}

interface VisualSelectorProps {
  title: string;
  items: Item[];
  defaultValue?: string;
}

export default function VisualSelector({
  title,
  items,
  defaultValue,
}: VisualSelectorProps) {
  const [selectedItem, setSelectedItem] = useState(
    defaultValue || items[0]?.value || '',
  );
  const selectedItemData = items.find((item) => item.value === selectedItem);

  return (
    <div className="mt-4">
      <h3 className="font-semibold">{title}</h3>

      <div className="flex gap-0.5 mt-2">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <button
              className={cn(
                'relative w-16 h-16 rounded-lg flex items-center justify-center cursor-pointer',
                item.color,
                {
                  'border-2 dark:border-secondary': selectedItem === item.value,
                },
              )}
              type="button"
              onClick={() => setSelectedItem(item.value)}
            >
              <span className="sr-only">Select the color {item.name}</span>
            </button>
            <span className="text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>

      {/* {selectedItemData?.description && (
        <div className="mt-4 max-w-full bg-background text-foreground py-1 px-2">
          <p className="text-sm break-words">{selectedItemData.description}</p>
        </div>
      )} */}
    </div>
  );
}
