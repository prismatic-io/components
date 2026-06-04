import type { Features } from "./Features";

export interface Body {
  name: string;
  multiple_assignees: boolean;
  color?: string;
  private?: boolean;
  admin_can_manage?: boolean;
  features: Features;
}
