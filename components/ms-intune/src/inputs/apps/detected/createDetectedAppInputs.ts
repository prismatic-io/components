import { input } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../../util";

const displayName = input({
  label: "Display Name",
  comments: "Name of the discovered application.",
  example: "Display Name value",
  placeholder: "Display Name value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const version = input({
  label: "Version",
  comments: "Version of the discovered application.",
  example: "Version value",
  placeholder: "Version value",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const sizeInByte = input({
  label: "Size In Byte",
  comments: "Discovered application size in bytes.",
  example: "10",
  placeholder: "10",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});

const deviceCount = input({
  label: "Device Count",
  comments: "The number of devices that have installed this application.",
  example: "11",
  placeholder: "11",
  type: "string",
  required: false,
  clean: cleanNumberInput,
});

const publisher = input({
  label: "Publisher",
  comments:
    "Indicates the publisher of the discovered application. For example: 'Microsoft'. The default value is an empty string.",
  example: "Microsoft",
  placeholder: "Microsoft",
  default: "",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

const platform = input({
  label: "Platform",
  comments:
    "Indicates the operating system / platform of the discovered application. Some possible values are Windows, iOS, macOS. The default value is unknown (0).",
  model: [
    {
      label: "Unknown",
      value: "unknown",
    },
    {
      label: "Windows",
      value: "windows",
    },
    {
      label: "Windows Mobile",
      value: "windowsMobile",
    },
    {
      label: "Windows Holographic",
      value: "windowsHolographic",
    },
    {
      label: "iOS",
      value: "ios",
    },
    {
      label: "macOS",
      value: "macOS",
    },
    {
      label: "Chrome OS",
      value: "chromeOS",
    },
    {
      label: "Android for Work",
      value: "androidOSP",
    },
    {
      label: "Android Device Administrator",
      value: "androidDeviceAdministrator",
    },
    {
      label: "Android Work Profile",
      value: "androidWorkProfile",
    },
    {
      label: "Android Dedicated and Fully Managed",
      value: "androidDedicatedAndFullyManaged",
    },
    {
      label: "Unknown Future Value",
      value: "unknownFutureValue",
    },
  ],
  default: "unknown",
  type: "string",
  required: false,
  clean: cleanStringInput,
});

export default {
  displayName,
  version,
  sizeInByte,
  deviceCount,
  publisher,
  platform,
};
