import { Box, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import React, { useContext } from 'react';

import { COLOR_TYPE } from 'src/utils/constants/colors';
import { StatMap } from 'src/utils/constants/defaults';
import { Stat } from 'src/utils/constants/enums';
import Icon from 'src/utils/constants/icons';
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
            borderRadius: 1.2,
            p: 4,
            height: '100%',
          }}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            columnGap={2}>
            <Box>
              <Typography variant={'h2'}>{c.name}</Typography>
              <Typography fontSize={'80%'}>{c.universe}</Typography>
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
                      src={Icon.Types[type]}
                      alt={type}
                      height={16}
                      width={16}
                    />
                    <Typography fontWeight={600}>{type}</Typography>
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
              {[c.ability1, c.ability2, c.abilityX].map((ability) => {
                if (!ability) return null;
                return (
                  <Typography key={ability}>
                    {abilities[ability].name}
                  </Typography>
                );
              })}
            </Box>
            <Stack>
              {stats.map(([stat, value]) => (
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
          </Stack>
        </Box>
      </Grid>
    );
  },
);

export default CharacterEntry;
