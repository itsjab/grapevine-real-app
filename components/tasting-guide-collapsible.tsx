import { Check, ChevronRight } from 'lucide-react';
import * as React from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import VisualSelector from '@/components/visual-selector';

export function TastingGuide({
  defaultOpen = 'appearance',
}: {
  defaultOpen?: string;
}) {
  const [openItem, setOpenItem] = React.useState(defaultOpen);

  return (
    <>
      <SidebarGroup className="py-0">
        <Collapsible
          open={openItem === 'appearance'}
          className="group/collapsible"
          onOpenChange={(open: boolean) =>
            open ? setOpenItem('appearance') : setOpenItem('')
          }
        >
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
          >
            <CollapsibleTrigger>
              👀 Appearance{' '}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className="px-2 pb-4">
            <SidebarGroupContent className="overflow-y-auto">
              <h3 className="text-xl font-semibold mt-4">Appearance</h3>
              <p className="mt-2">
                Assessing a wine's appearance includes three simple steps:
                color, intensity, and any other observations such as clarity,
                viscosity, and mousseaux for sparkling wines.
              </p>
              <p className="mt-2">
                Use the following schema to assess the wine's color.
              </p>
              <VisualSelector
                title="White"
                items={[
                  {
                    id: 'green',
                    name: 'Green',
                    value: 'green',
                    color: 'bg-lime-100',
                    description:
                      'A clear, pale yellow color, indicating a young white wine.',
                  },
                  {
                    id: 'lemon',
                    name: 'Lemon',
                    value: 'lemon',
                    color: 'bg-yellow-100',
                    description:
                      'A deeper yellow color, suggesting a more mature white wine.',
                  },
                  {
                    id: 'gold',
                    name: 'Gold',
                    value: 'gold',
                    color: 'bg-amber-200',
                    description:
                      'A rich golden hue, typical of aged white wines or those with oak influence.',
                  },
                  {
                    id: 'amber',
                    name: 'Amber',
                    value: 'amber',
                    color: 'bg-amber-300',
                    description:
                      'A deep amber color, indicating skin contact or oxidation in white wines.',
                  },
                  {
                    id: 'brown',
                    name: 'Brown',
                    value: 'brown',
                    color: 'bg-amber-700',
                    description:
                      'A deep brown color, indicating an oxidized or very old white wine.',
                  },
                ]}
              />

              <VisualSelector
                title="Rosé"
                items={[
                  {
                    id: 'pink',
                    name: 'Pink',
                    value: 'pink',
                    color: 'bg-pink-100',
                    description:
                      'A clear, pale pink color, indicating a young rosé wine.',
                  },
                  {
                    id: 'salmon',
                    name: 'Salmon',
                    value: 'salmon',
                    color: 'bg-orange-200',
                    description:
                      'A deeper pink color, suggesting a more mature rosé wine.',
                  },
                  {
                    id: 'orange',
                    name: 'Orange',
                    value: 'orange',
                    color: 'bg-orange-300',
                    description:
                      'A rich orange hue, typical of rosé wines with extended skin contact.',
                  },
                ]}
              />

              <VisualSelector
                title="Red"
                items={[
                  {
                    id: 'purple',
                    name: 'Purple',
                    value: 'purple',
                    color: 'bg-purple-900',
                    description:
                      'A clear, pale purple color, indicating a young red wine made fro.',
                  },
                  {
                    id: 'ruby',
                    name: 'Ruby',
                    value: 'ruby',
                    color: 'bg-pink-900',
                    description:
                      'A deeper pink color, suggesting a more mature rosé wine.',
                  },
                  {
                    id: 'garnet',
                    name: 'Garnet',
                    value: 'garnet',
                    color: 'bg-red-700',
                    description:
                      'A rich golden hue, typical of aged white wines or those with oak influence.',
                  },
                  {
                    id: 'brick',
                    name: 'Brick',
                    value: 'brick',
                    color: 'bg-orange-800',
                    description:
                      'A deep amber color, indicating skin contact or oxidation in white wines.',
                  },
                  {
                    id: 'brown',
                    name: 'Brown',
                    value: 'brown',
                    color: 'bg-amber-950',
                    description:
                      'A deep brown color, indicating an oxidized or very old white wine.',
                  },
                ]}
              />
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>

      <SidebarSeparator className="mx-0" />

      <SidebarGroup className="py-0">
        <Collapsible
          open={openItem === 'nose'}
          className="group/collapsible"
          onOpenChange={(open: boolean) =>
            open ? setOpenItem('nose') : setOpenItem('')
          }
        >
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
          >
            <CollapsibleTrigger>
              👃🏻 Nose{' '}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className="px-2 pb-4">
            <SidebarGroupContent>
              <h3 className="text-xl font-semibold mt-4">Nose</h3>

              <p className="mt-2">
                When assessing the wine's nose, consider wether the wine smells
                clean, the intensity of the aromas, and the aromas itself. See
                primary, secondary, and tertiary aromas below.
              </p>

              <VisualSelector
                title="Intensity 💥"
                items={[
                  {
                    id: 'light',
                    name: 'Light',
                    value: 'light',
                    color: 'bg-slate-100',
                    description:
                      'A clear, pale purple color, indicating a young red wine made fro.',
                  },
                  {
                    id: 'medium-',
                    name: 'Medium-',
                    value: 'medium-',
                    color: 'bg-slate-200',
                    description:
                      'A deeper pink color, suggesting a more mature rosé wine.',
                  },
                  {
                    id: 'medium',
                    name: 'Medium',
                    value: 'medium',
                    color: 'bg-slate-400',
                    description:
                      'A rich golden hue, typical of aged white wines or those with oak influence.',
                  },
                  {
                    id: 'medium+',
                    name: 'Medium+',
                    value: 'medium+',
                    color: 'bg-slate-500',
                    description:
                      'A deep amber color, indicating skin contact or oxidation in white wines.',
                  },
                  {
                    id: 'pronounced',
                    name: 'Pronounced',
                    value: 'pronounced',
                    color: 'bg-slate-700',
                    description:
                      'A deep brown color, indicating an oxidized or very old white wine.',
                  },
                ]}
              />
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>

      <SidebarSeparator className="mx-0" />

      <SidebarGroup className="py-0">
        <Collapsible
          open={openItem === 'palate'}
          className="group/collapsible"
          onOpenChange={(open: boolean) =>
            open ? setOpenItem('palate') : setOpenItem('')
          }
        >
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
          >
            <CollapsibleTrigger>
              👅 Palate{' '}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className="px-2 pb-4 overflow-y-auto">
            <SidebarGroupContent className="overflow-y-auto">
              <h3 className="text-xl font-semibold mt-4">Palate</h3>

              <p className="mt-2 text-sm">
                Assessing the wine's palate includes a number of factors. See
                primary, secondary, and tertiary aromas for more details.
              </p>

              <VisualSelector
                title="Sweetness 🍯"
                items={[
                  {
                    id: 'dry',
                    name: 'dry',
                    value: 'dry',
                    color: 'bg-yellow-50',
                    description: 'No residual sugar detected',
                  },
                  {
                    id: 'off-dry',
                    name: 'off-dry',
                    value: 'off-dry',
                    color: 'bg-yellow-100',
                    description: 'Very slight sweetness',
                  },
                  {
                    id: 'm-dry',
                    name: 'm-dry',
                    value: 'm-dry',
                    color: 'bg-yellow-200',
                    description: 'Medium-dry with noticeable sweetness',
                  },
                  {
                    id: 'm-sweet',
                    name: 'm-sweet',
                    value: 'm-sweet',
                    color: 'bg-yellow-300',
                    description: 'Medium-sweet with balanced sweetness',
                  },
                  {
                    id: 'sweet',
                    name: 'sweet',
                    value: 'sweet',
                    color: 'bg-yellow-400',
                    description: 'High level of residual sugar',
                  },
                ]}
              />

              <VisualSelector
                title="Acidity ⚡"
                items={[
                  {
                    id: 'low',
                    name: 'low',
                    value: 'low',
                    color: 'bg-green-50',
                    description: 'Low acidity, wine feels flat',
                  },
                  {
                    id: 'm-',
                    name: 'm-',
                    value: 'm-',
                    color: 'bg-green-100',
                    description: 'Medium minus acidity',
                  },
                  {
                    id: 'medium',
                    name: 'medium',
                    value: 'medium',
                    color: 'bg-green-200',
                    description: 'Medium acidity, well balanced',
                  },
                  {
                    id: 'm+',
                    name: 'm+',
                    value: 'm+',
                    color: 'bg-green-300',
                    description: 'Medium plus acidity',
                  },
                  {
                    id: 'high',
                    name: 'high',
                    value: 'high',
                    color: 'bg-green-400',
                    description: 'High acidity, makes mouth water',
                  },
                ]}
              />

              <VisualSelector
                title="Tannins 🍇"
                items={[
                  {
                    id: 'low',
                    name: 'low',
                    value: 'low',
                    color: 'bg-red-100',
                    description: 'Low tannins, smooth texture',
                  },
                  {
                    id: 'm-',
                    name: 'm-',
                    value: 'm-',
                    color: 'bg-red-200',
                    description: 'Medium minus tannins',
                  },
                  {
                    id: 'medium',
                    name: 'medium',
                    value: 'medium',
                    color: 'bg-red-400',
                    description: 'Medium tannins, balanced structure',
                  },
                  {
                    id: 'm+',
                    name: 'm+',
                    value: 'm+',
                    color: 'bg-red-600',
                    description: 'Medium plus tannins',
                  },
                  {
                    id: 'high',
                    name: 'high',
                    value: 'high',
                    color: 'bg-red-800',
                    description: 'High tannins, drying sensation',
                  },
                ]}
              />

              <VisualSelector
                title="Alcohol 🍷"
                items={[
                  {
                    id: 'low',
                    name: 'low',
                    value: 'low',
                    color: 'bg-blue-100',
                    description: 'Low alcohol content, light body',
                  },
                  {
                    id: 'medium',
                    name: 'medium',
                    value: 'medium',
                    color: 'bg-blue-300',
                    description: 'Medium alcohol content',
                  },
                  {
                    id: 'high',
                    name: 'high',
                    value: 'high',
                    color: 'bg-blue-500',
                    description: 'High alcohol content, warming sensation',
                  },
                ]}
              />

              <VisualSelector
                title="Body 🏋️"
                items={[
                  {
                    id: 'light',
                    name: 'light',
                    value: 'light',
                    color: 'bg-slate-100',
                    description: 'Light body, delicate texture',
                  },
                  {
                    id: 'm-',
                    name: 'm-',
                    value: 'm-',
                    color: 'bg-slate-200',
                    description: 'Medium minus body',
                  },
                  {
                    id: 'medium',
                    name: 'medium',
                    value: 'medium',
                    color: 'bg-slate-300',
                    description: 'Medium body, balanced weight',
                  },
                  {
                    id: 'm+',
                    name: 'm+',
                    value: 'm+',
                    color: 'bg-slate-400',
                    description: 'Medium plus body',
                  },
                  {
                    id: 'full',
                    name: 'full',
                    value: 'full',
                    color: 'bg-slate-500',
                    description: 'Full body, rich and concentrated',
                  },
                ]}
              />

              <VisualSelector
                title="Intensity 🔥"
                items={[
                  {
                    id: 'light',
                    name: 'light',
                    value: 'light',
                    color: 'bg-gray-100',
                    description: 'Light intensity of flavors',
                  },
                  {
                    id: 'm-',
                    name: 'm-',
                    value: 'm-',
                    color: 'bg-gray-200',
                    description: 'Medium minus intensity',
                  },
                  {
                    id: 'medium',
                    name: 'medium',
                    value: 'medium',
                    color: 'bg-gray-300',
                    description: 'Medium intensity, well-defined flavors',
                  },
                  {
                    id: 'm+',
                    name: 'm+',
                    value: 'm+',
                    color: 'bg-gray-400',
                    description: 'Medium plus intensity',
                  },
                  {
                    id: 'pronounced',
                    name: 'pronounced',
                    value: 'pronounced',
                    color: 'bg-gray-500',
                    description: 'Pronounced intensity, powerful flavors',
                  },
                ]}
              />

              <VisualSelector
                title="Finish 🏁"
                items={[
                  {
                    id: 'short',
                    name: 'short',
                    value: 'short',
                    color: 'bg-amber-100',
                    description: 'Short finish, flavors fade quickly',
                  },
                  {
                    id: 'm-',
                    name: 'm-',
                    value: 'm-',
                    color: 'bg-amber-200',
                    description: 'Medium minus finish',
                  },
                  {
                    id: 'medium',
                    name: 'medium',
                    value: 'medium',
                    color: 'bg-amber-300',
                    description: 'Medium finish, flavors linger pleasantly',
                  },
                  {
                    id: 'm+',
                    name: 'm+',
                    value: 'm+',
                    color: 'bg-amber-400',
                    description: 'Medium plus finish',
                  },
                  {
                    id: 'long',
                    name: 'long',
                    value: 'long',
                    color: 'bg-amber-500',
                    description: 'Long finish, flavors persist',
                  },
                ]}
              />
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>

      <SidebarSeparator className="mx-0" />

      <SidebarGroup className="py-0">
        <Collapsible
          open={openItem === 'primary'}
          className="group/collapsible"
          onOpenChange={(open: boolean) =>
            open ? setOpenItem('primary') : setOpenItem('')
          }
        >
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
          >
            <CollapsibleTrigger>
              🍇 Primary Aromas{' '}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className="px-2 pb-4">
            <SidebarGroupContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-xl font-semibold mt-4">Primary aromas</h3>
                  <p className="mt-2 text-sm">
                    The aromas and flavours of the grape and alcoholic
                    fermentation
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🌸 Floral</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    blossom, elderflower, honeysuckle, jasmine, rose, violet
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍏 Green Fruit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    apple, pear, gooseberry, grape
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍋 Citrus</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    grapefruit, lemon, lime, orange, tangerine
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍑 Stone Fruit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    peach, apricot, nectarine
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍍 Tropical Fruit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    banana, lychee, mango, melon, passion fruit, pineapple
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍒 Red Fruit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    redcurrant, cranberry, raspberry, strawberry, red cherry,
                    red plum
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🫐 Black Fruit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    blackcurrant, blackberry, blueberry, black cherry, black
                    plum
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🫑 Herbaceous</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    green bell pepper (capsicum), grass, tomato leaf, asparagus
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🌿 Herbal</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    eucalyptus, mint, fennel, dill, dried herbs (e.g. thyme,
                    oregano)
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🫚 Spice</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    black pepper, white pepper, cinnamon, clove, ginger, nutmeg,
                    anise, licorice
                  </p>
                </div>

                <div>
                  <p className="font-semibold">☀️ Fruit Ripeness</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    unripe fruit, ripe fruit, dried fruit, cooked fruit
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🏔️ Other</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    wet stone, flint, chalk, salt
                  </p>
                </div>
              </div>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>

      <SidebarSeparator className="mx-0" />

      <SidebarGroup className="py-0">
        <Collapsible
          open={openItem === 'secondary'}
          className="group/collapsible"
          onOpenChange={(open: boolean) =>
            open ? setOpenItem('secondary') : setOpenItem('')
          }
        >
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
          >
            <CollapsibleTrigger>
              🧪 Secondary Aromas{' '}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className="px-2 pb-4">
            <SidebarGroupContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-xl font-semibold mt-4">
                    Secondary Aromas and Flavours
                  </h3>
                  <p className="mt-2 text-sm">
                    The aromas and flavours of post-fermentation winemaking
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍞 Yeast</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    lees, autolysis, flor, biscuit/graham cracker, bread,
                    toasted bread, pastry, brioche, bread dough, cheese, yogurt,
                    acetaldehyde
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🧈 Malolactic conversion</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    butter, cream, cheese
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🪵 Oak</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    vanilla, cloves, coconut, cedar, charred wood, smoke,
                    chocolate, coffee
                  </p>
                </div>
              </div>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>

      <SidebarSeparator className="mx-0" />

      <SidebarGroup className="py-0">
        <Collapsible
          open={openItem === 'tertiary'}
          className="group/collapsible"
          onOpenChange={(open: boolean) =>
            open ? setOpenItem('tertiary') : setOpenItem('')
          }
        >
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
          >
            <CollapsibleTrigger>
              🍷 Tertiary Aromas{' '}
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent className="px-2 pb-4">
            <SidebarGroupContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-xl font-semibold mt-4">
                    Tertiary Aromas and Flavours
                  </h3>
                  <p className="mt-2 text-sm">
                    The aromas and flavours of maturation
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🍷 Red wine</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    dried fruit (e.g. prune, raisin, fig), cooked fruit (e.g.
                    cooked plum, cooked cherry), leather, earth, mushroom, game,
                    tobacco, wet leaves, forest floor, caramel
                  </p>
                </div>

                <div>
                  <p className="font-semibold">🥂 White wine</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    dried fruit (e.g. dried apricot, raisin) orange marmalade,
                    petrol (gasoline), cinnamon, ginger, nutmeg, almond,
                    hazelnut, honey, caramel
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    🍯 Deliberately oxidised wines
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    almond, hazelnut, walnut, chocolate, coffee, caramel
                  </p>
                </div>
              </div>
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroup>
    </>
  );
}
