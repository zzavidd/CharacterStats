'use client';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import AbilityField from 'src/components/AbilityField';
import AbilitySelect from 'src/components/AbilitySelect';
import LearnsetBlock from 'src/components/LearnsetBlock';
import MoveSelect from 'src/components/MoveSelect';
import TypeField from 'src/components/TypeField';
import { StatMap } from 'src/utils/constants/defaults';
import { Stat, Universe } from 'src/utils/constants/enums';
import { useTypeColorToken } from 'src/utils/hooks';

export default function CharacterForm() {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<CharacterInput>();
  const { token } = useTypeColorToken();

  return (
    <Stack rowGap={4}>
      <TextField
        {...register('name')}
        label={'Name:'}
        color={token}
        placeholder={'Enter character name...'}
        error={!!errors.name}
        helperText={errors.name?.message}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl>
        <InputLabel>Universe:</InputLabel>
        <Controller
          control={control}
          name={'universe'}
          render={({ field }) => (
            <Select
              {...field}
              label={'Universe:'}
              color={token}
              fullWidth={true}
              error={!!errors.universe}>
              {Object.values(Universe).map((universe) => (
                <MenuItem value={universe} key={universe}>
                  {universe}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.universe ? (
          <FormHelperText>{errors.universe?.message}</FormHelperText>
        ) : null}
      </FormControl>
      <Stack direction={'row'} columnGap={2}>
        <TypeField name={'type1'} label={'Type 1:'} />
        <TypeField name={'type2'} label={'Type 2:'} />
      </Stack>
      <Stack direction={'row'} columnGap={2}>
        <AbilityField name={'ability1'} label={'Ability 1:'} />
        <AbilityField name={'ability2'} label={'Ability 2:'} />
      </Stack>
      <Stack direction={'row'} columnGap={2}>
        <AbilityField name={'abilityX'} label={'Hidden Ability:'} />
      </Stack>
      <Stack direction={'row'} columnGap={2}>
        {Object.values(Stat).map((stat) => (
          <TextField
            {...register(`stats.${stat}`, {
              valueAsNumber: true,
              validate: (v) => v > 0,
            })}
            color={token}
            label={StatMap[stat]}
            error={!!errors.stats?.[stat]}
            helperText={errors.stats?.[stat]?.message}
            key={stat}
          />
        ))}
      </Stack>
      <LearnsetBlock />
      <AbilitySelect />
      <MoveSelect />
    </Stack>
  );
}
