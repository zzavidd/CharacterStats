import { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '.';

export function setSortIndex(state: AppState, action: PayloadAction<number>) {
  state.sort = action.payload;
}
