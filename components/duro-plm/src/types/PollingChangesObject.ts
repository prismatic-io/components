import type { DuroRecord } from "./DuroRecord";

export interface PollingChangesObject {
  created?: DuroRecord[];
  updated?: DuroRecord[];
}
