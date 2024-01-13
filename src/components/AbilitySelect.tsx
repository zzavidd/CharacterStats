import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Fuse from 'fuse.js';
import { bindDialog } from 'material-ui-popup-state';
import Image from 'next/image';
import React, { useContext, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';

import { TypeName } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';
import { getMenuItemSx } from 'src/utils/functions';

import SearchField from './SearchField';

const BASE_ROW_HEIGHT = 50;

export default function AbilitySelect() {
  const [searchTerm, setSearchTerm] = useState('');
  const { abilities: allAbilities, abilitySelect } =
    useContext(CharacterFormContext);
  const abilities = useAbilitySieve(allAbilities, searchTerm);

  const listRef = useRef<VariableSizeList<PokeAbility[]>>(null);

  function onSearchChange(value: string) {
    listRef.current?.resetAfterIndex(0);
    setSearchTerm(value);
  }

  function getItemSize(i: number) {
    const { description } = abilities[i];
    let size = BASE_ROW_HEIGHT;
    if (description) {
      size += 20;
    }
    size += (Math.floor(description?.length / 60) || 0) * 25;
    return size;
  }

  return (
    <Dialog
      {...bindDialog(abilitySelect)}
      fullWidth={true}
      maxWidth={'xs'}
      keepMounted={true}>
      <DialogTitle>Select an ability</DialogTitle>
      <DialogContent sx={{ height: '100vh', p: 0 }} dividers={true}>
        <Paper square={true}>
          <SearchField
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={'Search for an ability...'}
            fullWidth={true}
            sx={{ p: 3 }}
          />
        </Paper>
        <AutoSizer>
          {({ height, width }) => (
            <VariableSizeList
              itemData={abilities}
              itemCount={abilities.length}
              itemKey={(i, data) => data[i].id}
              itemSize={getItemSize}
              estimatedItemSize={BASE_ROW_HEIGHT + 40}
              overscanCount={30}
              height={height}
              width={width}
              ref={listRef}>
              {({ data, style, index }) => {
                const ability = data[index];
                return (
                  <AbilityOption
                    ability={ability}
                    style={style}
                    key={ability.id}
                  />
                );
              }}
            </VariableSizeList>
          )}
        </AutoSizer>
      </DialogContent>
    </Dialog>
  );
}

const AbilityOption = React.memo<AbilityOptionProps>(
  ({ ability, style }) => {
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
        style={style}
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
  style: React.CSSProperties;
}
