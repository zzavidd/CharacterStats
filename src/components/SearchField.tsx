import { Close, Search } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

export default function SearchField({ onChange, ...props }: SearchFieldProps) {
  function onClear() {
    onChange('');
  }

  const disabled = !String(props.value).length;
  return (
    <TextField
      {...props}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position={'start'}>
            <Search />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position={'end'}>
            <IconButton
              onClick={onClear}
              disabled={disabled}
              sx={{ visibility: disabled ? 'hidden' : 'visible' }}>
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

interface SearchFieldProps extends Omit<TextFieldProps, 'onChange'> {
  onChange: (value: string) => void;
}
