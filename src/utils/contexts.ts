import { PopupState } from 'material-ui-popup-state/hooks';
import React from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';

export const CharacterContext = React.createContext(
  {} as CharacterContextProps,
);
export const CharacterEntryContext = React.createContext(
  {} as CharacterEntryContextProps,
);
export const CharacterFormContext = React.createContext(
  {} as CharacterFormContextProps,
);

export interface CharacterContextProps {
  abilities: PokeAbilityMap;
  moves: PokeMoveMap;
  types: PokeTypeMap;
  useDrawer: ReactUseState<boolean>;
  useSearchTerm: ReactUseState<string>;
}

export interface CharacterEntryContextProps {
  character: Character;
  characterDeleteDialog: PopupState;
  characterMenu: PopupState;
}

export interface CharacterFormContextProps extends CharacterFormProps {
  abilitySelect: PopupState;
  moveSelect: PopupState;
  useAbilityField: ReactUseState<AbilityKey | null>;
  learnsetMethods: UseFieldArrayReturn<CharacterInput>;
}
