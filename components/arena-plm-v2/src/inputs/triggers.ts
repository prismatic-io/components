import { input } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput } from "./common";
const pollIntegrationGuidInput = input({
  label: "Integration",
  type: "string",
  required: true,
  placeholder: "Select an outbound integration",
  comments:
    "The outbound integration whose event feed is polled. Arena publishes events per integration, so one must be configured in Arena before this trigger can run.",
  example: "OI1AB2CD3EF4GH5IJ6KL7MN1",
  dataSource: "integrationsPicklist",
  clean: toOptionalString,
});
const pollItemsReconciledInput = input({
  label: "Reconciliation Status",
  type: "string",
  required: false,
  comments:
    "Restricts each recurrence to events in one reconciliation state. Leave unset to receive events regardless of whether Arena has marked them reconciled.",
  model: [
    { label: "Any", value: "any" },
    { label: "Reconciled Only", value: "true" },
    { label: "Unreconciled Only", value: "false" },
  ],
  default: "any",
  example: "false",
  clean: toOptionalString,
});
const pollLookBackDateInput = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  placeholder: "Enter a start date/time",
  comments:
    "How far back the initial sync reaches, as an ISO 8601 date/time. Leave it unset and the first recurrence records its position without reporting anything, so only events created after that point are delivered. Consulted on the first recurrence only.",
  example: "2026-01-01T00:00:00Z",
  clean: toOptionalString,
});
export const pollChangesInputs = {
  connection: connectionInput,
  integrationGuid: pollIntegrationGuidInput,
  itemsReconciled: pollItemsReconciledInput,
  lookBackDate: pollLookBackDateInput,
};
