import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { ITAM_CLEAR_VALUE, ITAM_YES_NO_MODEL } from "../constants";
import { cleanNumberInput, cleanStringInput } from "../util";
import { additionalFields, connection, fetchAll, pagination } from "./common";
const itamAssetsDocumentationComments =
  "See [Freshservice IT Asset Management API documentation](https://api.freshservice.com/) for more information.";
const itamAssetsAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${itamAssetsDocumentationComments}`,
});
const assetTypeOptions = [
  { label: "AC", value: "AC" },
  { label: "Block Tile", value: "Block Tile" },
  { label: "Breaker Panel", value: "Breaker Panel" },
  { label: "Cable Modem", value: "Cable Modem" },
  { label: "DMARC", value: "DMARC" },
  { label: "Door", value: "Door" },
  { label: "Fabric Extender", value: "Fabric Extender" },
  { label: "Fax Machine", value: "Fax Machine" },
  { label: "Filler Panel", value: "Filler Panel" },
  { label: "Monitor", value: "Monitor" },
  { label: "Patch Panel", value: "Patch Panel" },
  { label: "Patch Panel Module", value: "Patch Panel Module" },
  { label: "Projector", value: "Projector" },
  { label: "Scanner", value: "Scanner" },
  { label: "Sensor", value: "Sensor" },
  { label: "Shredder", value: "Shredder" },
  { label: "Software", value: "Software" },
  { label: "Speaker Phone", value: "Speaker Phone" },
  { label: "TAP Module", value: "TAP Module" },
  { label: "Speaker", value: "Speaker" },
];
const backConnectionTypeOptions = [
  { label: "Panel", value: "panel" },
  { label: "Switch", value: "switch" },
  { label: "Circuit", value: "circuit" },
  { label: "Cable", value: "cable" },
];
const whereOptions = [
  { label: "Above", value: "above" },
  { label: "Below", value: "below" },
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
  { label: "Rack Mounted", value: "rack mounted" },
  { label: "Shelf", value: "shelf" },
];
const depthOptions = [
  { label: "Half", value: "half" },
  { label: "Full", value: "full" },
];
const assetId = input({
  label: "Asset ID",
  comments: "The unique identifier for the asset.",
  type: "string",
  required: true,
  example: "54",
  placeholder: "Enter asset ID",
  dataSource: "selectItamAsset",
  clean: util.types.toNumber,
});
const type = input({
  label: "Type",
  comments: "The specific type of the asset.",
  type: "string",
  required: false,
  model: assetTypeOptions,
  example: "Cable Modem",
  placeholder: "Select an asset type",
  clean: cleanStringInput,
});
const name = input({
  label: "Name",
  comments: "The name of the asset.",
  type: "string",
  required: false,
  example: "main modem",
  placeholder: "Enter asset name",
  clean: cleanStringInput,
});
const serialNo = input({
  label: "Serial Number",
  comments: `The serial number of the asset. Set to ${ITAM_CLEAR_VALUE} to clear the stored value.`,
  type: "string",
  required: false,
  example: "SN-2281-KD",
  placeholder: "Enter serial number",
  clean: cleanStringInput,
});
const assetNo = input({
  label: "Asset Number",
  comments: "The asset number of the asset.",
  type: "string",
  required: false,
  example: "ASSET-54",
  placeholder: "Enter asset number",
  clean: cleanStringInput,
});
const notes = input({
  label: "Notes",
  comments: "Free-text notes about the asset.",
  type: "string",
  required: false,
  example: "Spare unit held in the Westport store room.",
  placeholder: "Enter notes",
  clean: cleanStringInput,
});
const serviceLevel = input({
  label: "Service Level",
  comments:
    "The operational status of the asset. Freshservice predefines In Service, Spare and Not in Service, and also accepts a custom value.",
  type: "string",
  required: false,
  example: "In Service",
  placeholder: "Enter service level",
  clean: cleanStringInput,
});
const inService = input({
  label: "In Service",
  comments:
    'Whether the asset is currently in service. Freshservice expects the strings "yes" or "no" here rather than a boolean.',
  type: "string",
  required: false,
  model: ITAM_YES_NO_MODEL,
  example: "yes",
  placeholder: "Select yes or no",
  clean: cleanStringInput,
});
const vendor = input({
  label: "Vendor",
  comments: "The name of the vendor that supplied the asset.",
  type: "string",
  required: false,
  example: "Cisco",
  placeholder: "Enter vendor name",
  clean: cleanStringInput,
});
const objectCategory = input({
  label: "Object Category",
  comments:
    "The existing category used to control access when multitenancy is enabled.",
  type: "string",
  required: false,
  example: "Networking",
  placeholder: "Enter object category",
  clean: cleanStringInput,
});
const deviceName = input({
  label: "Device Name",
  comments: "The name of the device this asset is associated with.",
  type: "string",
  required: false,
  example: "db-080-westport",
  placeholder: "Enter device name",
  clean: cleanStringInput,
});
const backConnectionType = input({
  label: "Back Connection Type",
  comments: "The type of back connection used by the asset.",
  type: "string",
  required: false,
  model: backConnectionTypeOptions,
  example: "panel",
  placeholder: "Select a back connection type",
  clean: cleanStringInput,
});
const tags = input({
  label: "Tags",
  comments: "A comma-separated list of tags to apply to the asset.",
  type: "string",
  required: false,
  example: "spare,networking",
  placeholder: "Enter tags",
  clean: cleanStringInput,
});
const rack = input({
  label: "Rack",
  comments: "The name of the rack the asset is mounted in.",
  type: "string",
  required: false,
  example: "Rack 12",
  placeholder: "Enter rack name",
  clean: cleanStringInput,
});
const rackId = input({
  label: "Rack ID",
  comments: "The unique identifier for the rack the asset is mounted in.",
  type: "string",
  required: false,
  example: "17",
  placeholder: "Enter rack ID",
  clean: cleanNumberInput,
});
const startAt = input({
  label: "Start At",
  comments:
    "The starting Rack Unit (U) location for the asset. Required when the asset is added to a rack.",
  type: "string",
  required: false,
  example: "12",
  placeholder: "Enter starting rack unit",
  clean: cleanStringInput,
});
const size = input({
  label: "Size",
  comments:
    "The height of the asset in Rack Units (U). Required when the asset is added to a rack.",
  type: "string",
  required: false,
  example: "2",
  placeholder: "Enter size in rack units",
  clean: cleanNumberInput,
});
const orientation = input({
  label: "Orientation",
  comments:
    'The mounting orientation. Only "back" has an effect; any other value is ignored by Freshservice.',
  type: "string",
  required: false,
  example: "back",
  placeholder: "Enter back for rear-facing assets",
  clean: cleanStringInput,
});
const where = input({
  label: "Where",
  comments: "The specific mounting location within the rack.",
  type: "string",
  required: false,
  model: whereOptions,
  example: "rack mounted",
  placeholder: "Select a mounting location",
  clean: cleanStringInput,
});
const xPos = input({
  label: "Horizontal Position",
  comments:
    "The horizontal position within a Rack Unit, from 0 to 2520 in increments of 252. Each increment is one tenth of the rack width, so 0 is flush-left and 1260 centers the left edge of the asset. Freshservice names this attribute x_pos on the way in and xpos on the way out.",
  type: "string",
  required: false,
  example: "1260",
  placeholder: "Enter horizontal position",
  clean: cleanNumberInput,
});
const depth = input({
  label: "Depth",
  comments: "The mounting depth of the asset. Freshservice defaults to half.",
  type: "string",
  required: false,
  model: depthOptions,
  example: "full",
  placeholder: "Select a mounting depth",
  clean: cleanStringInput,
});
const rackPlacement = structuredObjectInput({
  label: "Rack Placement",
  required: false,
  comments:
    "Rack, starting unit, size, orientation, horizontal position, and mounting depth. Supplying a rack makes Start At and Size mandatory.",
  inputs: { rack, rackId, startAt, size, orientation, where, xPos, depth },
});
const includeCols = input({
  label: "Include Columns",
  comments:
    "A comma-separated list of attributes to return for each asset. Freshservice ITAM supports only Include Columns, page and page size as list parameters.",
  type: "string",
  required: false,
  example: "name, device_id, rack",
  placeholder: "Enter attributes to include",
  clean: cleanStringInput,
});
export const createOrUpdateItamAssetInputs = {
  connection,
  type: input({
    ...type,
    required: true,
    clean: util.types.toString,
  }),
  name,
  serialNo,
  assetNo,
  serviceLevel,
  inService,
  deviceName,
  backConnectionType,
  vendor,
  objectCategory,
  tags,
  notes,
  rackPlacement,
  itamAssetsAdditionalFields,
};
export const deleteItamAssetInputs = {
  connection,
  assetId: input({
    ...assetId,
    comments: "The unique identifier of the asset to delete.",
  }),
};
export const getItamAssetInputs = {
  connection,
  assetId: input({
    ...assetId,
    comments: "The unique identifier of the asset to retrieve.",
  }),
  includeCols,
};
export const listItamAssetsInputs = {
  connection,
  fetchAll,
  pagination,
  includeCols,
};
export const updateItamAssetInputs = {
  connection,
  assetId: input({
    ...assetId,
    comments: "The unique identifier of the asset to update.",
  }),
  type,
  name,
  serialNo,
  assetNo,
  serviceLevel,
  inService,
  deviceName,
  backConnectionType,
  vendor,
  objectCategory,
  tags,
  notes,
  rackPlacement,
  itamAssetsAdditionalFields,
};
