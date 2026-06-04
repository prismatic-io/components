import { input } from "@prismatic-io/spectral";

export const companyId = input({
  label: "Company ID",
  type: "string",
  required: true,
  placeholder: "Enter Company ID",
  example: "097829",
  dataSource: "selectCompany",
  comments: "The unique identifier of the company.",
});

export const companyName = input({
  label: "Company Name",
  type: "string",
  required: true,
  example: "Acme Inc.",
  comments: "The name of the company",
});

export const updateCompanyName = input({
  label: "Company Name",
  type: "string",
  required: false,
  example: "Acme Inc.",
  comments: "The name of the company",
});

export const companyPhone = input({
  label: "Phone",
  type: "string",
  required: false,
  example: "(800) 555-1515",
  comments: "The phone number of the company.",
});

export const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  example: "www.example.com",
  comments: "The domain of the company",
});

export const updateDomain = input({
  label: "Domain",
  type: "string",
  required: false,
  example: "www.example.com",
  comments: "The domain of the company",
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  example: "Atherton",
  comments: "The city of the company",
});

export const industry = input({
  label: "Industry",
  type: "string",
  required: false,
  example: "Software",
  comments: "The industry of the company",
});

export const state = input({
  label: "State",
  type: "string",
  required: false,
  example: "California",
  comments: "The state of the company",
});
