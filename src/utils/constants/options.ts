import { Identifier, Order } from 'natural-orderby';

import { calculateBST } from '../functions';

export const SortProperties: SortProperty[] = [
  { label: 'Default', identifiers: [] },
  { label: 'Name', identifiers: [(c) => c.name] },
  {
    label: 'Type',
    identifiers: [(c) => ('type1' in c ? c.type1 : null)],
  },
  {
    label: 'Universe',
    identifiers: [(c) => ('universe' in c ? c.universe : null)],
  },
  {
    label: 'Base Stat Total',
    identifiers: [(c) => ('stats' in c ? calculateBST(c.stats) : 0)],
  },
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
  identifiers: Identifier<Character | CharacterWithErrors>[];
}

interface SortOrder {
  label: string;
  order: Order;
}

interface GroupOptions {
  [key: number]: [keyof Character, string];
}
