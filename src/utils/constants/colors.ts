import { Generation, Stat, Type } from './enums';

export const STAT = {
  [Stat.HP]: '#A60000',
  [Stat.ATTACK]: '#9C531F',
  [Stat.DEFENCE]: '#A1871F',
  [Stat.SPATK]: '#445E9C',
  [Stat.SPDEF]: '#4E8234',
  [Stat.SPEED]: '#A13959',
};

export const COLOR_TYPE = {
  [Type.BUG]: '#6D7815',
  [Type.DARK]: '#49392F',
  [Type.DRAGON]: '#4924A1',
  [Type.ELECTRIC]: '#A1871F',
  [Type.FAIRY]: '#9B6470',
  [Type.FIGHTING]: '#7D1F1A',
  [Type.FIRE]: '#9C531F',
  [Type.FLYING]: '#6D5E9C',
  [Type.GHOST]: '#493963',
  [Type.GRASS]: '#4E8234',
  [Type.GROUND]: '#927D44',
  [Type.ICE]: '#638D8D',
  [Type.NORMAL]: '#6d5f4e',
  [Type.POISON]: '#682A68',
  [Type.PSYCHIC]: '#A13959',
  [Type.ROCK]: '#786824',
  [Type.STEEL]: '#787887',
  [Type.WATER]: '#445E9C',
  [Type.UNKNOWN]: '#68a090',
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
