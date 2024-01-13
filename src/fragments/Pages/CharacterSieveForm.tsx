import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Order } from 'natural-orderby';
import { useContext } from 'react';

import { PokeType, Universe } from 'src/utils/constants/enums';
import { SortOrders, SortProperties } from 'src/utils/constants/options';
import { CharacterContext } from 'src/utils/contexts';
import {
  AppActions,
  AppState,
  useAppDispatch,
  useAppSelector,
} from 'src/utils/reducers';

export const SIEVE_FORM_WIDTH = '320px';

export default function CharacterSieveForm() {
  const { useDrawer } = useContext(CharacterContext);
  const filters = useAppSelector((s) => s.filters);
  const dispatch = useAppDispatch();

  const [isDrawerOpen] = useDrawer;

  function onFilterChange<T extends keyof AppState['filters']>(
    key: T,
    value: AppState['filters'][T][number],
  ) {
    dispatch(AppActions.setFilterProperty({ key, value }));
  }

  function onSortPropertyChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(AppActions.setSortProperty(Number(e.target.value)));
  }

  function onSortOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(AppActions.setSortOrder(e.target.value as Order));
  }

  const typeList = Object.values(PokeType);
  const typeListHalfLength = Math.ceil(typeList.length / 2);
  const typeListHalves = [
    typeList.slice(0, typeListHalfLength),
    typeList.slice(typeListHalfLength),
  ];

  const universeList = Object.values(Universe);
  const universeListHalfLength = Math.ceil(universeList.length / 2);
  const universeListHalves = [
    universeList.slice(0, universeListHalfLength),
    universeList.slice(universeListHalfLength),
  ];
  return (
    <Drawer
      open={isDrawerOpen}
      variant={'persistent'}
      anchor={'right'}
      PaperProps={{ sx: { width: SIEVE_FORM_WIDTH } }}>
      <Stack
        sx={{
          borderLeft: (t) => `1px solid ${t.palette.divider}`,
          position: 'sticky',
          height: '100vh',
          right: 0,
          minWidth: (t) => t.spacing(12),
          overflowY: 'auto',
        }}>
        <Paper square={true}>
          <Typography variant={'h2'} p={4}>
            Categorise
          </Typography>
        </Paper>
        <Stack>
          <Box>
            <FieldHeader>Sort Property:</FieldHeader>
            <RadioGroup sx={{ p: 3 }}>
              {SortProperties.map(({ label }, i) => (
                <FormControlLabel
                  label={label}
                  value={i}
                  key={i}
                  control={
                    <Radio onChange={onSortPropertyChange} size={'small'} />
                  }
                />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            <FieldHeader>Sort Order:</FieldHeader>
            <RadioGroup sx={{ p: 3 }}>
              {SortOrders.map(({ label, order }, i) => (
                <FormControlLabel
                  label={label}
                  value={order}
                  key={i}
                  control={
                    <Radio onChange={onSortOrderChange} size={'small'} />
                  }
                />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            <FieldHeader>Filter by Type:</FieldHeader>
            <Stack direction={'row'}>
              {typeListHalves.map((half, i) => (
                <FormGroup sx={{ p: 3 }} key={i}>
                  {half.map((type, i) => (
                    <FormControlLabel
                      label={type}
                      value={type}
                      key={i}
                      control={
                        <Checkbox
                          checked={filters.type.includes(type as PokeType)}
                          onChange={(e) =>
                            onFilterChange('type', e.target.valueAsNumber)
                          }
                          size={'small'}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              ))}
            </Stack>
          </Box>
          <Box>
            <FieldHeader>Filter by Universe:</FieldHeader>
            <Stack direction={'row'}>
              {universeListHalves.map((half, i) => (
                <FormGroup sx={{ p: 3 }} key={i}>
                  {half.map((universe, i) => (
                    <FormControlLabel
                      label={universe}
                      value={universe}
                      key={i}
                      control={
                        <Checkbox
                          checked={filters.universe.includes(universe)}
                          onChange={(e) =>
                            onFilterChange(
                              'universe',
                              e.target.value as Universe,
                            )
                          }
                          size={'small'}
                        />
                      }
                    />
                  ))}
                </FormGroup>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
}

function FieldHeader({ children }: React.PropsWithChildren) {
  return (
    <Paper square={true} sx={{ px: 3, py: 2 }}>
      <FormLabel>{children}</FormLabel>
    </Paper>
  );
}
