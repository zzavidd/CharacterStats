import { PayloadAction } from '@reduxjs/toolkit';
import { Order } from 'natural-orderby';

import { AppState } from '.';

export function setSortProperty(
  state: AppState,
  action: PayloadAction<number>,
): void {
  state.sort.property = action.payload;
}

export function setSortOrder(
  state: AppState,
  action: PayloadAction<Order>,
): void {
  state.sort.order = action.payload;
}
