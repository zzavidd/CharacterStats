'use client';

import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import AbilityField from 'src/components/AbilityField';
import AbilitySelect from 'src/components/AbilitySelect';
import LearnsetBlock from 'src/components/LearnsetBlock';
import MoveSelect from 'src/components/MoveSelect';
import TypeField from 'src/components/TypeField';
import { StatMap } from 'src/utils/constants/defaults';
import { Stat, Universe } from 'src/utils/constants/enums';
import { calculateBST } from 'src/utils/functions';
import { useTypeColorToken } from 'src/utils/hooks';

export default function CharacterForm() {
  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useFormContext<CharacterInput>();
  const { token } = useTypeColorToken();

  return (
    <Stack rowGap={4}>
      <Stack direction={'row'} columnGap={2}>
        <TextField
          {...register('name')}
          label={'Name:'}
          color={token}
          placeholder={'Enter character name...'}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputLabelProps={{ shrink: true }}
          fullWidth={true}
        />
        <FormControl fullWidth={true}>
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
      </Stack>
      <Stack direction={'row'} columnGap={2}>
        <TypeField name={'type1'} label={'Type 1:'} />
        <TypeField name={'type2'} label={'Type 2:'} />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} rowGap={4} columnGap={2}>
        <AbilityField name={'ability1'} label={'Ability 1:'} />
        <AbilityField name={'ability2'} label={'Ability 2:'} />
      </Stack>
      <Stack direction={'row'} columnGap={2}>
        <AbilityField name={'abilityX'} label={'Hidden Ability:'} />
      </Stack>
      <Stack rowGap={4}>
        <FormLabel>Stats:</FormLabel>
        <Stack rowGap={2}>
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
          <Typography color={'text.secondary'} fontSize={'80%'}>
            BST: {calculateBST(watch('stats'))}
          </Typography>
        </Stack>
      </Stack>
      <LearnsetBlock />
      <AbilitySelect />
      <MoveSelect />
    </Stack>
  );
}
