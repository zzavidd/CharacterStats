import CharacterFormIndex from 'src/fragments/Pages/CharacterFormIndex';
import { getAbilities, getMoves, getTypes } from 'src/utils/functions';

export default async function FormPage() {
  const abilities = await getAbilities();
  const moves = await getMoves();
  const types = await getTypes();
  return (
    <CharacterFormIndex abilities={abilities} moves={moves} types={types} />
  );
}
