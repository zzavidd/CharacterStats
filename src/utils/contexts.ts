import { PopupState } from 'material-ui-popup-state/hooks';
import React from 'react';

export const CharacterContext = React.createContext(
  {} as CharacterContextProps,
);
export const CharacterFormContext = React.createContext(
  {} as CharacterFormContextProps,
);

export interface CharacterContextProps {
  abilities: PokeAbilityMap;
  moves: Record<number, PokeMove>;
  useDrawer: ReactUseState<boolean>;
  useSearchTerm: ReactUseState<string>;
}

export interface CharacterFormContextProps extends CharacterFormProps {
  abilitySelect: PopupState;
  useAbilityField: ReactUseState<AbilityKey | null>;
}
