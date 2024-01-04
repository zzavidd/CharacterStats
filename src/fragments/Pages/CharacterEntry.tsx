import { Box, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import React, { useContext } from 'react';

import { COLOR_TYPE } from 'src/utils/constants/colors';
import { StatMap } from 'src/utils/constants/defaults';
import { Stat } from 'src/utils/constants/enums';
import PokeIcon from 'src/utils/constants/icons';
import { Universes } from 'src/utils/constants/options';
import { CharacterContext } from 'src/utils/contexts';

const CharacterEntry = React.memo<{ character: Character }>(
  ({ character: c }) => {
    const { abilities } = useContext(CharacterContext);
    const color1 = COLOR_TYPE[c.type1];
    const color2 = c.type2 ? COLOR_TYPE[c.type2] : color1;

    const stats = Object.entries(c.stats);
    return (
      <Grid xs={1}>
        <Box
          sx={{
            background: `linear-gradient(45deg, ${color1} 0 84%, ${color2} 85% 100%)`,
            borderRadius: 0.5,
            p: 4,
            height: '100%',
          }}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            columnGap={2}>
            <Box>
              <Typography variant={'h2'}>{c.name}</Typography>
              <Typography>{Universes[c.universe]}</Typography>
            </Box>
            <Box>
              {[c.type1, c.type2].map((type) => {
                if (!type) return null;
                return (
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    columnGap={1}
                    key={type}>
                    <Image
                      src={PokeIcon.Types[type]}
                      alt={type}
                      height={16}
                      width={16}
                    />
                    <Typography>{type}</Typography>
                  </Stack>
                );
              })}
            </Box>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            columnGap={2}>
            <Box>
              {c.ability1 ? (
                <Typography>{abilities[c.ability1].name}</Typography>
              ) : (
                c.ability1
              )}
              {c.ability2 ? (
                <Typography>{abilities[c.ability2].name}</Typography>
              ) : (
                c.ability2
              )}
            </Box>
            <Stack direction={'row'} columnGap={3}>
              {[stats.slice(0, 3), stats.slice(3)].map((half, i) => (
                <Stack key={i}>
                  {half.map(([stat, value]) => (
                    <Stack
                      direction={'row'}
                      justifyContent={'space-between'}
                      columnGap={3}
                      key={stat}>
                      <Typography>{StatMap[stat as Stat]}:</Typography>
                      <Typography>{value}</Typography>
                    </Stack>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Grid>
    );
  },
);

export default CharacterEntry;
