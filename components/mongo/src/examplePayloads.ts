import { toMongoDBObjectId } from "./util";







export const findAllExamplePayload = {
  data: [
    {
      _id: toMongoDBObjectId("610ae111774d8aaef3b5d2eb"),
      id: "610ae111774d8aaef3b5d2eb",
      name: "Sample Document",
      status: "active",
      createdAt: "2024-08-04T12:30:00.000Z",
    },
  ],
};







export const findOneExamplePayload = {
  data: {
    _id: toMongoDBObjectId("610ae111774d8aaef3b5d2eb"),
    id: "610ae111774d8aaef3b5d2eb",
    name: "Sample Document",
    status: "active",
    createdAt: "2024-08-04T12:30:00.000Z",
  },
};







export const insertOneExamplePayload = {
  data: {
    acknowledged: true,
    insertedId: toMongoDBObjectId("610ae111774d8aaef3b5d2eb"),
  },
};







export const insertManyExamplePayload = {
  data: {
    acknowledged: true,
    insertedCount: 3,
    insertedIds: {
      0: toMongoDBObjectId("610ae111774d8aaef3b5d2eb"),
      1: toMongoDBObjectId("610ae112774d8aaef3b5d2ec"),
      2: toMongoDBObjectId("610ae113774d8aaef3b5d2ed"),
    },
  },
};







export const updateOneExamplePayload = {
  data: {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  },
};







export const updateManyExamplePayload = {
  data: {
    acknowledged: true,
    modifiedCount: 5,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 5,
  },
};







export const deleteManyExamplePayload = {
  data: {
    acknowledged: true,
    deletedCount: 1,
  },
};







export const aggregateExamplePayload = {
  data: [
    {
      _id: "active",
      count: 42,
      totalAmount: 15750.5,
    },
  ],
};







export const rawRequestExamplePayload = {
  data: {
    ok: 1,
  },
};







export const convertObjectIdExamplePayload = {
  data: {
    _id: toMongoDBObjectId("5a9427648b0beebeb69579e7"),
    id: "5a9427648b0beebeb69579e7",
  },
};
