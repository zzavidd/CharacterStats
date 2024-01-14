import { initializeApp } from 'firebase/app';
import type {
  DocumentReference,
  FirestoreDataConverter,
} from 'firebase/firestore';
import { collection, doc, getFirestore } from 'firebase/firestore';

import { zCharacter, zCharacterWithErrors } from 'src/utils/validators';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
});
const firestore = getFirestore(app);
export default firestore;

const collectionConverter: FirestoreDataConverter<
  Character | CharacterWithErrors
> = {
  toFirestore: (character) => ({ ...character }),
  fromFirestore: (snapshot) => {
    const character = snapshot.data();
    const result = zCharacter.safeParse({ ...character, id: snapshot.id });
    if (result.success) {
      return result.data;
    } else {
      return zCharacterWithErrors.parse({
        ...character,
        id: snapshot.id,
        errors: result.error.issues,
      });
    }
  },
};
const documentConverter: FirestoreDataConverter<Character> = {
  toFirestore: (character) => ({ ...character }),
  fromFirestore: (snapshot) => {
    const character = snapshot.data();
    return zCharacter.parse({ ...character, id: snapshot.id });
  },
};

export const characterCollectionRef = collection(
  firestore,
  'characters',
).withConverter(collectionConverter);

export function characterDocumentRef(id: string): DocumentReference<Character> {
  return doc(firestore, 'characters', id).withConverter(documentConverter);
}
