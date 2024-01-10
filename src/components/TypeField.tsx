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
import { Controller, useFormContext } from 'react-hook-form';

import { Type } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';

export default function TypeField({ label, name }: TypeFieldProps) {
  const { control, setValue } = useFormContext<CharacterInput>();

  return (
    <FormControl fullWidth={true}>
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, ...field } }) => (
          <Select
            {...field}
            label={label}
            value={value || ''}
            IconComponent={value ? SvgIcon : undefined}
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
                <Typography>{type}</Typography>
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
                <ListItemText>{type}</ListItemText>
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
