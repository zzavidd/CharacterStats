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
    register,
  } = useFormContext<CharacterCreateInput>();
  const { fields } = learnsetMethods;

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
              sx={{ maxWidth: (t) => t.spacing(9) }}
              inputProps={{ style: { textAlign: 'right' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={'start'}>
                    <Typography>Lv</Typography>
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
