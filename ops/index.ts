import { capitalCase } from 'change-case';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import firestore from 'src/utils/client/firebase';
import { V2_TYPES, zTypesResponse } from 'src/utils/constants/sources';
import { getSource } from 'src/utils/functions';

const query = await getDocs(collection(firestore, 'characters'));
const characters = query.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
})) as Character[];

const typesResponse = await getSource(V2_TYPES, zTypesResponse);
const types = typesResponse.reduce<Record<string, number>>(
  (acc, a) => ({ ...acc, [capitalCase(a.identifier)]: a.id }),
  {},
);

const batch = writeBatch(firestore);

for (const c of characters) {
  const docRef = doc(collection(firestore, 'characters'), c.id);
  batch.update(docRef, {
    id: c.id,
    type1: types[c.type1],
    type2: c.type2 ? types[c.type2] : null,
  });
}

await batch.commit();
process.exit(0);
