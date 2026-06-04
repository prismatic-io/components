export interface ComparisonQueryFilter {
  $and: Record<string, Record<string, unknown>>[];
}
