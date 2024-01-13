import { Close } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PokeType, TypeName } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';
import { CharacterContext } from 'src/utils/contexts';

export default function TypeField({ label, name }: TypeFieldProps) {
  const { types } = useContext(CharacterContext);
  const { control, setValue, watch } = useFormContext<CharacterInput>();
  const type = watch(name);

  return (
    <FormControl fullWidth={true}>
      {type ? null : <InputLabel>{label}</InputLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, ...field } }) => (
          <Select
            {...field}
            label={value ? '' : label}
            value={value || ''}
            IconComponent={value ? SvgIcon : undefined}
            sx={{
              backgroundColor: (t) =>
                value ? t.palette.types[value].main : void 0,
            }}
            endAdornment={
              value ? (
                <InputAdornment position={'end'}>
                  <IconButton
                    onClick={() =>
                      setValue(name, undefined, {
                        shouldDirty: true,
                      })
                    }>
                    <Close />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            renderValue={(type) => (
              <Stack direction={'row'} alignItems={'center'} columnGap={2}>
                <Image
                  src={type ? AppIcon.Types[type] : ''}
                  alt={TypeName[type]}
                  height={20}
                  width={20}
                />
                <Typography>{TypeName[type]}</Typography>
              </Stack>
            )}>
            {Object.keys(types).map((type) => {
              const typeId = parseInt(type) as PokeType;
              return (
                <MenuItem value={typeId} key={typeId}>
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Image
                      src={AppIcon.Types[typeId]}
                      alt={TypeName[typeId]}
                      height={20}
                      width={20}
                    />
                  </ListItemIcon>
                  <ListItemText>{TypeName[typeId]}</ListItemText>
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
    </FormControl>
  );
}

interface TypeFieldProps {
  name: TypeKey;
  label: string;
}
