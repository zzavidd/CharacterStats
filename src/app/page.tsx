import { collection, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CharacterIndex from 'src/fragments/Pages/CharacterIndex';
import firestore, { converter } from 'src/utils/client/firebase';
import { getAbilities } from 'src/utils/functions';

const ref = collection(firestore, 'characters').withConverter(converter);

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }

  const characters = await getCharacters();
  const abilities = await getAbilities();
  return <CharacterIndex characters={characters} abilities={abilities} />;
}

async function getCharacters(): Promise<Character[]> {
  const query = await getDocs(ref);
  return query.docs.map((doc) => doc.data());
}
