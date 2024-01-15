export enum PokeType {
  NORMAL = 1,
  FIGHTING = 2,
  FLYING = 3,
  POISON = 4,
  GROUND = 5,
  ROCK = 6,
  BUG = 7,
  GHOST = 8,
  STEEL = 9,
  FIRE = 10,
  WATER = 11,
  GRASS = 12,
  ELECTRIC = 13,
  PSYCHIC = 14,
  ICE = 15,
  DRAGON = 16,
  DARK = 17,
  FAIRY = 18,
  UNKNOWN = 10001,
  SHADOW = 10002,
}

export const TypeName = <const>{
  [PokeType.NORMAL]: 'Normal',
  [PokeType.FIGHTING]: 'Fighting',
  [PokeType.FLYING]: 'Flying',
  [PokeType.POISON]: 'Poison',
  [PokeType.GROUND]: 'Ground',
  [PokeType.ROCK]: 'Rock',
  [PokeType.BUG]: 'Bug',
  [PokeType.GHOST]: 'Ghost',
  [PokeType.STEEL]: 'Steel',
  [PokeType.FIRE]: 'Fire',
  [PokeType.WATER]: 'Water',
  [PokeType.GRASS]: 'Grass',
  [PokeType.ELECTRIC]: 'Electric',
  [PokeType.PSYCHIC]: 'Psychic',
  [PokeType.ICE]: 'Ice',
  [PokeType.DRAGON]: 'Dragon',
  [PokeType.DARK]: 'Dark',
  [PokeType.FAIRY]: 'Fairy',
  [PokeType.UNKNOWN]: 'Unknown',
  [PokeType.SHADOW]: 'Shadow',
};

export enum Generation {
  KANTO = 'Kanto',
  JOHTO = 'Johto',
  HOENN = 'Hoenn',
  SINNOH = 'Sinnoh',
  UNOVA = 'Unova',
  KALOS = 'Kalos',
  ALOLA = 'Alola',
  GALAR = 'Galar',
}

export enum Stat {
  HP = 'hp',
  ATTACK = 'attack',
  DEFENCE = 'defence',
  SPATK = 'spAtk',
  SPDEF = 'spDef',
  SPEED = 'speed',
}

export enum DamageClass {
  PHYSICAL = 'physical',
  SPECIAL = 'special',
  STATUS = 'status',
}

export enum Universe {
  NONE = 'None',
  DC = 'DC',
  MARVEL = 'Marvel',
  SMASH = 'Smash',
  SONIC = 'Sonic',
  BEN10 = 'Ben 10',
  GYVENIMAS = 'Gyvenimas',
}
