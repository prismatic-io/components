





import type {
  BatchStopJobRunResponse,
  GetJobRunResponse,
  ListCrawlersResponse,
  ListJobsResponse,
  ListTriggersResponse,
  StartCrawlerResponse,
  StartJobRunResponse,
  StartTriggerResponse,
  StopCrawlerResponse,
  StopTriggerResponse,
} from "@aws-sdk/client-glue";






export const getJobRunExamplePayload = {
  data: {
    JobRun: {
      Id: "jr_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      Attempt: 0,
      JobName: "my-etl-job",
      StartedOn: new Date("2026-03-15T10:30:00.000Z"),
      LastModifiedOn: new Date("2026-03-15T10:35:00.000Z"),
      CompletedOn: new Date("2026-03-15T10:35:00.000Z"),
      JobRunState: "SUCCEEDED",
      Arguments: {
        "--job-language": "python",
      },
      PredecessorRuns: [],
      AllocatedCapacity: 10,
      ExecutionTime: 300,
      Timeout: 2880,
      MaxCapacity: 10.0,
      WorkerType: "G.1X",
      NumberOfWorkers: 10,
      LogGroupName: "/aws-glue/jobs",
      GlueVersion: "3.0",
      ExecutionClass: "STANDARD",
    },
  } as GetJobRunResponse,
};






export const listCrawlersExamplePayload = {
  data: {
    CrawlerNames: ["s3-data-crawler", "rds-inventory-crawler"],
  } as ListCrawlersResponse,
};






export const listJobsExamplePayload = {
  data: {
    JobNames: ["my-etl-job", "daily-data-transform"],
  } as ListJobsResponse,
};






export const listTriggersExamplePayload = {
  data: {
    TriggerNames: ["scheduled-etl-trigger", "on-demand-transform-trigger"],
  } as ListTriggersResponse,
};







export const startCrawlerExamplePayload = {
  data: {} as StartCrawlerResponse,
};






export const startJobRunExamplePayload = {
  data: {
    JobRunId: "jr_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  } as StartJobRunResponse,
};






export const startTriggerExamplePayload = {
  data: {
    Name: "scheduled-etl-trigger",
  } as StartTriggerResponse,
};







export const stopCrawlerExamplePayload = {
  data: {} as StopCrawlerResponse,
};






export const stopJobRunExamplePayload = {
  data: {
    SuccessfulSubmissions: [
      {
        JobName: "my-etl-job",
        JobRunId: "jr_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      },
    ],
    Errors: [],
  } as BatchStopJobRunResponse,
};






export const stopTriggerExamplePayload = {
  data: {
    Name: "scheduled-etl-trigger",
  } as StopTriggerResponse,
};
