import {
  Box,
  Button,
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Order } from 'natural-orderby';
import { useContext } from 'react';

import { PokeType, TypeName, Universe } from 'src/utils/constants/enums';
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

  const [isDrawerOpen, setDrawerOpen] = useDrawer;
  const t = useTheme();
  const matches = useMediaQuery(t.breakpoints.up('sm'));

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

  const typeList = Object.entries(TypeName);
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
      variant={matches ? 'persistent' : 'temporary'}
      anchor={matches ? 'right' : 'top'}
      PaperProps={{ sx: { width: matches ? SIEVE_FORM_WIDTH : '100%' } }}>
      <Stack
        sx={{
          borderLeft: (t) => `1px solid ${t.palette.divider}`,
          position: 'sticky',
          height: '100vh',
          right: 0,
          minWidth: (t) => t.spacing(12),
          overflowY: 'auto',
        }}>
        <Paper
          elevation={3}
          square={true}
          sx={{ top: 0, position: 'sticky', zIndex: (t) => t.zIndex.appBar }}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={2}
            columnGap={3}>
            <Typography variant={'h2'} px={3} py={3} textAlign={'center'}>
              Filter & Sort Characters
            </Typography>
            <Box>
              <Button variant={'outlined'} onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
            </Box>
          </Stack>
        </Paper>
        <Stack>
          <Box>
            <FieldHeader>Sort Property:</FieldHeader>
            <RadioGroup sx={{ p: 3, width: '100%' }}>
              {SortProperties.map(({ label }, i) => (
                <FormControlLabel
                  label={label}
                  value={i}
                  key={i}
                  control={<Radio onChange={onSortPropertyChange} />}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            <FieldHeader>Sort Order:</FieldHeader>
            <RadioGroup sx={{ p: 3, width: '100%' }}>
              {SortOrders.map(({ label, order }, i) => (
                <FormControlLabel
                  label={label}
                  value={order}
                  key={i}
                  control={<Radio onChange={onSortOrderChange} />}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            <FieldHeader>Filter by Type:</FieldHeader>
            <Stack direction={'row'}>
              {typeListHalves.map((half, i) => (
                <FormGroup sx={{ p: 3, width: '100%' }} key={i}>
                  {half.map(([value, type], i) => (
                    <FormControlLabel
                      label={type}
                      value={value}
                      key={i}
                      control={
                        <Checkbox
                          checked={filters.type.includes(
                            Number(value) as unknown as PokeType,
                          )}
                          onChange={(e) =>
                            onFilterChange('type', Number(e.target.value))
                          }
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
                <FormGroup sx={{ p: 3, width: '100%' }} key={i}>
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
