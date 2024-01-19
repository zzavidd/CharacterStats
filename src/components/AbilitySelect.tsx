import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Fuse from 'fuse.js';
import { bindDialog } from 'material-ui-popup-state';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Virtuoso } from 'react-virtuoso';

import { TypeName } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';
import { getMenuItemSx } from 'src/utils/functions';

import SearchField from './SearchField';

export default function AbilitySelect() {
  const [searchTerm, setSearchTerm] = useState('');
  const { abilities: allAbilities, abilitySelect } =
    useContext(CharacterFormContext);
  const abilities = useAbilitySieve(allAbilities, searchTerm);

  function onSearchChange(value: string) {
    setSearchTerm(value);
  }
  return (
    <Dialog
      {...bindDialog(abilitySelect)}
      fullWidth={true}
      maxWidth={'xs'}
      PaperProps={{ sx: { height: '100%' } }}
      TransitionProps={{ onExited: () => setSearchTerm('') }}
      disableRestoreFocus={true}>
      <DialogTitle>Select an ability</DialogTitle>
      <Divider />
      <DialogContent sx={{ height: '100%', p: 0 }}>
        <Paper square={true}>
          <SearchField
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={'Search for an ability...'}
            fullWidth={true}
            variant={'standard'}
            InputProps={{ disableUnderline: true, sx: { py: 1 } }}
            sx={{ p: 3 }}
            autoFocus={true}
          />
        </Paper>
        <Virtuoso
          data={abilities}
          totalCount={abilities.length}
          itemContent={(i) => (
            <AbilityOption ability={abilities[i]} key={abilities[i].id} />
          )}
        />
      </DialogContent>
    </Dialog>
  );
}

const AbilityOption = React.memo<AbilityOptionProps>(
  ({ ability }) => {
    const { id, name, commonType, description } = ability;
    const { abilitySelect, useAbilityField } = useContext(CharacterFormContext);
    const { setValue } = useFormContext<CharacterInput>();
    const [abilityField] = useAbilityField;

    function onSelect() {
      if (!abilityField) return;
      setValue(abilityField, id, { shouldDirty: true });
      abilitySelect.close();
    }

    return (
      <MenuItem
        onClick={onSelect}
        value={id}
        sx={getMenuItemSx(commonType)}
        key={id}>
        <Stack direction={'row'} columnGap={3} alignItems={'flex-start'}>
          <Image
            src={AppIcon.Types[commonType]}
            alt={TypeName[commonType]}
            height={20}
            width={20}
          />
          <Stack>
            <Typography>{name}</Typography>
            <Typography variant={'body2'} sx={{ whiteSpace: 'pre-wrap' }}>
              {description}
            </Typography>
          </Stack>
        </Stack>
      </MenuItem>
    );
  },
  (a, b) => a.ability.id === b.ability.id,
);

function useAbilitySieve(allAbilities: PokeAbilityMap, searchTerm: string) {
  let abilities = Object.values(allAbilities);

  if (searchTerm) {
    abilities = new Fuse(abilities, {
      keys: [
        { name: 'name', weight: 10 },
        { name: 'description', weight: 5 },
        {
          name: 'commonType',
          getFn: (move) => TypeName[move.commonType],
          weight: 1,
        },
      ],
      ignoreLocation: true,
      threshold: 0.1,
      shouldSort: true,
    })
      .search(searchTerm)
      .map(({ item }) => item);
  }

  return abilities;
}

interface AbilityOptionProps {
  ability: PokeAbility;
}
