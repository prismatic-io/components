import type { Element } from "@prismatic-io/spectral";
import type { ComputerInventory, PagedResponse } from "../types";

export const getComputerExamplePayload: { data: ComputerInventory } = {
  data: {
    id: "1",
    udid: "A8C5F29D-1234-5678-ABCD-9E0F1B2C3D4E",
    general: {
      name: "MacBook-Pro-001",
      lastContactTime: "2026-04-15T10:23:00.000Z",
      platform: "Mac",
      assetTag: null,
      reportDate: "2026-04-15T10:22:00.000Z",
      remoteManagement: { managed: true },
      supervised: true,
    },
    hardware: {
      make: "Apple",
      model: "MacBook Pro (16-inch, 2023)",
      serialNumber: "C02XY1234567",
      processorType: "Apple M2 Pro",
      totalRamMegabytes: 16384,
    },
    operatingSystem: {
      name: "macOS",
      version: "15.4.0",
      build: "24E248",
    },
    userAndLocation: {
      username: "jdoe",
      realname: "Jane Doe",
      email: "jdoe@example.com",
      department: "Engineering",
      building: null,
    },
    security: {
      sipStatus: "ENABLED",
      gatekeeperStatus: "APP_STORE_AND_IDENTIFIED_DEVELOPERS",
      xprotectVersion: "2199",
      firewall: true,
    },
  },
};

export const listComputersExamplePayload: {
  data: PagedResponse<ComputerInventory>;
} = {
  data: {
    results: [getComputerExamplePayload.data],
    totalCount: 1,
  },
};

export const updateComputerExamplePayload: { data: string } = {
  data: "Successfully updated computer 1",
};

export const selectComputerExamplePayload: { result: Element[] } = {
  result: [{ key: "1", label: "MacBook-Pro-001" }],
};
