import { capitalCase } from 'change-case';

import { DamageClass, PokeType } from '../constants/enums';
import {
  V2_MOVES,
  V2_MOVE_DAMAGE_CLASSES,
  V2_MOVE_FLAVOR_TEXTS,
  zMoveDamageClassesResponse,
  zMoveFlavorTextsResponse,
  zMovesResponse,
} from '../constants/sources';

import { getSource } from '.';

export default async function getMoves(): Promise<PokeMoveMap> {
  const [v2a, v2b, v2c] = await Promise.all([
    getSource(V2_MOVES, zMovesResponse),
    getSource(V2_MOVE_DAMAGE_CLASSES, zMoveDamageClassesResponse),
    getSource(V2_MOVE_FLAVOR_TEXTS, zMoveFlavorTextsResponse),
  ]);

  const moveDescriptions = [
    ...new Map(
      v2c
        .filter((m) => m.language_id === 9)
        .filter((m) => !m.flavor_text.startsWith('This move can’t be used.'))
        .sort((a, b) => a.version_group_id - b.version_group_id)
        .map((m) => [m.move_id, m]),
    ).values(),
  ].reduce<Record<number, string>>(
    (acc, m) => ({
      ...acc,
      [m.move_id]: m.flavor_text
        .replaceAll('\n', ' ')
        .replaceAll('Pokémon', 'character'),
    }),
    {},
  );

  const moveDamageClasses = v2b.reduce<Record<number, DamageClass>>(
    (acc, a) => ({ ...acc, [a.id]: a.identifier }),
    {},
  );

  const moves = v2a.reduce<PokeMoveMap>((acc, m) => {
    if (m.type_id === PokeType.SHADOW) return acc;
    return {
      ...acc,
      [m.id]: {
        id: m.id,
        name: capitalCase(m.identifier),
        generation: m.generation_id,
        description: moveDescriptions[m.id],
        type: m.type_id,
        power: m.power,
        pp: m.pp,
        accuracy: m.accuracy,
        damageClass: moveDamageClasses[m.damage_class_id],
      },
    };
  }, {} as PokeMoveMap);

  return moves;
}
