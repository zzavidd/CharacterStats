'use client';

import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { CharacterContext } from 'src/utils/contexts';

import CharacterEntry from './CharacterEntry';

export default function CharacterIndex({
  characters,
  abilities,
}: CharacterIndexProps) {
  return (
    <CharacterContext.Provider value={{ abilities, moves: {} }}>
      <Container maxWidth={false}>
        <Box py={4}>
          <Grid
            container={true}
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={3}>
            {characters.map((c) => (
              <CharacterEntry character={c} key={c.id} />
            ))}
          </Grid>
        </Box>
      </Container>
    </CharacterContext.Provider>
  );
}

interface CharacterIndexProps {
  characters: Character[];
  abilities: Record<string, PokeAbility>;
}
