import { initializeApp } from 'firebase/app';
import type { FirestoreDataConverter } from 'firebase/firestore';
import { collection, getFirestore } from 'firebase/firestore';

import { zCharacter } from 'src/utils/validators';

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

export const converter: FirestoreDataConverter<Character> = {
  toFirestore: (character) => ({ ...character }),
  fromFirestore: (snapshot) =>
    zCharacter.parse({ ...snapshot.data(), id: snapshot.id }),
};

export const characterCollection = collection(
  firestore,
  'characters',
).withConverter(converter);
