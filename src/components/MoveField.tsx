import { Close } from '@mui/icons-material';
import {
  BaseTextFieldProps,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { COLOR_TYPE } from 'src/utils/constants/colors';
import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';

export default function MoveField({ index, name }: MoveFieldProps) {
  const { learnsetMethods, moves, moveSelect } =
    useContext(CharacterFormContext);
  const { control } = useFormContext<CharacterInput>();

  const { remove } = learnsetMethods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => {
        return (
          <TextField
            {...field}
            value={value ? moves[value].name : ''}
            placeholder={'Select a move'}
            onClick={() => {
              moveSelect.open();
            }}
            fullWidth={true}
            InputProps={{
              readOnly: true,
              sx: { backgroundColor: COLOR_TYPE[moves[value].type] },
              startAdornment: value ? (
                <InputAdornment position={'start'}>
                  <Image
                    src={AppIcon.Types[moves[value].type]}
                    alt={moves[value].type}
                    height={20}
                    width={20}
                  />
                </InputAdornment>
              ) : null,
              endAdornment: value ? (
                <InputAdornment position={'end'}>
                  <IconButton
                    onClick={(e) => {
                      remove(index);
                      e.stopPropagation();
                    }}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        );
      }}
    />
  );
}

interface MoveFieldProps extends BaseTextFieldProps {
  name: `learnset.${number}.moveId`;
  index: number;
}
