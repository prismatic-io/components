import {
  envelopeDocumentSchema,
  envelopeDocumentsResultSchema,
  envelopeSchema,
  envelopeSummarySchema,
  envelopeUpdateSummarySchema,
} from "./definitions";

export const listEnvelopeDocumentsOutputSchema = envelopeDocumentsResultSchema;

export const updateEnvelopeDocumentOutputSchema = envelopeDocumentSchema;

export const deleteEnvelopeDocumentOutputSchema = envelopeDocumentsResultSchema;

export const getEnvelopeOutputSchema = envelopeSchema;

export const createEnvelopeOutputSchema = envelopeSummarySchema;

export const updateEnvelopeOutputSchema = envelopeUpdateSummarySchema;
