import { capitalCase } from 'change-case';
import { unstable_cache } from 'next/cache';
import { apolloClient } from './client/graphql';
import { COLOR_TYPE } from './constants/colors';
import { Type } from './constants/enums';
import { QUERY_ABILITIES } from './constants/queries';

const getCachedAbilities = unstable_cache(
  () =>
    apolloClient.query<{ abilities: RawAbility[] }>({ query: QUERY_ABILITIES }),
  ['abilities'],
  { revalidate: 30 * 24 * 60 * 60 },
);

export async function getAbilities(): Promise<Record<number, PokeAbility>> {
  const results = await getCachedAbilities();

  const abilities = results.data.abilities.reduce(
    (acc, rawAbility) => {
      const { id, generation } = rawAbility;
      const commonType = determineAbilityType(rawAbility);
      const ability: PokeAbility = {
        id,
        name: capitalCase(rawAbility.name),
        generation,
        commonType,
        color: COLOR_TYPE[commonType],
        description: rawAbility.description[0]?.text,
      };
      acc[id] = ability;
      return acc;
    },
    {} as Record<number, PokeAbility>,
  );

  return abilities;
}

/**
 * Finds the most common type held by a specified ability's candidates.
 * @param ability The specified ability.
 * @returns The most common type.
 */
function determineAbilityType({ candidates }: RawAbility): Type {
  const types: Type[] = [];

  for (const candidate of candidates) {
    for (const { type } of candidate.pokemon.types) {
      types.push(capitalCase(type.name) as Type);
    }
  }

  const sortedTypes = types.sort((a, b) => {
    const first = types.filter((type) => type === a).length;
    const second = types.filter((type) => type === b).length;
    return first - second;
  });

  const mostCommonType = sortedTypes.pop() || Type.UNKNOWN;
  return mostCommonType;
}

export function calculateBST(stats: Stats): number {
  return Object.values(stats).reduce((bst, value: unknown) => {
    if (value) {
      bst += parseInt(value as string);
    }
    return bst;
  }, 0);
}
