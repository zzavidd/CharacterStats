import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { CharacterAddForm } from 'src/fragments/Pages/CharacterForm';
import { getAbilities } from 'src/utils/functions';

export default async function AddPage() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }

  const abilities = await getAbilities();
  return <CharacterAddForm abilities={abilities} />;
}
