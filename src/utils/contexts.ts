import React from 'react';

export const CharacterContext = React.createContext(
  {} as CharacterContextProps,
);

export interface CharacterContextProps {
  abilities: Record<number, PokeAbility>;
  moves: Record<number, PokeMove>;

  useDrawer: ReactUseState<boolean>;
  useSearchTerm: ReactUseState<string>;
}
