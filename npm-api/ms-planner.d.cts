//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region node_modules/@microsoft/microsoft-graph-types/microsoft-graph.d.ts
type NullableOption<T> = T | null;
type PlannerContainerType = "group" | "unknownFutureValue" | "roster";
type PlannerPreviewType = "automatic" | "noPreview" | "checklist" | "description" | "reference";
interface Entity {
  // The unique idenfier for an entity. Read-only.
  id?: string;
}
interface PlannerBucket extends Entity {
  // Name of the bucket.
  name?: string;
  /**
   * Hint used to order items of this type in a list view. For details about the supported format, see Using order hints in
   * Planner.
   */
  orderHint?: NullableOption<string>; // Plan ID to which the bucket belongs.
  planId?: NullableOption<string>; // Read-only. Nullable. The collection of tasks in the bucket.
  tasks?: NullableOption<PlannerTask[]>;
}
interface PlannerPlan extends Entity {
  /**
   * Identifies the container of the plan. Specify only the url, the containerId and type, or all properties. After it is
   * set, this property can’t be updated. Required.
   */
  container?: NullableOption<PlannerPlanContainer>; // Read-only. The user who created the plan.
  createdBy?: NullableOption<IdentitySet>;
  /**
   * Read-only. Date and time at which the plan is created. The Timestamp type represents date and time information using
   * ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  createdDateTime?: NullableOption<string>;
  owner?: NullableOption<string>; // Required. Title of the plan.
  title?: string; // Read-only. Nullable. Collection of buckets in the plan.
  buckets?: NullableOption<PlannerBucket[]>; // Read-only. Nullable. Additional details about the plan.
  details?: NullableOption<PlannerPlanDetails>; // Read-only. Nullable. Collection of tasks in the plan.
  tasks?: NullableOption<PlannerTask[]>;
}
interface PlannerTask extends Entity {
  // Number of checklist items with value set to false, representing incomplete items.
  activeChecklistItemCount?: NullableOption<number>; // The categories to which the task has been applied. See applied Categories for possible values.
  appliedCategories?: NullableOption<PlannerAppliedCategories>; // Hint used to order items of this type in a list view. The format is defined as outlined here.
  assigneePriority?: NullableOption<string>; // The set of assignees the task is assigned to.
  assignments?: NullableOption<PlannerAssignments>;
  /**
   * Bucket ID to which the task belongs. The bucket needs to be in the plan that the task is in. It is 28 characters long
   * and case-sensitive. Format validation is done on the service.
   */
  bucketId?: NullableOption<string>; // Number of checklist items that are present on the task.
  checklistItemCount?: NullableOption<number>; // Identity of the user that completed the task.
  completedBy?: NullableOption<IdentitySet>;
  /**
   * Read-only. Date and time at which the 'percentComplete' of the task is set to '100'. The Timestamp type represents date
   * and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is
   * 2014-01-01T00:00:00Z
   */
  completedDateTime?: NullableOption<string>; // Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group.
  conversationThreadId?: NullableOption<string>; // Identity of the user that created the task.
  createdBy?: NullableOption<IdentitySet>;
  /**
   * Read-only. Date and time at which the task is created. The Timestamp type represents date and time information using
   * ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  createdDateTime?: NullableOption<string>;
  /**
   * Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format
   * and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  dueDateTime?: NullableOption<string>; // Read-only. Value is true if the details object of the task has a non-empty description and false otherwise.
  hasDescription?: NullableOption<boolean>; // Hint used to order items of this type in a list view. The format is defined as outlined here.
  orderHint?: NullableOption<string>; // Percentage of task completion. When set to 100, the task is considered completed.
  percentComplete?: NullableOption<number>; // Plan ID to which the task belongs.
  planId?: NullableOption<string>;
  /**
   * This sets the type of preview that shows up on the task. The possible values are: automatic, noPreview, checklist,
   * description, reference.
   */
  previewType?: NullableOption<PlannerPreviewType>;
  /**
   * Priority of the task. The valid range of values is between 0 and 10, with the increasing value being lower priority (0
   * has the highest priority and 10 has the lowest priority). Currently, Planner interprets values 0 and 1 as 'urgent', 2,
   * 3 and 4 as 'important', 5, 6, and 7 as 'medium', and 8, 9, and 10 as 'low'. Additionally, Planner sets the value 1 for
   * 'urgent', 3 for 'important', 5 for 'medium', and 9 for 'low'.
   */
  priority?: NullableOption<number>; // Number of external references that exist on the task.
  referenceCount?: NullableOption<number>;
  /**
   * Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format
   * and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  startDateTime?: NullableOption<string>; // Title of the task.
  title?: string; // Read-only. Nullable. Used to render the task correctly in the task board view when grouped by assignedTo.
  assignedToTaskBoardFormat?: NullableOption<PlannerAssignedToTaskBoardTaskFormat>; // Read-only. Nullable. Used to render the task correctly in the task board view when grouped by bucket.
  bucketTaskBoardFormat?: NullableOption<PlannerBucketTaskBoardTaskFormat>; // Read-only. Nullable. Additional details about the task.
  details?: NullableOption<PlannerTaskDetails>; // Read-only. Nullable. Used to render the task correctly in the task board view when grouped by progress.
  progressTaskBoardFormat?: NullableOption<PlannerProgressTaskBoardTaskFormat>;
}
interface PlannerAssignedToTaskBoardTaskFormat extends Entity {
  /**
   * Dictionary of hints used to order tasks on the AssignedTo view of the Task Board. The key of each entry is one of the
   * users the task is assigned to and the value is the order hint. The format of each value is defined as outlined here.
   */
  orderHintsByAssignee?: NullableOption<PlannerOrderHintsByAssignee>;
  /**
   * Hint value used to order the task on the AssignedTo view of the Task Board when the task is not assigned to anyone, or
   * if the orderHintsByAssignee dictionary does not provide an order hint for the user the task is assigned to. The format
   * is defined as outlined here.
   */
  unassignedOrderHint?: NullableOption<string>;
}
interface PlannerBucketTaskBoardTaskFormat extends Entity {
  /**
   * Hint used to order tasks in the bucket view of the task board. For details about the supported format, see Using order
   * hints in Planner.
   */
  orderHint?: NullableOption<string>;
}
interface PlannerPlanDetails extends Entity {
  // An object that specifies the descriptions of the 25 categories that can be associated with tasks in the plan.
  categoryDescriptions?: NullableOption<PlannerCategoryDescriptions>;
  /**
   * Set of user IDs that this plan is shared with. If you are leveraging Microsoft 365 groups, use the Groups API to manage
   * group membership to share the group's plan. You can also add existing members of the group to this collection, although
   * it is not required for them to access the plan owned by the group.
   */
  sharedWith?: NullableOption<PlannerUserIds>;
}
interface PlannerProgressTaskBoardTaskFormat extends Entity {
  /**
   * Hint value used to order the task on the progress view of the task board. For details about the supported format, see
   * Using order hints in Planner.
   */
  orderHint?: NullableOption<string>;
}
interface PlannerTaskDetails extends Entity {
  // The collection of checklist items on the task.
  checklist?: NullableOption<PlannerChecklistItems>; // Description of the task.
  description?: NullableOption<string>;
  /**
   * This sets the type of preview that shows up on the task. The possible values are: automatic, noPreview, checklist,
   * description, reference. When set to automatic the displayed preview is chosen by the app viewing the task.
   */
  previewType?: NullableOption<PlannerPreviewType>; // The collection of references on the task.
  references?: NullableOption<PlannerExternalReferences>;
}
// tslint:disable-next-line: interface-name
interface Identity {
  /**
   * The display name of the identity. Note that this might not always be available or up to date. For example, if a user
   * changes their display name, the API might show the new value in a future response, but the items associated with the
   * user won't show up as having changed when using delta.
   */
  displayName?: NullableOption<string>; // Unique identifier for the identity.
  id?: NullableOption<string>;
}
// tslint:disable-next-line: interface-name
interface IdentitySet {
  // Optional. The application associated with this action.
  application?: NullableOption<Identity>; // Optional. The device associated with this action.
  device?: NullableOption<Identity>; // Optional. The user associated with this action.
  user?: NullableOption<Identity>;
}
// tslint:disable-next-line: no-empty-interface
interface PlannerAppliedCategories {}
// tslint:disable-next-line: no-empty-interface
interface PlannerAssignments {}
interface PlannerCategoryDescriptions {
  // The label associated with Category 1
  category1?: NullableOption<string>; // The label associated with Category 10
  category10?: NullableOption<string>; // The label associated with Category 11
  category11?: NullableOption<string>; // The label associated with Category 12
  category12?: NullableOption<string>; // The label associated with Category 13
  category13?: NullableOption<string>; // The label associated with Category 14
  category14?: NullableOption<string>; // The label associated with Category 15
  category15?: NullableOption<string>; // The label associated with Category 16
  category16?: NullableOption<string>; // The label associated with Category 17
  category17?: NullableOption<string>; // The label associated with Category 18
  category18?: NullableOption<string>; // The label associated with Category 19
  category19?: NullableOption<string>; // The label associated with Category 2
  category2?: NullableOption<string>; // The label associated with Category 20
  category20?: NullableOption<string>; // The label associated with Category 21
  category21?: NullableOption<string>; // The label associated with Category 22
  category22?: NullableOption<string>; // The label associated with Category 23
  category23?: NullableOption<string>; // The label associated with Category 24
  category24?: NullableOption<string>; // The label associated with Category 25
  category25?: NullableOption<string>; // The label associated with Category 3
  category3?: NullableOption<string>; // The label associated with Category 4
  category4?: NullableOption<string>; // The label associated with Category 5
  category5?: NullableOption<string>; // The label associated with Category 6
  category6?: NullableOption<string>; // The label associated with Category 7
  category7?: NullableOption<string>; // The label associated with Category 8
  category8?: NullableOption<string>; // The label associated with Category 9
  category9?: NullableOption<string>;
}
// tslint:disable-next-line: no-empty-interface
interface PlannerChecklistItems {}
// tslint:disable-next-line: no-empty-interface
interface PlannerExternalReferences {}
// tslint:disable-next-line: no-empty-interface
interface PlannerOrderHintsByAssignee {}
interface PlannerPlanContainer {
  // The identifier of the resource that contains the plan. Optional.
  containerId?: NullableOption<string>;
  /**
   * The type of the resource that contains the plan. For supported types, see the previous table. Possible values are:
   * group, unknownFutureValue, roster. Note that you must use the Prefer: include-unknown-enum-members request header to
   * get the following value in this evolvable enum: roster. Optional.
   */
  type?: NullableOption<PlannerContainerType>; // The full canonical URL of the container. Optional.
  url?: NullableOption<string>;
}
// tslint:disable-next-line: no-empty-interface
interface PlannerUserIds {}
//#endregion
//#region src/types/graph.d.ts
interface Etagged {
  "@odata.etag"?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-planner";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-planner/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTasksInPlan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTasksInBucket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTasksForUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PlannerTask & Etagged;
    }>;
    createTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketId: {
        comments: string;
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        dataSource: string;
        example: string;
        placeholder: string;
      };
      assignment: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assignTo: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
          unassign: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      schedule: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDateTime: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dueDateTime: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      percentComplete: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      categories: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          applyCategories: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            model: {
              label: string;
              value: string;
            }[];
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
          removeCategories: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            model: {
              label: string;
              value: string;
            }[];
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      description: {
        label: string;
        type: "text";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
      };
      bucketId: {
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        dataSource: string;
        example: string;
        placeholder: string;
      };
      assignment: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          assignTo: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
          unassign: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      schedule: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDateTime: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          dueDateTime: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      priority: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      percentComplete: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      categories: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          applyCategories: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            model: {
              label: string;
              value: string;
            }[];
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
          removeCategories: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            model: {
              label: string;
              value: string;
            }[];
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      conversationThreadId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTaskDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PlannerTaskDetails & Etagged;
    }>;
    updateTaskDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        type: "text";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      checklist: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addItems: {
            label: string;
            type: "string";
            required: false;
            collection: "keyvaluelist";
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => {
              title: string;
              isChecked: boolean;
            }[] | undefined;
          };
          removeItemIds: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      references: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addReferences: {
            label: string;
            type: "string";
            required: false;
            collection: "keyvaluelist";
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => {
              url: string;
              alias: string;
            }[] | undefined;
          };
          removeReferenceUrls: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      previewType: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      etag: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    completeTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    assignTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      assignment: {
        comments: string;
        label: string;
        required: boolean;
        inputs: {
          assignTo: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
          unassign: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
        type: "structuredObject";
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    moveTaskToBucket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listBucketsInPlan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getBucket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PlannerBucket & Etagged;
    }>;
    createBucket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateBucket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteBucket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listPlansInGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        dataSource: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listPlansForUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getPlan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PlannerPlan & Etagged;
    }>;
    createPlan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        dataSource: string;
        example: string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updatePlan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deletePlan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getPlanDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PlannerPlanDetails & Etagged;
    }>;
    updatePlanDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryDescriptions: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => Record<string, string> | undefined;
      };
      sharing: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          shareWith: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
          unshareWith: {
            label: string;
            type: "string";
            required: false;
            collection: "valuelist";
            dataSource: string;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      etag: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      planId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPlan: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBucket: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      planId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTask: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      planId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: any[];
}>;
export = _default;