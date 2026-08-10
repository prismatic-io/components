import type { Element } from "@prismatic-io/spectral";
import type { Location, OracleHcmListResponse } from "../types";
const locationExample: Location = {
  LocationId: 300100012340003,
  LocationCode: "US-NYC",
  LocationName: "New York Office",
  SetId: 300000001,
  SetCode: "COMMON",
  SetName: "Common Set",
  ActiveStatus: "A",
  Description: "Primary US office",
  EffectiveStartDate: "2020-01-01",
  EffectiveEndDate: "4712-12-31",
  addresses: [
    {
      Country: "US",
      AddressUsageType: "MAIN",
      AddressLine1: "350 Fifth Avenue",
      TownOrCity: "New York",
      Region1: "NY",
      PostalCode: "10118",
      EffectiveStartDate: "2020-01-01",
      EffectiveEndDate: "4712-12-31",
    },
  ],
  LastUpdateDate: "2024-01-15T08:00:00.000Z",
};
export const listLocationsExamplePayload: {
  data: OracleHcmListResponse<Location>;
} = {
  data: {
    items: [locationExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getLocationExamplePayload: {
  data: Location;
} = { data: locationExample };
export const createLocationExamplePayload: {
  data: Location;
} = {
  data: {
    ...locationExample,
    LocationId: 300100099990003,
    LocationCode: "US-SF",
    LocationName: "San Francisco Office",
  },
};
export const updateLocationExamplePayload: {
  data: Location;
} = {
  data: { ...locationExample, LocationName: "New York HQ" },
};
export const deleteLocationExamplePayload: {
  data: {
    id: string;
    status: string;
  };
} = {
  data: { id: "300100012345678", status: "DELETED" },
};
export const selectLocationExamplePayload: {
  result: Element[];
} = {
  result: [{ key: "300100012340003", label: "US-NYC - New York Office" }],
};
