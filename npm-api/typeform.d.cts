//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/interfaces/responses.d.ts
interface Response$1 {
  answers: Answer[];
  calculated: Calculated;
  hidden: Record<string, unknown>;
  landed_at: string;
  landing_id: string;
  metadata: Metadata;
  response_id: string;
  submitted_at: string;
  token: string;
  variables: Variable[];
}
interface Answer {
  field: Field;
  text?: string;
  type: string;
  boolean?: boolean;
  email?: string;
  number?: number;
  choices?: Choices;
  date?: string;
  choice?: Choice;
}
interface Choice {
  label: string;
}
interface Choices {
  labels: string[];
}
interface Field {
  id: string;
  ref: string;
  type: string;
}
interface Calculated {
  score: number;
}
interface Metadata {
  browser: string;
  network_id: string;
  platform: string;
  referer: string;
  user_agent: string;
}
interface Variable {
  key: string;
  number?: number;
  type: string;
  text?: string;
}
//#endregion
//#region src/interfaces/workspace.d.ts
interface Workspace {
  account_id: string;
  id: string;
  name: string;
  shared: boolean;
  forms: WorkspaceForm[];
  self: WorkspaceSelf[];
}
interface WorkspaceForm {
  count: number;
  href: string;
}
interface WorkspaceSelf {
  href: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "typeform";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/typeform/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        placeholder: string;
        label: string;
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteResponses: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includedResponseIds: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getAllResponseFiles: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFileFromResponse: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      responseId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      filename: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listResponses: import("@prismatic-io/spectral").ActionDefinition<{
      customQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        example: string;
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown> | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          search: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      id: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        items: Response$1[];
      };
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tag: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      secret: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      deliverySettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          url: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          enabled: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          formResponse: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          formResponsePartial: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        created_at: string;
        enabled: boolean;
        event_types: {
          form_response: boolean;
          form_response_partial: boolean;
        };
        form_id: string;
        id: string;
        tag: string;
        updated_at: string;
        url: string;
        verify_ssl: boolean;
      };
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tag: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    deleteAllInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tag: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        created_at: string;
        enabled: boolean;
        event_types: {
          form_response: boolean;
          form_response_partial: boolean;
        };
        form_id: string;
        id: string;
        tag: string;
        updated_at: string;
        url: string;
        verify_ssl: boolean;
      };
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        items: {
          created_at: string;
          enabled: boolean;
          event_types: {
            form_response: boolean;
            form_response_partial: boolean;
          };
          form_id: string;
          id: string;
          tag: string;
          updated_at: string;
          url: string;
          verify_ssl: boolean;
        }[];
      };
    }>;
    createForm: import("@prismatic-io/spectral").ActionDefinition<{
      title: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          theme: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          workspaceUrl: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          cuiSettings: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          fields: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          hidden: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          logic: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          setting: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          thankyouScreen: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          variables: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
          welcomeScreens: {
            label: string;
            example: string | undefined;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        title: string;
        language: string;
        fields: {}[];
        hidden: string[];
        variables: {
          score: number;
          price: number;
        };
        welcome_screens: {
          ref: string;
          title: string;
          properties: {
            description: string;
            show_button: boolean;
            button_text: string;
          };
          attachment: {
            type: string;
            href: {
              image: {
                value: string;
              };
              Pexels: {
                value: string;
              };
              Vimeo: {
                value: string;
              };
              YouTube: {
                value: string;
              };
            };
            scale: number;
            properties: {
              description: string;
            };
          };
          layout: {
            type: string;
            placement: string;
            attachment: {
              type: string;
              href: {
                image: {
                  value: string;
                };
                Pexels: {
                  value: string;
                };
                Vimeo: {
                  value: string;
                };
                YouTube: {
                  value: string;
                };
              };
              scale: number;
              properties: {
                description: string;
              };
            };
            viewport_overrides: {
              small: {
                type: string;
                placement: string;
              };
              large: {
                type: string;
                placement: string;
              };
            };
          };
        }[];
        thankyou_screens: {
          ref: string;
          title: string;
          type: string;
          properties: {
            show_button: boolean;
            button_text: string;
            button_mode: string;
            redirect_url: string;
            share_icons: boolean;
          };
          attachment: {
            type: string;
            href: {
              image: {
                value: string;
              };
              Pexels: {
                value: string;
              };
              Vimeo: {
                value: string;
              };
              YouTube: {
                value: string;
              };
            };
            scale: number;
            properties: {
              description: string;
            };
          };
          layout: {
            type: string;
            placement: string;
            attachment: {
              type: string;
              href: {
                image: {
                  value: string;
                };
                Pexels: {
                  value: string;
                };
                Vimeo: {
                  value: string;
                };
                YouTube: {
                  value: string;
                };
              };
              scale: number;
              properties: {
                description: string;
              };
            };
            viewport_overrides: {
              small: {
                type: string;
                placement: string;
              };
              large: {
                type: string;
                placement: string;
              };
            };
          };
        }[];
        logic: {
          type: string;
          ref: string;
          actions: {
            action: string;
            details: {
              to: {
                type: string;
                value: string;
              };
              target: {
                type: string;
                value: string;
              };
              value: {
                type: string;
              };
            };
            condition: {
              op: string;
              vars: {
                type: string;
                value: {};
              }[];
            };
          }[];
        }[];
        theme: {
          href: string;
        };
        workspace: {
          href: string;
        };
        _links: {
          display: string;
        };
        settings: {
          language: string;
          is_public: boolean;
          autosave_progress: boolean;
          progress_bar: string;
          show_progress_bar: boolean;
          show_typeform_branding: boolean;
          show_time_to_complete: boolean;
          show_number_of_submissions: boolean;
          show_cookie_consent: boolean;
          show_question_number: boolean;
          show_key_hint_on_choices: boolean;
          hide_navigation: boolean;
          meta: {
            title: string;
            allow_indexing: boolean;
            description: string;
            image: {
              href: string;
            };
          };
          redirect_after_submit_url: string;
          google_analytics: string;
          facebook_pixel: string;
          google_tag_manager: string;
          milestones: {
            field_ref: string;
            status: string;
            reason: string;
          }[];
          enrichment_in_renderer: {
            toggle: boolean;
            active: boolean;
          };
        };
        cui_settings: {
          avatar: string;
          is_typing_emulation_disabled: boolean;
          typing_emulation_speed: string;
        };
      };
    }>;
    updateForm: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      operations: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getForm: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        title: string;
        language: string;
        fields: {}[];
        hidden: string[];
        variables: {
          score: number;
          price: number;
        };
        welcome_screens: {
          ref: string;
          title: string;
          properties: {
            description: string;
            show_button: boolean;
            button_text: string;
          };
          attachment: {
            type: string;
            href: {
              image: {
                value: string;
              };
              Pexels: {
                value: string;
              };
              Vimeo: {
                value: string;
              };
              YouTube: {
                value: string;
              };
            };
            scale: number;
            properties: {
              description: string;
            };
          };
          layout: {
            type: string;
            placement: string;
            attachment: {
              type: string;
              href: {
                image: {
                  value: string;
                };
                Pexels: {
                  value: string;
                };
                Vimeo: {
                  value: string;
                };
                YouTube: {
                  value: string;
                };
              };
              scale: number;
              properties: {
                description: string;
              };
            };
            viewport_overrides: {
              small: {
                type: string;
                placement: string;
              };
              large: {
                type: string;
                placement: string;
              };
            };
          };
        }[];
        thankyou_screens: {
          ref: string;
          title: string;
          type: string;
          properties: {
            show_button: boolean;
            button_text: string;
            button_mode: string;
            redirect_url: string;
            share_icons: boolean;
          };
          attachment: {
            type: string;
            href: {
              image: {
                value: string;
              };
              Pexels: {
                value: string;
              };
              Vimeo: {
                value: string;
              };
              YouTube: {
                value: string;
              };
            };
            scale: number;
            properties: {
              description: string;
            };
          };
          layout: {
            type: string;
            placement: string;
            attachment: {
              type: string;
              href: {
                image: {
                  value: string;
                };
                Pexels: {
                  value: string;
                };
                Vimeo: {
                  value: string;
                };
                YouTube: {
                  value: string;
                };
              };
              scale: number;
              properties: {
                description: string;
              };
            };
            viewport_overrides: {
              small: {
                type: string;
                placement: string;
              };
              large: {
                type: string;
                placement: string;
              };
            };
          };
        }[];
        logic: {
          type: string;
          ref: string;
          actions: {
            action: string;
            details: {
              to: {
                type: string;
                value: string;
              };
              target: {
                type: string;
                value: string;
              };
              value: {
                type: string;
              };
            };
            condition: {
              op: string;
              vars: {
                type: string;
                value: {};
              }[];
            };
          }[];
        }[];
        theme: {
          href: string;
        };
        workspace: {
          href: string;
        };
        _links: {
          display: string;
        };
        settings: {
          language: string;
          is_public: boolean;
          autosave_progress: boolean;
          progress_bar: string;
          show_progress_bar: boolean;
          show_typeform_branding: boolean;
          show_time_to_complete: boolean;
          show_number_of_submissions: boolean;
          show_cookie_consent: boolean;
          show_question_number: boolean;
          show_key_hint_on_choices: boolean;
          hide_navigation: boolean;
          meta: {
            title: string;
            allow_indexing: boolean;
            description: string;
            image: {
              href: string;
            };
          };
          redirect_after_submit_url: string;
          google_analytics: string;
          facebook_pixel: string;
          google_tag_manager: string;
          milestones: {
            field_ref: string;
            status: string;
            reason: string;
          }[];
          enrichment_in_renderer: {
            toggle: boolean;
            active: boolean;
          };
        };
        cui_settings: {
          avatar: string;
          is_typing_emulation_disabled: boolean;
          typing_emulation_speed: string;
        };
      };
    }>;
    deleteForm: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    listForms: import("@prismatic-io/spectral").ActionDefinition<{
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          search: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          sortBy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          orderBy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workspaceId: {
        label: string;
        comments: string;
        required: false;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        items: {
          id: string;
          title: string;
          language: string;
          fields: {}[];
          hidden: string[];
          variables: {
            score: number;
            price: number;
          };
          welcome_screens: {
            ref: string;
            title: string;
            properties: {
              description: string;
              show_button: boolean;
              button_text: string;
            };
            attachment: {
              type: string;
              href: {
                image: {
                  value: string;
                };
                Pexels: {
                  value: string;
                };
                Vimeo: {
                  value: string;
                };
                YouTube: {
                  value: string;
                };
              };
              scale: number;
              properties: {
                description: string;
              };
            };
            layout: {
              type: string;
              placement: string;
              attachment: {
                type: string;
                href: {
                  image: {
                    value: string;
                  };
                  Pexels: {
                    value: string;
                  };
                  Vimeo: {
                    value: string;
                  };
                  YouTube: {
                    value: string;
                  };
                };
                scale: number;
                properties: {
                  description: string;
                };
              };
              viewport_overrides: {
                small: {
                  type: string;
                  placement: string;
                };
                large: {
                  type: string;
                  placement: string;
                };
              };
            };
          }[];
          thankyou_screens: {
            ref: string;
            title: string;
            type: string;
            properties: {
              show_button: boolean;
              button_text: string;
              button_mode: string;
              redirect_url: string;
              share_icons: boolean;
            };
            attachment: {
              type: string;
              href: {
                image: {
                  value: string;
                };
                Pexels: {
                  value: string;
                };
                Vimeo: {
                  value: string;
                };
                YouTube: {
                  value: string;
                };
              };
              scale: number;
              properties: {
                description: string;
              };
            };
            layout: {
              type: string;
              placement: string;
              attachment: {
                type: string;
                href: {
                  image: {
                    value: string;
                  };
                  Pexels: {
                    value: string;
                  };
                  Vimeo: {
                    value: string;
                  };
                  YouTube: {
                    value: string;
                  };
                };
                scale: number;
                properties: {
                  description: string;
                };
              };
              viewport_overrides: {
                small: {
                  type: string;
                  placement: string;
                };
                large: {
                  type: string;
                  placement: string;
                };
              };
            };
          }[];
          logic: {
            type: string;
            ref: string;
            actions: {
              action: string;
              details: {
                to: {
                  type: string;
                  value: string;
                };
                target: {
                  type: string;
                  value: string;
                };
                value: {
                  type: string;
                };
              };
              condition: {
                op: string;
                vars: {
                  type: string;
                  value: {};
                }[];
              };
            }[];
          }[];
          theme: {
            href: string;
          };
          workspace: {
            href: string;
          };
          _links: {
            display: string;
          };
          settings: {
            language: string;
            is_public: boolean;
            autosave_progress: boolean;
            progress_bar: string;
            show_progress_bar: boolean;
            show_typeform_branding: boolean;
            show_time_to_complete: boolean;
            show_number_of_submissions: boolean;
            show_cookie_consent: boolean;
            show_question_number: boolean;
            show_key_hint_on_choices: boolean;
            hide_navigation: boolean;
            meta: {
              title: string;
              allow_indexing: boolean;
              description: string;
              image: {
                href: string;
              };
            };
            redirect_after_submit_url: string;
            google_analytics: string;
            facebook_pixel: string;
            google_tag_manager: string;
            milestones: {
              field_ref: string;
              status: string;
              reason: string;
            }[];
            enrichment_in_renderer: {
              toggle: boolean;
              active: boolean;
            };
          };
          cui_settings: {
            avatar: string;
            is_typing_emulation_disabled: boolean;
            typing_emulation_speed: string;
          };
        }[];
      };
    }>;
    createAccountWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      accountId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workspaceName: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        account_id: string;
        forms: {
          count: number;
          href: string;
        }[];
        id: string;
        name: string;
        self: {
          href: string;
        }[];
        shared: boolean;
      };
    }>;
    listAccountWorkspaces: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          search: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      accountId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        items: Workspace[];
      };
    }>;
    createWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      workspaceName: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        account_id: string;
        forms: {
          count: number;
          href: string;
        }[];
        id: string;
        name: string;
        self: {
          href: string;
        }[];
        shared: boolean;
      };
    }>;
    updateWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      operations: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        account_id: string;
        forms: {
          count: number;
          href: string;
        }[];
        id: string;
        name: string;
        self: {
          href: string;
        }[];
        shared: boolean;
      };
    }>;
    deleteWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      id: {
        label: string;
        comments: string;
        dataSource: string;
        type: "string";
        example: string;
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    listWorkspaces: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            example: string;
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSize: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          search: {
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        items: {
          account_id: string;
          forms: {
            count: number;
            href: string;
          }[];
          id: string;
          name: string;
          self: {
            href: string;
          }[];
          shared: boolean;
        }[];
      };
    }>;
  };
  dataSources: {
    selectAccountWorkspaces: import("@prismatic-io/spectral").DataSourceDefinition<{
      accountId: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectForm: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectResponse: import("@prismatic-io/spectral").DataSourceDefinition<{
      formId: {
        dataSource: undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWorkspaces: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "typeform-oauth2";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
    };
  }, "typeform-oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "typeform-personal-token";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      personalToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "typeform-personal-token">)[];
  hooks: {
    error: (error: unknown) => unknown;
  };
  triggers: {
    formTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      formId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      secret: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      formResponse: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      formResponsePartial: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;