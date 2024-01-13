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
import { capitalCase } from 'change-case';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';

import { Type } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';

export default function TypeField({ label, name }: TypeFieldProps) {
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
                  alt={type}
                  height={20}
                  width={20}
                />
                <Typography>{capitalCase(type)}</Typography>
              </Stack>
            )}>
            {Object.values(Type).map((type) => (
              <MenuItem value={type} key={type}>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <Image
                    src={AppIcon.Types[type]}
                    alt={type}
                    height={20}
                    width={20}
                  />
                </ListItemIcon>
                <ListItemText>{capitalCase(type)}</ListItemText>
              </MenuItem>
            ))}
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
