import { getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import CharacterEditForm from 'src/fragments/Pages/CharacterEditForm';

import { characterDocumentRef } from 'src/utils/client/firebase';
import { getAbilities, getMoves, getTypes } from 'src/utils/functions';

export default async function EditPage({ params: { id } }: EditPageContext) {
  const snapshot = await getDoc(characterDocumentRef(id));
  if (!snapshot.exists()) {
    notFound();
  }
  const character = snapshot.data();

  const abilities = await getAbilities();
  const moves = await getMoves();
  const types = await getTypes();
  return (
    <CharacterEditForm
      character={character}
      abilities={abilities}
      moves={moves}
      types={types}
    />
  );
}

interface EditPageContext {
  params: {
    id: string;
  };
}
