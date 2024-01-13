'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

import AbilityField from 'src/components/AbilityField';
import AbilitySelect from 'src/components/AbilitySelect';
import LearnsetBlock from 'src/components/LearnsetBlock';
import MoveSelect from 'src/components/MoveSelect';
import TypeField from 'src/components/TypeField';
import { DEFAULT_STATS, StatMap } from 'src/utils/constants/defaults';
import { Stat, Universe } from 'src/utils/constants/enums';
import { CharacterFormContext } from 'src/utils/contexts';
import { zCharacterInput } from 'src/utils/validators';

export function CharacterAddForm({ abilities, moves }: CharacterFormProps) {
  const useAbilityField = useState<AbilityKey | null>(null);
  const formMethods = useForm<CharacterInput>({
    resolver: zodResolver(zCharacterInput),
    values: {
      name: '',
      universe: undefined,
      type1: undefined,
      type2: undefined,
      ability1: undefined,
      ability2: undefined,
      abilityX: undefined,
      learnset: [],
      stats: DEFAULT_STATS,
    },
  });
  const learnsetMethods = useFieldArray({
    control: formMethods.control,
    name: 'learnset',
  });
  const abilitySelect = usePopupState({ variant: 'dialog' });
  const moveSelect = usePopupState({ variant: 'dialog' });

  return (
    <Container maxWidth={'xs'}>
      <CharacterFormContext.Provider
        value={{
          abilities,
          abilitySelect,
          useAbilityField,
          moves,
          moveSelect,
          learnsetMethods,
        }}>
        <FormProvider {...formMethods}>
          <form onSubmit={() => {}}>
            <Stack p={4}>
              <Typography variant={'h1'}>Add Character</Typography>
              <CharacterForm />
            </Stack>
          </form>
        </FormProvider>
      </CharacterFormContext.Provider>
    </Container>
  );
}

function CharacterForm() {
  const { register } = useFormContext<CharacterInput>();
  return (
    <Stack rowGap={4}>
      <TextField
        {...register('name')}
        label={'Name:'}
        placeholder={'Enter character name...'}
      />
      <FormControl>
        <InputLabel>Universe:</InputLabel>
        <Select {...register('universe')} label={'Universe:'}>
          <MenuItem>None</MenuItem>
          {Object.values(Universe).map((universe) => (
            <MenuItem value={universe} key={universe}>
              {universe}
            </MenuItem>
          ))}
        </Select>
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
            label={StatMap[stat]}
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
