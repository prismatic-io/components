export interface ClassicScan {
  REF?: string;
  TITLE?: string;
  TYPE?: string;
  STATUS?: {
    STATE?: string;
  };
  LAUNCH_DATETIME?: string;
  DURATION?: string;
  TARGET?: string;
  PROCESSED?: string;
  OPTION_PROFILE?: {
    TITLE?: string;
  };
}
export interface ClassicScanResponse {
  SCAN_LIST_OUTPUT?: {
    RESPONSE?: {
      SCAN_LIST?: {
        SCAN?: ClassicScan | ClassicScan[];
      };
    };
  };
}
export interface NormalizedScan {
  ref?: string;
  title?: string;
  type?: string;
  state?: string;
  launchDatetime?: string;
  duration?: string;
  target?: string;
  processed?: string;
  optionProfile?: string | null;
}
export interface ClassicScanLaunchResponse {
  SIMPLE_RETURN?: {
    RESPONSE?: {
      ITEM_LIST?: {
        ITEM?:
          | {
              KEY?: string;
              VALUE?: string;
            }[]
          | {
              KEY?: string;
              VALUE?: string;
            };
      };
      TEXT?: string;
    };
  };
}
