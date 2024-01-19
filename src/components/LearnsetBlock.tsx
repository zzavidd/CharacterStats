import { Add, ViewList } from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { bindDialog, bindTrigger } from 'material-ui-popup-state';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CharacterFormContext } from 'src/utils/contexts';
import { spreadMoves } from 'src/utils/functions';
import { useTypeColorToken } from 'src/utils/hooks';

import MoveField from './MoveField';

export default function LearnsetBlock() {
  const { learnsetMethods, moveSelect, spreadMoveDialog } =
    useContext(CharacterFormContext);
  const {
    formState: { errors },
    setValue,
    register,
    watch,
  } = useFormContext<CharacterInput>();

  const { fields } = learnsetMethods;
  const learnsetValues = watch('learnset');

  const { token } = useTypeColorToken();
  const t = useTheme();
  const matches = useMediaQuery(t.breakpoints.up('sm'));

  return (
    <Stack rowGap={4}>
      <FormLabel>Learnset:</FormLabel>
      <ButtonGroup variant={'contained'} color={token} fullWidth={true}>
        <Button
          onClick={() => moveSelect.open()}
          startIcon={<Add />}
          sx={{ flex: 2, py: 3 }}>
          Add Move
        </Button>
        <Button
          {...bindTrigger(spreadMoveDialog)}
          startIcon={<ViewList />}
          sx={{ flex: 1 }}>
          Spread
        </Button>
      </ButtonGroup>
      <Stack rowGap={2}>
        {fields.map((field, index) => (
          <Stack direction={'row'} columnGap={2} key={field.id}>
            <TextField
              {...register(`learnset.${index}.level`, {
                valueAsNumber: true,
                validate: (v) => v >= 0 && v <= 100,
              })}
              type={matches ? undefined : 'number'}
              onBlur={() => {
                setValue(
                  'learnset',
                  learnsetValues.sort((a, b) => a.level - b.level),
                );
              }}
              sx={{ maxWidth: 90 }}
              inputProps={{ style: { textAlign: 'right' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <Typography color={'text.secondary'}>Lv</Typography>
                  </InputAdornment>
                ),
              }}
              inputMode={'numeric'}
              onFocus={(e) => e.target.select()}
              error={!!errors.learnset?.[index]?.level}
              helperText={errors.learnset?.[index]?.level?.message}
            />
            <MoveField index={index} />
          </Stack>
        ))}
      </Stack>
      <SpreadMoveDialog />
    </Stack>
  );
}

function SpreadMoveDialog() {
  const [maxLevel, setMaxLevel] = useState(100);
  const { setValue, watch } = useFormContext<CharacterInput>();
  const { spreadMoveDialog } = useContext(CharacterFormContext);

  function spreadLearnset() {
    const learnsetInput = watch('learnset');
    setValue(
      'learnset',
      spreadMoves(learnsetInput, maxLevel).sort((a, b) => a.level - b.level),
    );
    spreadMoveDialog.close();
  }

  const { token } = useTypeColorToken();

  return (
    <Dialog
      {...bindDialog(spreadMoveDialog)}
      fullWidth={true}
      maxWidth={'xs'}
      disableRestoreFocus={true}>
      <DialogTitle>Spread moves</DialogTitle>
      <DialogContent dividers={true}>
        <Stack rowGap={4}>
          <Typography>Set the maximum level for distribution:</Typography>
          <TextField
            value={maxLevel}
            onChange={(e) => setMaxLevel(Number(e.target.value))}
            label={'Max Level:'}
            placeholder={'Enter the maximum level:'}
            autoFocus={true}
            inputMode={'numeric'}
            inputProps={{ pattern: '[0-9]+' }}
            onFocus={(e) => e.target.select()}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} color={token} onClick={spreadLearnset}>
          Cancel
        </Button>
        <Button
          variant={'contained'}
          disableElevation={true}
          color={token}
          onClick={spreadLearnset}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
