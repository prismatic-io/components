export interface QualysTag {
  id: number;
  name: string;
  color?: string;
  description?: string;
  criticalityScore?: number;
  ruleType?: string;
  ruleText?: string;
  parentTagId?: number;
  children?: unknown;
  created?: string;
  modified?: string;
}
export interface ParsedTagPage {
  tags: QualysTag[];
  hasMore: boolean;
  lastId?: number;
}
