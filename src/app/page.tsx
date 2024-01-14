import { getDocs } from 'firebase/firestore';

import CharacterIndex from 'src/fragments/Pages/CharacterIndex';
import { characterCollectionRef } from 'src/utils/client/firebase';
import { getAbilities, getTypes } from 'src/utils/functions';

export default async function Home() {
  const characters = await getCharacters();
  const abilities = await getAbilities();
  const types = await getTypes();
  return (
    <CharacterIndex
      characters={characters}
      abilities={abilities}
      types={types}
    />
  );
}

async function getCharacters(): Promise<(Character | CharacterWithErrors)[]> {
  const query = await getDocs(characterCollectionRef);
  return query.docs.map((doc) => doc.data());
}
