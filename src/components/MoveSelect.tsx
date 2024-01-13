import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Fuse from 'fuse.js';
import { bindDialog } from 'material-ui-popup-state';
import Image from 'next/image';
import React, { useContext, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';
import { getMenuItemSx } from 'src/utils/functions';

import SearchField from './SearchField';

const BASE_ROW_HEIGHT = 80;

export default function MoveSelect() {
  const [searchTerm, setSearchTerm] = useState('');
  const { moves: allMoves, moveSelect } = useContext(CharacterFormContext);
  const moves = useMoveSieve(allMoves, searchTerm);

  const listRef = useRef<VariableSizeList<PokeMove[]>>(null);

  function onSearchChange(value: string) {
    listRef.current?.resetAfterIndex(0);
    setSearchTerm(value);
  }

  function getItemSize(i: number) {
    const { description } = moves[i];
    let size = BASE_ROW_HEIGHT;
    if (description) {
      size += 30;
    }
    size += (Math.floor(description?.length / 60) || 0) * 15;
    return size;
  }

  return (
    <Dialog
      {...bindDialog(moveSelect)}
      fullWidth={true}
      maxWidth={'xs'}
      keepMounted={true}>
      <DialogTitle>Select a move</DialogTitle>
      <DialogContent sx={{ height: '100vh', p: 0 }} dividers={true}>
        <Paper square={true}>
          <SearchField
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={'Search for a move...'}
            fullWidth={true}
            sx={{ p: 3 }}
          />
        </Paper>
        <AutoSizer>
          {({ height, width }) => (
            <VariableSizeList
              itemData={moves}
              itemCount={moves.length}
              itemKey={(i, data) => data[i].id}
              itemSize={getItemSize}
              estimatedItemSize={BASE_ROW_HEIGHT + 40}
              overscanCount={30}
              height={height}
              width={width}
              ref={listRef}>
              {({ data, style, index }) => {
                const move = data[index];
                return <MoveOption move={move} style={style} key={move.id} />;
              }}
            </VariableSizeList>
          )}
        </AutoSizer>
      </DialogContent>
    </Dialog>
  );
}

const MoveOption = React.memo<MoveOptionProps>(({ move, style }) => {
  const { learnsetMethods, moveSelect } = useContext(CharacterFormContext);

  const { append } = learnsetMethods;

  function onSelect() {
    append({ level: 0, moveId: move.id });
    moveSelect.close();
  }

  return (
    <MenuItem
      onClick={onSelect}
      value={move.id}
      style={style}
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
            alt={move.type}
            height={24}
            width={24}
          />
        </Box>
        <Stack rowGap={1} width={'100%'}>
          <Typography variant={'h6'}>{move.name}</Typography>
          <Stack rowGap={2}>
            {move.description ? (
              <Typography variant={'body2'} sx={{ textWrap: 'wrap' }}>
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
      keys: ['name', 'description', 'type'],
      ignoreLocation: true,
      threshold: 0.1,
      shouldSort: true,
    })
      .search(searchTerm)
      .map(({ item }) => item);
  }

  return moves;
}

interface MoveOptionProps extends Pick<ListChildComponentProps, 'style'> {
  move: PokeMove;
}
