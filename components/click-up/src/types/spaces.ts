interface SpaceDueDatesFeature {
  enabled: boolean;
  start_date: boolean;
  remap_due_dates: boolean;
  remap_closed_due_date: boolean;
}
interface SpaceFeatures {
  due_dates: SpaceDueDatesFeature;
  time_tracking: {
    enabled: boolean;
  };
  tags: {
    enabled: boolean;
  };
  time_estimates: {
    enabled: boolean;
  };
  checklists: {
    enabled: boolean;
  };
  custom_fields: {
    enabled: boolean;
  };
  remap_dependencies: {
    enabled: boolean;
  };
  dependency_warning: {
    enabled: boolean;
  };
  portfolios: {
    enabled: boolean;
  };
}
export interface SpaceBody {
  name: string;
  multiple_assignees: boolean;
  features: SpaceFeatures;
  color?: string;
  private?: boolean;
  admin_can_manage?: boolean;
}
