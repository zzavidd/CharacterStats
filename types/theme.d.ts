import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }

  interface Palette extends ColorOverrides<PaletteColor> {}
  interface PaletteOptions
    extends Partial<ColorOverrides<PaletteColorOptions>> {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends ColorOverrides<true> {}
}
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides extends ColorOverrides<true> {}
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsColorOverrides extends ColorOverrides<true> {}
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides extends ColorOverrides<true> {}
}

interface ColorOverrides<T> {
  Normal: T;
  Fighting: T;
  Flying: T;
  Poison: T;
  Ground: T;
  Rock: T;
  Bug: T;
  Ghost: T;
  Steel: T;
  Fire: T;
  Water: T;
  Grass: T;
  Electric: T;
  Psychic: T;
  Ice: T;
  Dragon: T;
  Dark: T;
  Fairy: T;
  Unknown: T;
  Shadow: T;
}
