'use client';

import { Add, FilterAlt } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { getDocs } from 'firebase/firestore';
import Fuse from 'fuse.js';
import { orderBy } from 'natural-orderby';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import SearchField from 'src/components/SearchField';
import { characterCollectionRef } from 'src/utils/client/firebase';
import { SortProperties } from 'src/utils/constants/options';
import { CharacterContext } from 'src/utils/contexts';
import { useAppSelector } from 'src/utils/reducers';

import CharacterEntry from './CharacterEntry';
import CharacterSieveForm, { SIEVE_FORM_WIDTH } from './CharacterSieveForm';

export default function CharacterIndex({
  abilities,
  types,
}: CharacterIndexProps) {
  const useDrawer = useState(false);
  const useSearchTerm = useState('');

  const [isDrawerOpen] = useDrawer;
  const [searchTerm] = useSearchTerm;

  const characters = useCharacterSieve(searchTerm);

  const columnBase = isDrawerOpen ? 0 : 1;
  return (
    <CharacterContext.Provider
      value={{ abilities, moves: {}, types, useDrawer, useSearchTerm }}>
      <Stack
        direction={'row'}
        pr={{ sm: isDrawerOpen ? SIEVE_FORM_WIDTH : 0 }}
        sx={{
          transition: (t) =>
            t.transitions.create(['all'], {
              duration: t.transitions.duration.short,
            }),
        }}>
        <Stack width={'100%'}>
          <CharacterControls />
          <Container maxWidth={false} disableGutters={true}>
            <Box p={4}>
              <Stack rowGap={3}>
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
        </Stack>
        <CharacterSieveForm />
      </Stack>
    </CharacterContext.Provider>
  );
}

function CharacterControls() {
  const { useDrawer, useSearchTerm } = useContext(CharacterContext);
  const [isDrawerOpen, setDrawerOpen] = useDrawer;
  const [searchTerm, setSearchTerm] = useSearchTerm;

  const t = useTheme();
  const matches = useMediaQuery(t.breakpoints.up('sm'));

  return (
    <AppBar position={'sticky'}>
      <Toolbar>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          columnGap={2}
          p={4}
          width={'100%'}>
          <Button
            variant={'contained'}
            startIcon={matches ? <Add /> : null}
            href={'/form'}
            LinkComponent={Link}
            sx={{ minWidth: 0 }}>
            {matches ? 'Add Character' : <Add />}
          </Button>
          <Stack direction={'row'} columnGap={2}>
            <Button
              variant={'outlined'}
              startIcon={matches ? <FilterAlt /> : null}
              onClick={() => setDrawerOpen(!isDrawerOpen)}
              sx={{ minWidth: 0 }}>
              {matches ? 'Sieve' : <FilterAlt />}
            </Button>
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={matches ? 'Search for a character...' : 'Search...'}
              sx={matches ? { minWidth: (t) => t.spacing(12) } : undefined}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

function useCharacterSieve(
  searchTerm: string,
): (Character | CharacterWithErrors)[] {
  const [allCharacters, setAllCharacters] = useState<
    (Character | CharacterWithErrors)[]
  >([]);
  const filters = useAppSelector((s) => s.filters);
  const propertyIndex = useAppSelector((s) => s.sort.property);
  const order = useAppSelector((s) => s.sort.order);

  useEffect(() => {
    (async () => {
      const query = await getDocs(characterCollectionRef);
      const data = query.docs.map((doc) => doc.data());
      setAllCharacters(data);
    })();
  }, []);

  if (!allCharacters.length) return allCharacters;

  const { identifiers } = SortProperties[propertyIndex];
  let characters = allCharacters;

  if (filters.type.length) {
    characters = characters.filter((c) => {
      if ('errors' in c) return false;
      return (
        filters.type.includes(c.type1) ||
        (c.type2 && filters.type.includes(c.type2))
      );
    });
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
  abilities: PokeAbilityMap;
  types: PokeTypeMap;
}
