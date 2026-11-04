//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "zendesk-sell";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/zendesk-sell/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      isOrganization: {
        label: string;
        comments: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressCity: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressPostalCode: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressCountry: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressState: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      otherAddresses: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          billingAddress: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingAddress: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          customerStatus: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          prospectStatus: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ids: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          creatorId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          contactId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
          sortBy: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          inclusive: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      isOrganization: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          fax: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          twitter: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          facebook: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          linkedin: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          skype: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          website: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      addresses: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          address: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          billingAddress: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingAddress: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          customerStatus: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          prospectStatus: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          description: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          industry: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          contactId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
          parentOrganizationId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          fax: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          twitter: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          facebook: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          linkedin: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          skype: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          website: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      addresses: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          address: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          billingAddress: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingAddress: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          customerStatus: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          prospectStatus: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          description: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          industry: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          contactId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
          parentOrganizationId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    upsertContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      isOrganization: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      addresses: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressCity: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressPostalCode: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressCountry: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          billingAddress: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingAddress: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      filterableCustomFields: {
        label: string;
        comments: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          customerStatus: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          prospectStatus: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          inclusive: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          creatorId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          contactId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
          parentOrganizationId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            dataSource: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAccountDetails: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceType: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listNotes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      resourceType: {
        label: string;
        comments: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      creatorId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          includes: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          q: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getNote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createNote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      content: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceType: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tags: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: false;
      };
      isImportant: {
        label: string;
        comments: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateNote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      content: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceType: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tags: {
        label: string;
        comments: string;
        example: string;
        type: "string";
        collection: "valuelist";
        required: false;
      };
      isImportant: {
        label: string;
        comments: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteNote: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPipelines: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      name: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      disabled: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sortBy: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            type: "string";
            required: false;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      type: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      completed: {
        label: string;
        comments: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          q: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          resourceType: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          resourceId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ids: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          creatorId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            placeholder: string;
            example: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          overdue: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: string) => string;
          };
          remind: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
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
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      content: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceType: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dueDate: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      completed: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      remindAt: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      content: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceType: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dueDate: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      completed: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      remindAt: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLeads: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      organizationName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      status: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      creatorId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressCity: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressPostalCode: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressState: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressCountry: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          inclusive: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      organizationName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        placeholder: string;
        comments: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      address: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          fax: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          twitter: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          facebook: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          linkedin: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          skype: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          website: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          status: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          description: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          industry: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            placeholder: string;
            example: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          sourceId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          unqualifiedReasonId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      organizationName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        placeholder: string;
        comments: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      address: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          fax: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          twitter: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          facebook: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          linkedin: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          skype: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          website: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          status: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          description: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          industry: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            placeholder: string;
            example: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          sourceId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          unqualifiedReasonId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    upsertLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      organizationName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        placeholder: string;
        comments: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          mobile: {
            label: string;
            placeholder: string;
            comments: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      addresses: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressCity: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressPostalCode: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressCountry: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      filterableCustomFields: {
        label: string;
        comments: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          status: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          inclusive: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          creatorId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownerId: {
            label: string;
            placeholder: string;
            example: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          sourceId: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteLead: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDeals: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      name: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ids: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      creatorId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      organizationId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sourceId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      stageId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          includes: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          inclusive: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          value: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          hot: {
            label: string;
            comments: string;
            placeholder: string;
            type: "string";
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          estimatedCloseDate: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      includes: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        placeholder: string;
        comments: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      currency: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        example: string;
      };
      hot: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastStageChangeAt: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      addedAt: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      estimatedCloseDate: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customizedWinLikelihood: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      stageId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sourceId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lossReasonId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      unqualifiedReasonId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      currency: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFields: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
      };
      tags: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        example: string;
      };
      hot: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastStageChangeAt: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      addedAt: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      estimatedCloseDate: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customizedWinLikelihood: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ownerId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      stageId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sourceId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lossReasonId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      unqualifiedReasonId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDeal: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listStages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      name: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      active: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pipelineId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ids: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sortBy: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      ids: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dealId: {
        label: string;
        placeholder: string;
        comments: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sortBy: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          perPage: {
            label: string;
            comments: string;
            placeholder: string;
            example: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dealId: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      discount: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      discount: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        placeholder: string;
        example: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string;
      };
      version: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
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
    getContactsStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomFieldsStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDealsStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLeadsStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getNotesStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrdersStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductsStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStagesStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTasksStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      position: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
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
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
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
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
        example: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth">[];
  dataSources: {
    selectAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDeal: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLead: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectNote: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPipeline: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectStage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTask: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;