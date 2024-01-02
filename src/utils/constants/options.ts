export enum Universe {
  DC = 1,
  MARVEL = 2,
  SMASH = 3,
  SONIC = 4,
  BEN10 = 5,
  GYVENIMAS = 6,
}

export const Universes: Record<number, string> = {
  [Universe.DC]: 'DC',
  [Universe.MARVEL]: 'Marvel',
  [Universe.SMASH]: 'Smash',
  [Universe.SONIC]: 'Sonic',
  [Universe.BEN10]: 'Ben 10',
  [Universe.GYVENIMAS]: 'Gyvenimas',
};

export const SortOptions: SortOptions = {
  1: 'name',
  2: 'type1',
  3: 'bst',
};

export const GroupOptions: GroupOptions = {
  2: ['type1', 'Type'],
  3: ['universe', 'Universe'],
};

interface SortOptions {
  [key: number]: keyof Character | 'bst';
}

interface GroupOptions {
  [key: number]: [keyof Character, string];
}
