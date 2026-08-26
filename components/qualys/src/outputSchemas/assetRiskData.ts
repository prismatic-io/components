export const listAssetRiskDataOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      ip: { type: "string" },
      dns: { type: "string" },
      os: { type: "string" },
      truRiskScore: { type: "number" },
      vulnCounts: {
        type: "object",
        properties: {
          severity1: { type: "number" },
          severity2: { type: "number" },
          severity3: { type: "number" },
          severity4: { type: "number" },
          severity5: { type: "number" },
        },
      },
      lastScanDate: { type: "string" },
      derived: {
        type: "object",
        properties: {
          truRiskBand: { type: "string" },
          totalVulnerabilityCount: { type: "number" },
          daysSinceLastScan: { type: "number" },
        },
      },
    },
  },
};
