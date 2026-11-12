import {
  envelopeDocumentSchema,
  envelopeTemplateResultsSchema,
  envelopeTemplateSchema,
  templateDocumentsResultSchema,
  templateSummarySchema,
  templateUpdateSummarySchema,
} from "./definitions";

export const createTemplateOutputSchema = templateSummarySchema;

export const getTemplateOutputSchema = envelopeTemplateSchema;

export const listTemplatesOutputSchema = {
  type: ["object", "array"],
  properties: envelopeTemplateResultsSchema.properties,
  items: envelopeTemplateSchema,
  required: [],
  additionalProperties: true,
};

export const updateTemplateOutputSchema = templateUpdateSummarySchema;

export const listTemplateDocumentsOutputSchema = templateDocumentsResultSchema;

export const updateTemplateDocumentOutputSchema = envelopeDocumentSchema;

export const deleteTemplateDocumentOutputSchema = templateDocumentsResultSchema;
