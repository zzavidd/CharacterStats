'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { getDoc } from 'firebase/firestore';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { notFound } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

import * as ServerActions from 'src/utils/actions';
import { characterDocumentRef } from 'src/utils/client/firebase';
import { DEFAULT_CHARACTER_INPUT } from 'src/utils/constants/defaults';
import {
  CharacterFormContext,
  CharacterFormContextProps,
} from 'src/utils/contexts';
import { useNavigator, useTypeColorToken } from 'src/utils/hooks';
import { zCharacterInput } from 'src/utils/validators';

import CharacterForm from './CharacterForm';

export default function CharacterFormIndex({
  abilities,
  moves,
  types,
}: CharacterFormProps) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const useAbilityField = useState<AbilityKey | null>(null);
  const formMethods = useForm<CharacterInput>({
    criteriaMode: 'all',
    resolver: zodResolver(zCharacterInput),
    values: DEFAULT_CHARACTER_INPUT,
  });
  const learnsetMethods = useFieldArray({
    control: formMethods.control,
    name: 'learnset',
  });
  const abilitySelect = usePopupState({ variant: 'dialog' });
  const moveSelect = usePopupState({ variant: 'dialog' });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigator();

  useEffect(() => {
    (async () => {
      let character;
      if (id) {
        const snapshot = await getDoc(characterDocumentRef(id));
        if (!snapshot.exists()) {
          notFound();
        }
        const data = snapshot.data();
        character = {
          ...data,
          learnset: Object.entries(data.learnset).flatMap(([level, moveIds]) =>
            moveIds.map((moveId) => ({ level: Number(level), moveId })),
          ),
        };
        for (const key of Object.keys(character)) {
          formMethods.setValue(key as keyof CharacterInput, character[key], {
            shouldValidate: true,
          });
        }
      }
    })();
  }, [id, formMethods]);

  async function addCharacter(c: CharacterInput) {
    try {
      await ServerActions.addCharacter(c);
      navigate('/');
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  }

  async function updateCharacter(c: CharacterInput) {
    try {
      await ServerActions.updateCharacter(c);
      navigate('/');
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    }
  }

  const isAdd = !id;
  const formSettings = isAdd
    ? { op: 'Add', onSubmit: addCharacter, buttonText: 'Submit' }
    : { op: 'Edit', onSubmit: updateCharacter, buttonText: 'Update' };

  const staticContext: CharacterFormContextProps = {
    abilities,
    abilitySelect,
    useAbilityField,
    moves,
    moveSelect,
    types,
    learnsetMethods,
    formSettings,
  };

  return (
    <CharacterFormContext.Provider value={staticContext}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(formSettings.onSubmit)}>
          <React.Fragment>
            <Container maxWidth={'xs'}>
              <Stack p={4} rowGap={2}>
                <Typography variant={'h1'}>
                  {formSettings.op} Character
                </Typography>
                <CharacterForm />
              </Stack>
            </Container>
            <FormFooter />
          </React.Fragment>
        </form>
      </FormProvider>
    </CharacterFormContext.Provider>
  );
}

function FormFooter() {
  const { formState } = useFormContext<CharacterInput>();
  const { formSettings } = useContext(CharacterFormContext);

  const { token } = useTypeColorToken();

  return (
    <Paper square={true} sx={{ position: 'sticky', bottom: 0 }}>
      <Toolbar>
        <Container maxWidth={'xs'}>
          <Stack p={4} direction={'row'} columnGap={2}>
            <Button
              variant={'outlined'}
              color={token}
              href={'/'}
              fullWidth={true}>
              Cancel
            </Button>
            <LoadingButton
              variant={'contained'}
              color={token}
              fullWidth={true}
              type={'submit'}
              loading={formState.isSubmitting}>
              {formSettings.buttonText}
            </LoadingButton>
          </Stack>
        </Container>
      </Toolbar>
    </Paper>
  );
}
