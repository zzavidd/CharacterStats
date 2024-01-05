import { PayloadAction } from '@reduxjs/toolkit';
import { Order } from 'natural-orderby';

import { AppState } from '.';

export function setFilterProperty<T extends keyof AppState['filters']>(
  state: AppState,
  action: PayloadAction<{ key: T; value: AppState['filters'][T][number] }>,
): void {
  const { key } = action.payload;
  const value = action.payload.value as never;
  if (state.filters[key].includes(value)) {
    state.filters[key].splice(state.filters[key].indexOf(value), 1);
  } else {
    state.filters[key].push(value);
  }
}

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
