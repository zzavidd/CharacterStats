import { Add } from '@mui/icons-material';
import {
  Button,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CharacterFormContext } from 'src/utils/contexts';
import { useTypeColorToken } from 'src/utils/hooks';

import MoveField from './MoveField';

export default function LearnsetBlock() {
  const { learnsetMethods, moveSelect } = useContext(CharacterFormContext);
  const {
    formState: { errors },
    setValue,
    register,
    watch,
  } = useFormContext<CharacterInput>();
  const { fields } = learnsetMethods;
  const learnsetValues = watch('learnset');

  const { token } = useTypeColorToken();

  return (
    <Stack rowGap={4}>
      <FormLabel>Learnset:</FormLabel>
      <Button
        variant={'contained'}
        onClick={() => moveSelect.open()}
        startIcon={<Add />}
        color={token}
        sx={{ py: 3 }}>
        Add Move
      </Button>
      <Stack rowGap={2}>
        {fields.map((field, index) => (
          <Stack direction={'row'} columnGap={2} key={field.id}>
            <TextField
              {...register(`learnset.${index}.level`, {
                valueAsNumber: true,
                validate: (v) => v >= 0 && v <= 100,
              })}
              type={'number'}
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
              error={!!errors.learnset?.[index]?.level}
              helperText={errors.learnset?.[index]?.level?.message}
            />
            <MoveField index={index} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
