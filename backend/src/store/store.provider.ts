import { Store } from "./store.entity";

export const storesProvider = [
  {
    provide: 'STORES_REPOSITORY',
    useValue: Store,
  },
];