import { input, util } from "@prismatic-io/spectral";
import { cleanTimestamp } from "../../util";

export const remoteCreatedAtInput = input({
  label: "Remote Created At",
  type: "string",
  required: true,
  clean: cleanTimestamp,
  comments: "Time the company was created by you",
});

export const nameInput = input({
  label: "Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Name of the company",
});

export const monthlySpendInput = input({
  label: "Monthly Spend",
  type: "string",
  clean: util.types.toNumber,
  comments: "How much revenue the company generates for your business",
});

export const planInput = input({
  label: "Plan",
  type: "string",
  clean: util.types.toString,
  comments: "Name of the plan associated with the company",
});

export const sizeInput = input({
  label: "Size",
  type: "string",
  clean: util.types.toNumber,
  comments: "Number of employees in this company",
});

export const websiteInput = input({
  label: "Website",
  type: "string",
  clean: util.types.toString,
  comments: "The URL for this company's website",
});

export const industryInput = input({
  label: "Industry",
  type: "string",
  clean: util.types.toString,
  comments: "The industry this company operates in",
});
