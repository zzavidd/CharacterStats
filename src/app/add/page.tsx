import CharacterAddForm from 'src/fragments/Pages/CharacterAddForm';

import { getAbilities, getMoves, getTypes } from 'src/utils/functions';

export default async function AddPage() {
  const abilities = await getAbilities();
  const moves = await getMoves();
  const types = await getTypes();
  return <CharacterAddForm abilities={abilities} moves={moves} types={types} />;
}
