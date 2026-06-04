import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { jsonInputClean, valueListInputClean } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const region = input({
  label: "Region",
  type: "string",
  required: true,
  default: "api",
  comments: "The region of the Segment API to use.",
  model: [
    { label: "US", value: "api" },
    { label: "EU", value: "eu1.api" },
  ],
  clean: util.types.toString,
});

export const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The Function type.",
  model: [
    { label: "DESTINATION", value: "DESTINATION" },
    { label: "INSERT_DESTINATION", value: "INSERT_DESTINATION" },
    { label: "SOURCE", value: "SOURCE" },
  ],
  clean: util.types.toString,
});

export const warehouseId = input({
  label: "Warehouse ID",
  type: "string",
  required: true,
  comments: "The id of the warehouse to retrieve.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
  dataSource: "warehouses",
});

export const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  comments: "The id of the user to retrieve.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const transformationId = input({
  label: "Transformation ID",
  type: "string",
  required: true,
  comments: "The id of the transformation to retrieve.",
  example: "pHrD51Ds35Zjfka84yXQE6",
  clean: util.types.toString,
  dataSource: "selectTransformation",
});

export const metadataId = input({
  label: "Metadata ID",
  type: "string",
  required: true,
  comments: "The Warehouse metadata to use.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
});

export const destinationMetadataId = input({
  label: "Destination Metadata ID",
  type: "string",
  required: true,
  comments: "The Destination metadata ID to use.",
  example: "54521fd525e721e32a72ee91",
  clean: util.types.toString,
  dataSource: "selectDestinationMetadata",
});

export const warehouseMetadataId = input({
  label: "Warehouse Metadata ID",
  type: "string",
  required: true,
  comments: "The Warehouse metadata ID to use.",
  example: "55d3d3aea3c",
  clean: util.types.toString,
  dataSource: "selectWarehouseMetadata",
});

export const sourceMetadataId = input({
  label: "Source Metadata ID",
  type: "string",
  required: true,
  comments: "The Source metadata ID to use.",
  example: "1bow82lmk",
  clean: util.types.toString,
  dataSource: "selectSourceMetadata",
});

export const sourceId = input({
  label: "Source ID",
  type: "string",
  required: true,
  comments: "The Source ID to use.",
  example: "kjU72LCJexvrqL7G4TMHHN",
  clean: util.types.toString,
  dataSource: "sources",
});

export const destinationId = input({
  label: "Destination ID",
  type: "string",
  required: true,
  comments: "The Destination ID to use.",
  example: "fP7qoQw2HTWt9WdMr718gn",
  clean: util.types.toString,
  dataSource: "destination",
});

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The Subscription ID to use.",
  example: "iUyx2UdPSvp4uJtYAhjTup",
  clean: util.types.toString,
  dataSource: "selectSubscription",
});

export const actionId = input({
  label: "Action ID",
  type: "string",
  required: true,
  comments: "The associated action id the subscription should trigger.",
  example: "jiMz7MfHNeHmUckzRnUGkU",
  clean: util.types.toString,
});

export const functionId = input({
  label: "Function ID",
  type: "string",
  required: true,
  comments: "The function ID to use.",
  example: "sfnc_wXzcDGFR3KmjLDrtSawNHf",
  clean: util.types.toString,
  dataSource: "selectFunction",
});

export const count = input({
  label: "Count",
  type: "string",
  required: true,
  default: "50",
  comments: "The number of results to return.",
  example: "50",
  clean: util.types.toString,
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  comments: "The page to request.",
  example: "MA==",
  clean: util.types.toString,
});

export const code = input({
  label: "Code",
  type: "code",
  language: "javascript",
  required: false,
  comments: "The Function code.",
  example:
    "// Learn more about source functions API at https://segment.com/docs/connections/sources/source-functions",
  clean: util.types.toString,
});

export const logoUrl = input({
  label: "Logo URL",
  type: "string",
  required: false,
  comments: "A logo for this Function.",
  example: "https://placekitten.com/200/139",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A description for this Function.",
  example: "My source function",
  clean: util.types.toString,
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "An optional human-readable name to associate with this Warehouse.",
  example: "Example Warehouse",
  clean: util.types.toString,
});

export const trigger = input({
  label: "Trigger",
  type: "string",
  required: false,
  comments: "The fql statement.",
  example: 'type = "track"',
  clean: util.types.toString,
});

export const modelId = input({
  label: "Trigger",
  type: "string",
  required: false,
  comments:
    "When creating a Reverse ETL connection, indicates the Model being used to extract data.",
  example: "model-id-example",
  clean: util.types.toString,
});

export const enabled = input({
  label: "Enabled",
  type: "string",
  required: false,
  default: "",
  comments: "Enable to allow this Warehouse to receive data.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "", value: "" },
  ],
  clean: util.types.toString,
});

export const settings = input({
  label: "Settings",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments:
    "A key-value object that contains instance-specific settings for a Warehouse. You can find the full list of Warehouse metadata and related settings information in the /catalog/warehouses endpoint.",
  example: "host: 'aws.redshift.dev'",
  clean: (value: unknown) =>
    util.types.keyValPairListToObject(value as KeyValuePair<unknown>[]),
});

export const slug = input({
  label: "Slug",
  type: "string",
  required: false,
  comments: "The slug by which to identify the Source in the Segment app.",
  example: "my-test-source-rhpd18",
  clean: util.types.toString,
});

export const userIds = input({
  label: "User IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The ids of the users to remove.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "123213",
});

export const invites = input({
  label: "Invites",
  type: "code",
  language: "json",
  comments: "The list of invites.",
  default: JSON.stringify(
    [
      {
        email: "foo@example.com",
        permissions: [
          {
            roleId: "1WDUuRLxv84rrfCNUwvkrRtkxnS",
            resources: [
              {
                id: "9aQ1Lj62S4bomZKLF4DPqW",
                type: "WORKSPACE",
              },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const ifInput = input({
  label: "If",
  type: "string",
  required: false,
  comments: "If statement (FQL) to match events.",
  example: 'event="my-event"',
  clean: util.types.toString,
});

export const newEventName = input({
  label: "New Event Name",
  type: "string",
  required: false,
  comments:
    "Optional new event name for renaming events. Works only for 'track' event type.",
  example: "my-updated-event",
  clean: util.types.toString,
});

export const propertyRenames = input({
  label: "Property Renames",
  type: "code",
  language: "json",
  comments: "Optional array for renaming properties collected by your events.",
  default: JSON.stringify(
    [
      {
        newName: "new-property",
        oldName: "old-property",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const propertyValueTransformations = input({
  label: "Property Value Transformations",
  type: "code",
  language: "json",
  comments: "Optional array for renaming properties collected by your events.",
  default: JSON.stringify(
    [
      {
        propertyPaths: ["properties.another-property"],
        propertyValue: "another property value",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const fqlDefinedProperties = input({
  label: "FQL Defined Properties",
  type: "code",
  language: "json",
  comments:
    "Optional array for defining new properties in FQL. Currently limited to 1 property.",
  clean: jsonInputClean,
  required: false,
});

export const granularity = input({
  label: "Granularity",
  type: "string",
  required: true,
  comments: "The size of each bucket in the requested window.",
  model: [
    { label: "DAY", value: "DAY" },
    { label: "HOUR", value: "HOUR" },
    { label: "MINUTE", value: "MINUTE" },
  ],
  clean: util.types.toString,
});

export const startTime = input({
  label: "Start Time",
  type: "string",
  required: true,
  comments:
    "The ISO8601 formatted timestamp that corresponds to the beginning of the requested time frame, inclusive.",
  example: "2020-01-01T00:00:00.000Z",
  clean: util.types.toString,
});

export const endTime = input({
  label: "End Time",
  type: "string",
  required: true,
  comments:
    "The ISO8601 formatted timestamp that corresponds to the end of the requested time frame, noninclusive. Segment recommends that you lag queries 1 minute behind clock time to reduce the risk for latency to impact the counts.",
  example: "2020-01-01T00:00:00.000Z",
  clean: util.types.toString,
});

export const groupBy = input({
  label: "Group By",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The ids of the users to remove.",
  model: [
    { label: "eventName", value: "eventName" },
    { label: "eventType", value: "eventType" },
    { label: "source", value: "source" },
  ],
  clean: valueListInputClean,
});

export const eventName = input({
  label: "Event Name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of strings which filters the results to the given EventNames.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const sourceIds = input({
  label: "Source IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of strings which filters the results to the given EventNames.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const eventType = input({
  label: "Event Type",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of strings which filters the results to the given EventNames.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const appVersion = input({
  label: "App Version",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "A list of strings which filters the results to the given AppVersions.",
  default: ["000xxx"],
  clean: valueListInputClean,
});

export const functionSettings = input({
  label: "Function Settings",
  type: "code",
  language: "json",
  comments: "The list of settings for this Function.",
  default: JSON.stringify(
    [
      {
        name: "apiKey",
        label: "api key",
        type: "STRING",
        description: "api key",
        required: false,
        sensitive: false,
      },
      {
        name: "mySecret",
        label: "my secret key",
        type: "STRING",
        description: "secret key",
        required: false,
        sensitive: true,
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});
