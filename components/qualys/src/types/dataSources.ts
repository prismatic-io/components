export interface AssetGroupResponse {
  ASSET_GROUP_LIST_OUTPUT?: {
    RESPONSE?: {
      ASSET_GROUP_LIST?: {
        ASSET_GROUP?:
          | {
              ID?: string;
              TITLE?: string;
            }
          | {
              ID?: string;
              TITLE?: string;
            }[];
      };
    };
  };
}
export interface ScannerApplianceResponse {
  APPLIANCE_LIST_OUTPUT?: {
    RESPONSE?: {
      APPLIANCE_LIST?: {
        APPLIANCE?:
          | {
              ID?: string;
              NAME?: string;
              STATUS?: string;
            }
          | {
              ID?: string;
              NAME?: string;
              STATUS?: string;
            }[];
      };
    };
  };
}
