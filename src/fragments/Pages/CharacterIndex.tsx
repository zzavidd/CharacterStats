'use client';

import { Box, Button, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Fuse from 'fuse.js';
import { orderBy } from 'natural-orderby';
import { useContext, useState } from 'react';

import SearchField from 'src/components/SearchField';
import { SortProperties } from 'src/utils/constants/options';
import { CharacterContext } from 'src/utils/contexts';
import { useAppSelector } from 'src/utils/reducers';

import CharacterEntry from './CharacterEntry';
import CharacterSieveForm from './CharacterSieveForm';

export default function CharacterIndex({
  characters: allCharacters,
  abilities,
}: CharacterIndexProps) {
  const useDrawer = useState(false);
  const useSearchTerm = useState('');

  const [searchTerm] = useSearchTerm;
  const [isDrawerOpen] = useSearchTerm;

  const characters = useCharacterSieve(allCharacters, searchTerm);

  const columnBase = isDrawerOpen ? -1 : 0;
  return (
    <CharacterContext.Provider
      value={{ abilities, moves: {}, useDrawer, useSearchTerm }}>
      <Stack direction={'row'}>
        <Container maxWidth={false}>
          <Box py={4}>
            <Stack rowGap={3}>
              <CharacterControls />
              <Grid
                container={true}
                columns={{
                  xs: columnBase + 1,
                  sm: columnBase + 2,
                  md: columnBase + 3,
                  lg: columnBase + 4,
                  xl: columnBase + 5,
                }}
                spacing={3}>
                {characters.map((c) => (
                  <CharacterEntry character={c} key={c.id} />
                ))}
              </Grid>
            </Stack>
          </Box>
        </Container>
        <CharacterSieveForm />
      </Stack>
    </CharacterContext.Provider>
  );
}

function CharacterControls() {
  const { useDrawer, useSearchTerm } = useContext(CharacterContext);
  const [isDrawerOpen, setDrawerOpen] = useDrawer;
  const [searchTerm, setSearchTerm] = useSearchTerm;
  return (
    <Stack direction={'row'} columnGap={2}>
      <Button variant={'outlined'} onClick={() => setDrawerOpen(!isDrawerOpen)}>
        Categorise
      </Button>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={'Search for a character...'}
        sx={{ minWidth: (t) => t.spacing(12) }}
      />
    </Stack>
  );
}

function useCharacterSieve(
  allCharacters: Character[],
  searchTerm: string,
): Character[] {
  const propertyIndex = useAppSelector((s) => s.sort.property);
  const order = useAppSelector((s) => s.sort.order);

  const { identifiers } = SortProperties[propertyIndex];

  let characters = allCharacters;

  if (searchTerm) {
    characters = new Fuse(characters, {
      keys: ['name'],
      ignoreLocation: true,
      shouldSort: false,
      threshold: 0.1,
    })
      .search(searchTerm)
      .map(({ item }) => item);
  }

  return orderBy(characters, identifiers, order);
}

interface CharacterIndexProps {
  characters: Character[];
  abilities: Record<string, PokeAbility>;
}
