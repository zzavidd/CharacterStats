import { getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import CharacterFormIndex from 'src/fragments/Pages/CharacterFormIndex';
import { characterDocumentRef } from 'src/utils/client/firebase';
import { getAbilities, getMoves, getTypes } from 'src/utils/functions';

export default async function FormPage({ searchParams }: FormPageContext) {
  const { id } = searchParams;

  let character;
  if (id) {
    const snapshot = await getDoc(characterDocumentRef(id));
    if (!snapshot.exists()) {
      notFound();
    }
    const data = snapshot.data();
    character = {
      ...data,
      learnset: Object.entries(data.learnset).flatMap(([level, moveIds]) =>
        moveIds.map((moveId) => ({ level: Number(level), moveId })),
      ),
    };
  }

  const abilities = await getAbilities();
  const moves = await getMoves();
  const types = await getTypes();
  return (
    <CharacterFormIndex
      abilities={abilities}
      moves={moves}
      types={types}
      characterInput={character}
    />
  );
}

interface FormPageContext {
  searchParams: { id?: string };
}
