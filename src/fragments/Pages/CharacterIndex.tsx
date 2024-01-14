'use client';

import { Add, FilterAlt } from '@mui/icons-material';
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
import CharacterSieveForm, { SIEVE_FORM_WIDTH } from './CharacterSieveForm';

export default function CharacterIndex({
  characters: allCharacters,
  abilities,
  types,
}: CharacterIndexProps) {
  const useDrawer = useState(false);
  const useSearchTerm = useState('');

  const [isDrawerOpen] = useDrawer;
  const [searchTerm] = useSearchTerm;

  const characters = useCharacterSieve(allCharacters, searchTerm);

  const columnBase = isDrawerOpen ? 0 : 1;
  return (
    <CharacterContext.Provider
      value={{ abilities, moves: {}, types, useDrawer, useSearchTerm }}>
      <Stack
        direction={'row'}
        pr={isDrawerOpen ? SIEVE_FORM_WIDTH : 0}
        sx={{
          transition: (t) =>
            t.transitions.create(['all'], {
              duration: t.transitions.duration.short,
            }),
        }}>
        <Container maxWidth={false} disableGutters={true}>
          <Box p={4}>
            <Stack rowGap={3}>
              <CharacterControls />
              <Grid
                container={true}
                columns={{
                  xs: 1,
                  sm: columnBase + 1,
                  md: columnBase + 2,
                  lg: columnBase + 3,
                  xl: columnBase + 4,
                  xxl: columnBase + 5,
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
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Button variant={'contained'} startIcon={<Add />} href={'/add'}>
        Add Character
      </Button>
      <Stack direction={'row'} columnGap={2}>
        <Button
          variant={'outlined'}
          startIcon={<FilterAlt />}
          onClick={() => setDrawerOpen(!isDrawerOpen)}>
          Categorise
        </Button>
        <SearchField
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={'Search for a character...'}
          sx={{ minWidth: (t) => t.spacing(12) }}
        />
      </Stack>
    </Stack>
  );
}

function useCharacterSieve(
  allCharacters: (Character | CharacterWithErrors)[],
  searchTerm: string,
): (Character | CharacterWithErrors)[] {
  const filters = useAppSelector((s) => s.filters);
  const propertyIndex = useAppSelector((s) => s.sort.property);
  const order = useAppSelector((s) => s.sort.order);

  const { identifiers } = SortProperties[propertyIndex];

  let characters = allCharacters;

  if (filters.type.length) {
    characters = characters
      .filter((c) => 'type1' in c && filters.type.includes(c.type1))
      .filter((c) => 'type2' in c && c.type2 && filters.type.includes(c.type2));
  }
  if (filters.universe.length) {
    characters = characters.filter(
      (c) =>
        'universe' in c && c.universe && filters.universe.includes(c.universe),
    );
  }

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
  characters: (Character | CharacterWithErrors)[];
  abilities: PokeAbilityMap;
  types: PokeTypeMap;
}
