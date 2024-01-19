import { Close } from '@mui/icons-material';
import { ButtonBase, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { COLOR_TYPE } from 'src/utils/constants/colors';
import { TypeName } from 'src/utils/constants/enums';
import AppIcon from 'src/utils/constants/icons';
import { CharacterFormContext } from 'src/utils/contexts';

export default function MoveField({ index }: MoveFieldProps) {
  const { learnsetMethods, moves, moveSelect } =
    useContext(CharacterFormContext);
  const { watch } = useFormContext<CharacterInput>();

  const { remove } = learnsetMethods;
  const value = watch(`learnset.${index}.moveId`);

  return (
    <Stack direction={'row'} alignItems={'center'} columnGap={1} width={'100%'}>
      <ButtonBase
        onClick={() => moveSelect.open()}
        sx={{
          borderRadius: 1,
          height: '100%',
          overflow: 'hidden',
          width: '100%',
        }}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          height={'100%'}
          width={'100%'}
          p={3}
          justifyContent={'space-between'}
          sx={{ backgroundColor: COLOR_TYPE[moves[value].type] }}>
          <Stack direction={'row'} columnGap={2}>
            <Image
              src={AppIcon.Types[moves[value].type]}
              alt={TypeName[moves[value].type]}
              height={20}
              width={20}
            />
            <Typography>{moves[value].name}</Typography>
          </Stack>
          <Image
            src={AppIcon.Classes[moves[value].damageClass]}
            alt={moves[value].damageClass}
            height={18}
            width={25}
          />
        </Stack>
      </ButtonBase>
      <IconButton
        size={'small'}
        onClick={(e) => {
          remove(index);
          e.stopPropagation();
        }}>
        <Close />
      </IconButton>
    </Stack>
  );
}

interface MoveFieldProps {
  index: number;
}
