export interface WorkItem {
  "@odata.type": "#KarbonService.WorkItemSummaryDTO";
  WorkItemKey: string;
  AssigneeEmailAddress: string;
  AssigneeKey: string;
  AssigneeName: string;
  Title: string;
  ClientKey: string;
  ClientName: string;
  ClientType: string;
  ClientUserDefinedIdentifier: string;
  RelatedClientGroupKey: string;
  ClientGroupKey: string;
  RelatedClientGroupName: string;
  StartDate: string;
  DueDate: string;
  DeadlineDate: string;
  CompletedDate: string;
  ToDoPeriod: string;
  WorkType: string;
  WorkStatus: string;
  PrimaryStatus: string;
  SecondaryStatus: string;
  WorkTemplateKey: string;
  WorkTemplateTile: string;
  WorkScheduleKey: string;
}
