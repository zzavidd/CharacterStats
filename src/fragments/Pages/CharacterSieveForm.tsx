import {
  Box,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { Order } from 'natural-orderby';
import { useContext } from 'react';

import { SortOrders, SortProperties } from 'src/utils/constants/options';
import { CharacterContext } from 'src/utils/contexts';
import { AppActions, useAppDispatch } from 'src/utils/reducers';

export default function CharacterSieveForm() {
  const { useDrawer } = useContext(CharacterContext);
  const [isDrawerOpen] = useDrawer;

  const dispatch = useAppDispatch();

  function onSortPropertyChange(e: SelectChangeEvent) {
    dispatch(AppActions.setSortProperty(Number(e.target.value)));
  }

  function onSortOrderChange(e: SelectChangeEvent) {
    dispatch(AppActions.setSortOrder(e.target.value as Order));
  }

  if (!isDrawerOpen) return null;
  return (
    <Stack
      sx={{
        borderLeft: (t) => `1px solid ${t.palette.divider}`,
        minWidth: (t) => t.spacing(12),
      }}>
      <Paper square={true}>
        <Typography variant={'h2'} p={4}>
          Categorise
        </Typography>
      </Paper>
      <Box p={3}>
        <Box>
          <FormLabel>Sort Property:</FormLabel>
          <RadioGroup>
            {SortProperties.map(({ label }, i) => (
              <FormControlLabel
                label={label}
                value={i}
                control={
                  <Radio onChange={onSortPropertyChange} size={'small'} />
                }
                key={i}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <FormLabel>Sort Order:</FormLabel>
          <RadioGroup>
            {SortOrders.map(({ label, order }, i) => (
              <FormControlLabel
                label={label}
                value={order}
                control={<Radio onChange={onSortOrderChange} size={'small'} />}
                key={i}
              />
            ))}
          </RadioGroup>
        </Box>
      </Box>
    </Stack>
  );
}
