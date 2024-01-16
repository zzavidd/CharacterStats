import CharacterIndex from 'src/fragments/Pages/CharacterIndex';
import { getAbilities, getTypes } from 'src/utils/functions';

export default async function Home() {
  const abilities = await getAbilities();
  const types = await getTypes();
  return <CharacterIndex abilities={abilities} types={types} />;
}
