import { createScanPunch } from "./createScanPunch";
import workersDemographic from "./demographic";
import { getClockingTransaction } from "./getClockingTransaction";
import { getTimeCards } from "./getTimeCards";
import { getWorker } from "./getWorker";
import { getWorkersMetadata } from "./getWorkersMetadata";
import { listWorkers } from "./listWorkers";
import { modifyTimeEntries } from "./modifyTimeEntries";

export default {
  ...workersDemographic,
  createScanPunch,
  getClockingTransaction,
  getTimeCards,
  getWorker,
  getWorkersMetadata,
  listWorkers,
  modifyTimeEntries,
};
