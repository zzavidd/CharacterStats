import { capitalCase } from 'change-case';
import { collection, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CharacterIndex from 'src/fragments/Pages/CharacterIndex';
import firestore, { converter } from 'src/utils/client/firebase';
import { apolloClient } from 'src/utils/client/graphql';
import { COLOR_TYPE } from 'src/utils/constants/colors';
import { Type } from 'src/utils/constants/enums';
import { QUERY_ABILITIES } from 'src/utils/constants/queries';

const ref = collection(firestore, 'characters').withConverter(converter);

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }

  const characters = await getCharacters();
  const abilities = await getAbilities();
  return <CharacterIndex characters={characters} abilities={abilities} />;
}

async function getCharacters(): Promise<Character[]> {
  const query = await getDocs(ref);
  return query.docs.map((doc) => doc.data());
}

async function getAbilities(): Promise<Record<number, PokeAbility>> {
  const results = await apolloClient.query<{ abilities: RawAbility[] }>({
    query: QUERY_ABILITIES,
  });

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
