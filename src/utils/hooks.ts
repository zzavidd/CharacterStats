import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { TypeName } from './constants/enums';

export function useNavigator(): (href: string) => void {
  const router = useRouter();
  return (href) =>
    router.push(
      process.env.NODE_ENV === 'development' ? `/CharacterStats${href}` : href,
    );
}

export function useTypeColorToken(): {
  color?: string;
  token?: (typeof TypeName)[keyof typeof TypeName];
} {
  const { watch } = useFormContext<CharacterCreateInput>();
  const { type1 } = watch();
  const t = useTheme();
  return {
    color: type1 ? t.palette[TypeName[type1]].main : undefined,
    token: type1 ? TypeName[type1] : undefined,
  };
}
