import { initializeApp } from 'firebase/app';
import type { FirestoreDataConverter } from 'firebase/firestore';
import { collection, getFirestore } from 'firebase/firestore';

import { zCharacter, zCharacterWithErrors } from 'src/utils/validators';

const app = initializeApp({
  apiKey: process.env.API_KEY,
  appId: process.env.APP_ID,
  authDomain: process.env.AUTH_DOMAIN,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
});
const firestore = getFirestore(app);
export default firestore;

const converter: FirestoreDataConverter<Character | CharacterWithErrors> = {
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

export const characterCollectionRef = collection(
  firestore,
  'characters',
).withConverter(converter);
