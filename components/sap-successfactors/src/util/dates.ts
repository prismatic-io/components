export const parseSapDate = (value: unknown): Date | undefined => {
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }
  const msMatch = value.match(/\/Date\((-?\d+)(?:[+-]\d{4})?\)\//);
  if (msMatch) {
    const ms = Number(msMatch[1]);
    if (!Number.isNaN(ms)) {
      return new Date(ms);
    }
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const toSapFilterDatetime = (isoString: string): string => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ISO timestamp for SAP $filter: ${isoString}`);
  }
  const trimmed = date.toISOString().slice(0, 19);
  return `datetime'${trimmed}'`;
};
