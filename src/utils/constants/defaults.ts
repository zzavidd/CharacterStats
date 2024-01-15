import { Stat, Universe } from './enums';

export const DEFAULT_STATS: Stats = {
  [Stat.HP]: 0,
  [Stat.ATTACK]: 0,
  [Stat.DEFENCE]: 0,
  [Stat.SPATK]: 0,
  [Stat.SPDEF]: 0,
  [Stat.SPEED]: 0,
};

export const DEFAULT_CHARACTER_INPUT: CharacterInput = {
  name: '',
  universe: Universe.NONE,
  type1: undefined,
  type2: null,
  ability1: undefined,
  ability2: null,
  abilityX: null,
  learnset: [],
  stats: DEFAULT_STATS,
};

export const StatMap: Record<Stat, string> = {
  [Stat.HP]: 'HP',
  [Stat.ATTACK]: 'Attack',
  [Stat.DEFENCE]: 'Defence',
  [Stat.SPATK]: 'Sp. Atk',
  [Stat.SPDEF]: 'Sp. Def',
  [Stat.SPEED]: 'Speed',
};
