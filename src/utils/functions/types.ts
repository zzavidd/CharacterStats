import { capitalCase } from 'change-case';
import { getSource } from '.';
import { PokeType } from '../constants/enums';
import { V2_TYPES, zTypesResponse } from '../constants/sources';

export default async function getTypes(): Promise<PokeTypeMap> {
  const res = await getSource(V2_TYPES, zTypesResponse);
  const types = res.reduce(
    (acc, a) => ({ ...acc, [a.id]: capitalCase(a.identifier) }),
    {} as Record<PokeType, string>,
  );
  return types;
}
