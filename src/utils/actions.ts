'use client';

import { addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import invariant from 'tiny-invariant';

import {
  characterCollectionRef,
  characterDocumentRef,
} from 'src/utils/client/firebase';
import { PokeType } from 'src/utils/constants/enums';

import { convertInputToLearnset } from './functions';

export async function addCharacter(c: CharacterInput): Promise<void> {
  const learnset = convertInputToLearnset(c.learnset);
  await addDoc(characterCollectionRef, {
    ...c,
    type1: c.type1 ?? PokeType.UNKNOWN,
    learnset,
    lastModified: Date.now(),
    createTime: Date.now(),
  });
}

export async function updateCharacter(c: CharacterInput): Promise<void> {
  invariant(c.id, 'Character has no assigned ID.');

  const learnset = convertInputToLearnset(c.learnset);
  await setDoc(characterDocumentRef(c.id), {
    ...c,
    learnset,
    lastModified: Date.now(),
  });
}

export async function deleteCharacter(id: string): Promise<void> {
  await deleteDoc(characterDocumentRef(id));
}
