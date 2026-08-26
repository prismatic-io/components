import type { ClassicScan, NormalizedScan } from "../types";
export const normalizeScan = (scan: ClassicScan): NormalizedScan => ({
  ref: scan.REF,
  title: scan.TITLE,
  type: scan.TYPE,
  state: scan.STATUS?.STATE,
  launchDatetime: scan.LAUNCH_DATETIME,
  duration: scan.DURATION,
  target: scan.TARGET,
  processed: scan.PROCESSED,
  optionProfile: scan.OPTION_PROFILE?.TITLE,
});
