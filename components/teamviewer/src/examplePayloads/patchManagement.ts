



export const listPatchManagementDevicesExamplePayload = {
  data: {
    devices: [
      {
        teamviewer_id: 0,
        activation_time: {
          _underlyingValue: "2024-12-04T23:27:05.237Z",
        },
      },
    ],
    continuation_token: "string",
  },
};

export const getMissingPatchesExamplePayload = {
  data: {
    device_id: 0,
    patches: [
      {
        patch_id: "00000000-0000-0000-0000-000000000000",
        patch_region_id: 0,
        severity: 0,
        product_name: "string",
        bulletin_name: "string",
        bulletin_url: "string",
        bulletin_title: "string",
        download_url: "string",
        type: 0,
        kb: "string",
        cve: ["string"],
        release_date: {
          _underlyingValue: "2024-12-04T23:48:08.237Z",
        },
        patch_size: 0,
        patch_details: "string",
        installable: true,
        is_service_pack: true,
      },
    ],
  },
};

export const scanResultsCountExamplePayload = {
  data: {
    DeviceMissingPatchesCountInfoList: [
      {
        DeviceId: 0,
        ErrorCode: 0,
        ScanResultCount: 0,
      },
    ],
    ContinuationToken: "string",
  },
};
