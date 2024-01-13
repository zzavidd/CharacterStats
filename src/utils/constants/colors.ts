import { Generation, PokeType, Stat } from './enums';

export const STAT = {
  [Stat.HP]: '#A60000',
  [Stat.ATTACK]: '#9C531F',
  [Stat.DEFENCE]: '#A1871F',
  [Stat.SPATK]: '#445E9C',
  [Stat.SPDEF]: '#4E8234',
  [Stat.SPEED]: '#A13959',
};

export const COLOR_TYPE = {
  [PokeType.BUG]: '#6D7815',
  [PokeType.DARK]: '#49392F',
  [PokeType.DRAGON]: '#4924A1',
  [PokeType.ELECTRIC]: '#A1871F',
  [PokeType.FAIRY]: '#9B6470',
  [PokeType.FIGHTING]: '#7D1F1A',
  [PokeType.FIRE]: '#9C531F',
  [PokeType.FLYING]: '#6D5E9C',
  [PokeType.GHOST]: '#493963',
  [PokeType.GRASS]: '#4E8234',
  [PokeType.GROUND]: '#927D44',
  [PokeType.ICE]: '#638D8D',
  [PokeType.NORMAL]: '#6d5f4e',
  [PokeType.POISON]: '#682A68',
  [PokeType.PSYCHIC]: '#A13959',
  [PokeType.ROCK]: '#786824',
  [PokeType.STEEL]: '#787887',
  [PokeType.WATER]: '#445E9C',
  [PokeType.SHADOW]: '#49392F',
  [PokeType.UNKNOWN]: '#68a090',
};

export const GENERATION = {
  [Generation.KANTO]: '#537A13',
  [Generation.JOHTO]: '#837D1E',
  [Generation.HOENN]: '#437E6F',
  [Generation.SINNOH]: '#5E4A6A',
  [Generation.UNOVA]: '#467186',
  [Generation.KALOS]: '#840733',
  [Generation.ALOLA]: '#8F3B2A',
  [Generation.GALAR]: '#702467',
};

export const MOVE_CLASS: MoveClassColor = {
  Physical: {
    bg: '#82150b',
    text: '#F67A1A',
  },
  Special: {
    bg: '#333948',
    text: '#FFFFFF',
  },
  Status: {
    bg: '#5b585b',
    text: '#F7F7F7',
  },
};

interface MoveClassColor {
  [key: string]: {
    bg: string;
    text: string;
  };
}
