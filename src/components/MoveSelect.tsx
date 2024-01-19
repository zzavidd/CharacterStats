import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Fuse from 'fuse.js';
import { bindDialog } from 'material-ui-popup-state';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { TypeName } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';
import { getMenuItemSx } from 'src/utils/functions';

import SearchField from './SearchField';

export default function MoveSelect() {
  const [searchTerm, setSearchTerm] = useState('');
  const { moves: allMoves, moveSelect } = useContext(CharacterFormContext);
  const moves = useMoveSieve(allMoves, searchTerm);

  function onSearchChange(value: string) {
    setSearchTerm(value);
  }

  function onClose() {
    setSearchTerm('');
    moveSelect.close();
  }

  return (
    <Dialog
      {...bindDialog(moveSelect)}
      fullWidth={true}
      maxWidth={'xs'}
      onClose={onClose}
      PaperProps={{ sx: { height: '100%' } }}
      TransitionProps={{ onExited: () => setSearchTerm('') }}
      disableRestoreFocus={true}>
      <DialogTitle>Select a move</DialogTitle>
      <Divider />
      <DialogContent sx={{ height: '100%', p: 0 }}>
        <Paper square={true}>
          <SearchField
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={'Search for a move...'}
            fullWidth={true}
            variant={'standard'}
            InputProps={{ disableUnderline: true, sx: { py: 1 } }}
            sx={{ p: 3 }}
            autoFocus={true}
          />
        </Paper>
        <Virtuoso
          data={moves}
          totalCount={moves.length}
          itemContent={(i) => <MoveOption move={moves[i]} key={moves[i].id} />}
        />
      </DialogContent>
    </Dialog>
  );
}

const MoveOption = React.memo<MoveOptionProps>(({ move }) => {
  const { learnsetMethods, moveSelect } = useContext(CharacterFormContext);
  const { prepend } = learnsetMethods;

  function onSelect() {
    prepend({ level: 0, moveId: move.id }, { shouldFocus: false });
    moveSelect.close();
  }

  return (
    <MenuItem
      onClick={onSelect}
      value={move.id}
      sx={getMenuItemSx(move.type)}
      key={move.id}>
      <Stack
        direction={'row'}
        columnGap={3}
        alignItems={'flex-start'}
        width={'100%'}>
        <Box mt={'2px'}>
          <Image
            src={AppIcon.Types[move.type]}
            alt={TypeName[move.type]}
            height={24}
            width={24}
          />
        </Box>
        <Stack rowGap={1} width={'100%'}>
          <Typography variant={'h6'}>{move.name}</Typography>
          <Stack rowGap={2}>
            {move.description ? (
              <Typography variant={'body2'} sx={{ whiteSpace: 'pre-wrap' }}>
                {move.description}
              </Typography>
            ) : null}
            <Grid container={true} columns={4} columnGap={2}>
              <Grid xs={'auto'}>
                <Image
                  src={AppIcon.Classes[move.damageClass]}
                  alt={move.damageClass}
                  height={20}
                  width={20}
                />
              </Grid>
              <Grid xs={1}>
                <Typography variant={'body2'}>
                  Power: {move.power || '-'}
                </Typography>
              </Grid>
              <Grid xs={1}>
                <Typography variant={'body2'}>PP: {move.pp || '-'}</Typography>
              </Grid>
              <Grid xs={1}>
                <Typography variant={'body2'}>
                  Accuracy: {move.accuracy || '-'}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </MenuItem>
  );
});

function useMoveSieve(allMoves: PokeMoveMap, searchTerm: string) {
  let moves = Object.values(allMoves);

  if (searchTerm) {
    moves = new Fuse(moves, {
      keys: [
        { name: 'name', weight: 10 },
        { name: 'description', weight: 5 },
        { name: 'type', getFn: (move) => TypeName[move.type], weight: 1 },
      ],
      ignoreLocation: true,
      shouldSort: true,
      threshold: 0.1,
    })
      .search(searchTerm)
      .map(({ item }) => item);
  }

  return moves;
}

interface MoveOptionProps {
  move: PokeMove;
}
