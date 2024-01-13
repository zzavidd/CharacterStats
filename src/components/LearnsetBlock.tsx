import { Add } from '@mui/icons-material';
import { Button, FormLabel, Stack } from '@mui/material';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CharacterFormContext } from 'src/utils/contexts';

import MoveField from './MoveField';

export default function LearnsetBlock() {
  const { learnsetMethods, moveSelect } = useContext(CharacterFormContext);
  const { register } = useFormContext<CharacterInput>();
  const { fields } = learnsetMethods;

  return (
    <Stack rowGap={2}>
      <FormLabel>Learnset:</FormLabel>
      <Button
        variant={'contained'}
        onClick={() => moveSelect.open()}
        startIcon={<Add />}>
        Add Move
      </Button>
      <Stack rowGap={2}>
        {fields.map((field, index) => (
          <MoveField
            {...register(`learnset.${index}.moveId`)}
            index={index}
            key={field.id}
          />
        ))}
      </Stack>
    </Stack>
  );
}
