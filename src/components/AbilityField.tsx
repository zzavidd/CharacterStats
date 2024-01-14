import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TypeName } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';

export default function AbilityField({ name, label }: AbilityFieldProps) {
  const { abilities, abilitySelect, useAbilityField } =
    useContext(CharacterFormContext);
  const { control, setValue } = useFormContext<CharacterCreateInput>();
  const [, setAbilityField] = useAbilityField;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => (
        <TextField
          {...field}
          label={label}
          value={value ? abilities[value].name : ''}
          onClick={() => {
            setAbilityField(name);
            abilitySelect.open();
          }}
          fullWidth={true}
          InputProps={{
            readOnly: true,
            startAdornment: value ? (
              <InputAdornment position={'start'}>
                <Image
                  src={AppIcon.Types[abilities[value].commonType]}
                  alt={TypeName[abilities[value].commonType]}
                  height={20}
                  width={20}
                />
              </InputAdornment>
            ) : null,
            endAdornment: value ? (
              <InputAdornment position={'end'}>
                <IconButton
                  onClick={(e) => {
                    setValue(name, undefined, { shouldDirty: true });
                    e.stopPropagation();
                  }}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
}

interface AbilityFieldProps {
  name: AbilityKey;
  label: string;
}
