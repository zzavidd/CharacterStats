import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import Fuse from 'fuse.js';
import { bindDialog } from 'material-ui-popup-state';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';

import SearchField from './SearchField';

export default function AbilitySelect() {
  const [searchTerm, setSearchTerm] = useState('');
  const { abilities: allAbilities, abilitySelect } =
    useContext(CharacterFormContext);

  const abilities = useAbilitySieve(allAbilities, searchTerm);
  return (
    <Dialog
      {...bindDialog(abilitySelect)}
      fullWidth={true}
      maxWidth={'xs'}
      keepMounted={true}>
      <DialogTitle>Select an ability</DialogTitle>
      <DialogContent sx={{ height: '100vh', p: 0 }} dividers={true}>
        <SearchField
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
          placeholder={'Search for an ability...'}
          fullWidth={true}
          sx={{ p: 3 }}
        />
        <MenuList disablePadding={true}>
          {abilities.map((ability) => (
            <AbilityOption ability={ability} key={ability.id} />
          ))}
        </MenuList>
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
      <MenuItem onClick={onSelect} value={id} sx={{ py: 2 }} key={id}>
        <Stack direction={'row'} columnGap={3} alignItems={'flex-start'}>
          <Image
            src={AppIcon.Types[commonType]}
            alt={commonType}
            height={20}
            width={20}
          />
          <Stack>
            <Typography>{name}</Typography>
            <Typography variant={'body2'} sx={{ textWrap: 'wrap' }}>
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
      keys: ['name', 'description', 'commonType'],
      ignoreLocation: true,
      threshold: 0.1,
    })
      .search(searchTerm)
      .map(({ item }) => item);
  }

  return abilities;
}

interface AbilityOptionProps {
  ability: PokeAbility;
}
