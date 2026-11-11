//#region node_modules/bson/bson.d.ts
/** @public */
declare abstract class BSONValue {
  /** @public */
  abstract get _bsontype(): string;
  /**
   * @public
   * Prints a human-readable string of BSON value information
   * If invoked manually without node.js.inspect function, this will default to a modified JSON.stringify
   */
  abstract inspect(depth?: number, options?: unknown, inspect?: InspectFn): string;
  /* Excluded from this release type: toExtendedJSON */
}
/** @public */
declare interface Document {
  [key: string]: any;
}
declare type InspectFn = (x: unknown, options?: unknown) => string;
/**
 * A class representation of a BSON Int32 type.
 * @public
 * @category BSONType
 */
/**
 * A class representation of the BSON ObjectId type.
 * @public
 * @category BSONType
 */
declare class ObjectId extends BSONValue {
  get _bsontype(): 'ObjectId';
  /* Excluded from this release type: index */
  static cacheHexString: boolean;
  /* Excluded from this release type: buffer */
  /* Excluded from this release type: __id */
  /**
   * Create ObjectId from a number.
   *
   * @param inputId - A number.
   * @deprecated Instead, use `static createFromTime()` to set a numeric value for the new ObjectId.
   */
  constructor(inputId: number);
  /**
   * Create ObjectId from a 24 character hex string.
   *
   * @param inputId - A 24 character hex string.
   */
  constructor(inputId: string);
  /**
   * Create ObjectId from the BSON ObjectId type.
   *
   * @param inputId - The BSON ObjectId type.
   */
  constructor(inputId: ObjectId);
  /**
   * Create ObjectId from the object type that has the toHexString method.
   *
   * @param inputId - The ObjectIdLike type.
   */
  constructor(inputId: ObjectIdLike);
  /**
   * Create ObjectId from a 12 byte binary Buffer.
   *
   * @param inputId - A 12 byte binary Buffer.
   */
  constructor(inputId: Uint8Array);
  /** To generate a new ObjectId, use ObjectId() with no argument. */
  constructor();
  /**
   * Implementation overload.
   *
   * @param inputId - All input types that are used in the constructor implementation.
   */
  constructor(inputId?: string | number | ObjectId | ObjectIdLike | Uint8Array);
  /**
   * The ObjectId bytes
   * @readonly
   */
  get id(): Uint8Array;
  set id(value: Uint8Array);
  /** Returns the ObjectId id as a 24 lowercase character hex string representation */
  toHexString(): string;
  /* Excluded from this release type: getInc */
  /**
   * Generate a 12 byte id buffer used in ObjectId's
   *
   * @param time - pass in a second based timestamp.
   */
  static generate(time?: number): Uint8Array;
  /**
   * Converts the id into a 24 character hex string for printing, unless encoding is provided.
   * @param encoding - hex or base64
   */
  toString(encoding?: 'hex' | 'base64'): string;
  /** Converts to its JSON the 24 character hex string representation. */
  toJSON(): string;
  /* Excluded from this release type: is */
  /**
   * Compares the equality of this ObjectId with `otherID`.
   *
   * @param otherId - ObjectId instance to compare against.
   */
  equals(otherId: string | ObjectId | ObjectIdLike | undefined | null): boolean;
  /** Returns the generation date (accurate up to the second) that this ID was generated. */
  getTimestamp(): Date;
  /* Excluded from this release type: createPk */
  /* Excluded from this release type: serializeInto */
  /**
   * Creates an ObjectId from a second based number, with the rest of the ObjectId zeroed out. Used for comparisons or sorting the ObjectId.
   *
   * @param time - an integer number representing a number of seconds.
   */
  static createFromTime(time: number): ObjectId;
  /**
   * Creates an ObjectId from a hex string representation of an ObjectId.
   *
   * @param hexString - create a ObjectId from a passed in 24 character hexstring.
   */
  static createFromHexString(hexString: string): ObjectId;
  /** Creates an ObjectId instance from a base64 string */
  static createFromBase64(base64: string): ObjectId;
  /**
   * Checks if a value can be used to create a valid bson ObjectId
   * @param id - any JS value
   */
  static isValid(id: string | number | ObjectId | ObjectIdLike | Uint8Array): boolean;
  /* Excluded from this release type: toExtendedJSON */
  /* Excluded from this release type: fromExtendedJSON */
  /**
   * Converts to a string representation of this Id.
   *
   * @returns return the 24 character hex string representation.
   */
  inspect(depth?: number, options?: unknown, inspect?: InspectFn): string;
}
/** @public */
declare interface ObjectIdLike {
  id: string | Uint8Array;
  __id?: string;
  toHexString(): string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "mongo";
  documentationUrl: "https://prismatic.io/docs/components/mongo/";
  public: true;
  display: {
    label: string;
    category: "Data Platforms";
    description: string;
    iconPath: string;
  };
  actions: {
    convertObjectId: import("@prismatic-io/spectral").ActionDefinition<{
      objectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => ObjectId;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _id: ObjectId;
        id: string;
      };
    }>;
    deleteMany: import("@prismatic-io/spectral").ActionDefinition<{
      document: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("mongodb4").DeleteResult;
    }>;
    findAll: import("@prismatic-io/spectral").ActionDefinition<{
      queryFilter: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      comparisonOperator: {
        label: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      convertValuesToNumbers: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      skip: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: any;
      }[];
    }>;
    findOne: import("@prismatic-io/spectral").ActionDefinition<{
      queryFilter: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      comparisonOperator: {
        label: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      convertValuesToNumbers: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: any;
      };
    }>;
    insertMany: import("@prismatic-io/spectral").ActionDefinition<{
      documentList: {
        label: string;
        comments: string;
        type: "data";
        required: true;
        collection: "valuelist";
      };
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("mongodb4").InsertManyResult<import("mongodb4").Document> | import("mongodb").InsertManyResult<Document>;
    }>;
    insertOne: import("@prismatic-io/spectral").ActionDefinition<{
      document: {
        label: string;
        comments: string;
        type: "data";
        required: true;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("mongodb4").InsertOneResult<import("mongodb4").Document> | import("mongodb").InsertOneResult<Document>;
    }>;
    updateOne: import("@prismatic-io/spectral").ActionDefinition<{
      document: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      documentUpdate: {
        label: string;
        comments: string;
        type: "data";
        required: false;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      upsert: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("mongodb4").UpdateResult | import("mongodb").UpdateResult<Document>;
    }>;
    updateMany: import("@prismatic-io/spectral").ActionDefinition<{
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      queryFilter: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      comparisonOperator: {
        label: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      documentUpdate: {
        label: string;
        comments: string;
        type: "data";
        required: false;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
      convertValuesToNumbers: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      upsert: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("mongodb4").Document | import("mongodb4").UpdateResult | import("mongodb").UpdateResult<Document>;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      executeCommand: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      runAdminCommand: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("mongodb4").Document;
    }>;
    aggregate: import("@prismatic-io/spectral").ActionDefinition<{
      mongoConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      pipeline: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => Document[];
      };
      aggregationOptions: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "mongo";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      connectionString: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      database: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      collection: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      useV4: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        shown: true;
        required: false;
      };
    };
  }, "mongo">[];
}>;
export = _default;