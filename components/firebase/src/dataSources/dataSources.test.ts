import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import { vi } from "vitest";
import { firebaseConnection } from "../connections/firebaseConnection";
import {
  listCollectionsExamplePayload,
  listDocumentsExamplePayload,
} from "../examplePayloads";
import { selectCollection } from "./selectCollection";
import { selectDocument } from "./selectDocument";

const db = vi.hoisted(() => {
  const query = {
    where: vi.fn(),
    orderBy: vi.fn(),
    get: vi.fn(),
  };
  query.where.mockReturnValue(query);
  query.orderBy.mockReturnValue(query);
  return {
    query,
    listCollections: vi.fn(),
    collection: vi.fn(() => query),
  };
});

vi.mock("../client", () => ({
  withFirestore: (_params: unknown, fn: (db: unknown) => Promise<unknown>) =>
    fn(db),
}));

const conn = createConnection(firebaseConnection, {
  projectId: "test-project",
  clientEmail: "svc@test-project.iam.gserviceaccount.com",
  privateKey: "test-key",
});

afterEach(() => {
  db.listCollections.mockReset();
  db.query.get.mockReset();
  db.collection.mockClear();
});

describe("selectCollection", () => {
  test("maps each collection to a key of its id and a label of its path", async () => {
    db.listCollections.mockResolvedValue(listCollectionsExamplePayload.data);

    const { result } = await invokeDataSource(selectCollection, {
      firebaseConnection: conn,
    });

    expect(result).toEqual(
      listCollectionsExamplePayload.data.map(({ id, path }) => ({
        key: id,
        label: path,
      })),
    );
  });

  test("returns an empty list when the database has no collections", async () => {
    db.listCollections.mockResolvedValue([]);

    const { result } = await invokeDataSource(selectCollection, {
      firebaseConnection: conn,
    });

    expect(result).toEqual([]);
  });
});

describe("selectDocument", () => {
  const params = {
    firebaseConnection: conn,
    collection: "users",
    queryOperatorCode: "",
    orderBy: "",
  };

  test("maps each document to a key of its id and a label of its path", async () => {
    db.query.get.mockResolvedValue({
      docs: listDocumentsExamplePayload.data.map(({ id, path, data }) => ({
        id,
        ref: { path },
        data: () => data,
      })),
    });

    const { result } = await invokeDataSource(selectDocument, params);

    expect(db.collection).toHaveBeenCalledWith("users");
    expect(result).toEqual(
      listDocumentsExamplePayload.data.map(({ id, path }) => ({
        key: id,
        label: path,
      })),
    );
  });

  test("returns an empty list when the collection has no documents", async () => {
    db.query.get.mockResolvedValue({ docs: [] });

    const { result } = await invokeDataSource(selectDocument, params);

    expect(result).toEqual([]);
  });
});
