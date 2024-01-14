'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import * as ServerActions from 'src/utils/actions';
import { DEFAULT_STATS } from 'src/utils/constants/defaults';
import { CharacterFormContext } from 'src/utils/contexts';
import { zCharacterCreateInput } from 'src/utils/validators';
import CharacterForm from './CharacterForm';

export default function CharacterAddForm({
  abilities,
  moves,
  types,
}: CharacterFormProps) {
  const useAbilityField = useState<AbilityKey | null>(null);
  const formMethods = useForm<CharacterCreateInput>({
    criteriaMode: 'all',
    resolver: zodResolver(zCharacterCreateInput),
    values: {
      name: '',
      universe: undefined,
      type1: undefined,
      type2: null,
      ability1: undefined,
      ability2: null,
      abilityX: null,
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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  async function addCharacter(c: CharacterCreateInput) {
    try {
      await ServerActions.addCharacter(c);
      router.refresh();
      router.push('/');
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  }

  return (
    <Container maxWidth={'xs'}>
      <CharacterFormContext.Provider
        value={{
          abilities,
          abilitySelect,
          useAbilityField,
          moves,
          moveSelect,
          types,
          learnsetMethods,
        }}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(addCharacter)}>
            <Stack p={4} rowGap={2}>
              <Box>
                <Button href={'/'} startIcon={<ArrowBack />}>
                  Back to Characters
                </Button>
              </Box>
              <Typography variant={'h1'}>Add Character</Typography>
              <CharacterForm />
              <LoadingButton
                type={'submit'}
                loading={formMethods.formState.isSubmitting}>
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </FormProvider>
      </CharacterFormContext.Provider>
    </Container>
  );
}
