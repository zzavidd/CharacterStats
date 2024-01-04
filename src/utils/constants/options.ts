import { Identifier, Order } from 'natural-orderby';

import { calculateBST } from '../functions';

import { Universe } from './enums';

export const Universes: Record<number, string> = {
  [Universe.DC]: 'DC',
  [Universe.MARVEL]: 'Marvel',
  [Universe.SMASH]: 'Smash',
  [Universe.SONIC]: 'Sonic',
  [Universe.BEN10]: 'Ben 10',
  [Universe.GYVENIMAS]: 'Gyvenimas',
};

export const SortProperties: SortProperty[] = [
  { label: 'Default', identifiers: [] },
  { label: 'Name', identifiers: [(c) => c.name] },
  { label: 'Type', identifiers: [(c) => c.type1] },
  { label: 'BST', identifiers: [(c) => calculateBST(c.stats)] },
  { label: 'Last Modified', identifiers: [(c) => c.lastModified] },
  { label: 'Create Time', identifiers: [(c) => c.createTime] },
];

export const SortOrders: SortOrder[] = [
  { label: 'Ascending', order: 'asc' },
  { label: 'Descending', order: 'desc' },
];

export const GroupOptions: GroupOptions = {
  2: ['type1', 'Type'],
  3: ['universe', 'Universe'],
};

interface SortProperty {
  label: string;
  identifiers: Identifier<Character>[];
}

interface SortOrder {
  label: string;
  order: Order;
}

interface GroupOptions {
  [key: number]: [keyof Character, string];
}
