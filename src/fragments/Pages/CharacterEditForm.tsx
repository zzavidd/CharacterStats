'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { CharacterFormContext } from 'src/utils/contexts';
import { zCharacterEditInput } from 'src/utils/validators';

import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import * as ServerActions from 'src/server/actions';
import CharacterForm from './CharacterForm';

export default function CharacterEditForm({
  character: c,
  abilities,
  moves,
  types,
}: CharacterEditFormProps) {
  const useAbilityField = useState<AbilityKey | null>(null);
  const formMethods = useForm<CharacterEditInput>({
    criteriaMode: 'all',
    resolver: zodResolver(zCharacterEditInput),
    values: {
      ...c,
      learnset:
        'learnset' in c
          ? Object.entries(c.learnset).flatMap(([level, moveIds]) =>
              moveIds.map((moveId) => ({ level: Number(level), moveId })),
            )
          : [],
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

  async function updateCharacter(c: CharacterEditInput) {
    try {
      await ServerActions.updateCharacter(c);
      void router.push('/');
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
          // @ts-ignore
          learnsetMethods,
        }}>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(updateCharacter)}>
            <Stack p={4} rowGap={2}>
              <Box>
                <Button href={'/'} startIcon={<ArrowBack />}>
                  Back to Characters
                </Button>
              </Box>
              <Typography variant={'h1'}>Edit Character</Typography>
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

interface CharacterEditFormProps extends CharacterFormProps {
  character: Character;
}
