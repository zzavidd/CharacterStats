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
import { CharacterFormContext } from 'src/utils/contexts';

export default function TypeField({ label, name }: TypeFieldProps) {
  const { types } = useContext(CharacterFormContext);
  const { control, setValue, watch } = useFormContext<CharacterInput>();
  const typeValue = watch(name);

  return (
    <FormControl fullWidth={true}>
      {typeValue ? null : <InputLabel>{label}</InputLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, ...field } }) => {
          return (
            <Select
              {...field}
              label={value ? '' : label}
              value={value || ''}
              color={typeValue ? TypeName[typeValue] : undefined}
              IconComponent={value ? SvgIcon : undefined}
              sx={{
                backgroundColor: (t) =>
                  value ? t.palette[TypeName[value]].main : void 0,
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
              {Object.entries(types)
                .filter(([id]) => Number(id) < 1e4)
                .sort(([, a], [, b]) => a.localeCompare(b))
                .map(([id]) => {
                  const typeId = id as unknown as PokeType;
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
          );
        }}
      />
    </FormControl>
  );
}

interface TypeFieldProps {
  name: TypeKey;
  label: string;
}
