export interface SelectableResource {
  id: string;
  displayName: string;
}
export interface SelectableSettingStateSummary {
  id: string;
  settingName: string;
}
export interface SelectableDirectoryAudit {
  id: string;
  activityDisplayName: string;
}
export interface SelectableSubscription {
  id: string;
  resource: string;
  changeType: string;
}
