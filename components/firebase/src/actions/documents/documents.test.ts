import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { FieldValue, type Firestore } from "firebase-admin/firestore";
import { vi } from "vitest";
import { firebaseConnection } from "../../connections/firebaseConnection";
import {
  bulkCreateDocumentsExamplePayload,
  createDocumentExamplePayload,
  deleteDocumentExamplePayload,
  getDocumentExamplePayload,
  listDocumentsExamplePayload,
  removeFieldExamplePayload,
  updateDocumentExamplePayload,
} from "../../examplePayloads";
import { bulkCreateDocuments } from "./bulkCreateDocuments";
import { createDocument } from "./createDocument";
import { deleteDocument } from "./deleteDocument";
import { getDocument } from "./getDocument";
import { listDocuments } from "./listDocuments";
import { removeField } from "./removeField";
import { updateDocument } from "./updateDocument";
const db = vi.hoisted(() => ({ current: undefined as unknown }));
vi.mock("../../client", () => ({
  withFirestore: (_params: unknown, fn: (db: unknown) => Promise<unknown>) =>
    fn(db.current),
}));
const conn = createConnection(firebaseConnection, {
  projectId: "test-project",
  clientEmail: "svc@test-project.iam.gserviceaccount.com",
  privateKey: "test-key",
});
const firestoreError = () =>
  new Error("7 PERMISSION_DENIED: Missing permissions");
const fakeDb = () => {
  const docRef = {
    get: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  const batch = { set: vi.fn(), commit: vi.fn(async () => []) };
  const collectionRef = {
    doc: vi.fn(() => docRef),
    add: vi.fn(),
    where: vi.fn(() => collectionRef),
    orderBy: vi.fn(() => collectionRef),
    get: vi.fn(),
  };
  const firestore = {
    collection: vi.fn(() => collectionRef),
    batch: vi.fn(() => batch),
  };
  db.current = firestore as unknown as Firestore;
  return { firestore, collectionRef, docRef, batch };
};
afterEach(() => {
  db.current = undefined;
});
describe("createDocument", () => {
  const { id, path } = createDocumentExamplePayload.data;
  test("adds the data to the collection and returns the new reference", async () => {
    const { firestore, collectionRef } = fakeDb();
    collectionRef.add.mockResolvedValue({ id, path });
    const { result } = await invoke(createDocument, {
      firebaseConnection: conn,
      collection: "users",
      data: { name: "Jane Smith" },
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(collectionRef.add).toHaveBeenCalledWith({ name: "Jane Smith" });
    expect(result).toEqual(createDocumentExamplePayload);
  });
  test("propagates a Firestore failure", async () => {
    const { collectionRef } = fakeDb();
    collectionRef.add.mockRejectedValue(firestoreError());
    await expect(
      invoke(createDocument, {
        firebaseConnection: conn,
        collection: "users",
        data: { name: "Jane Smith" },
      }),
    ).rejects.toThrow("PERMISSION_DENIED");
  });
});
describe("bulkCreateDocuments", () => {
  const documents = [{ field1: "value1" }, { field1: "value2" }];
  test("sets each document on a new reference and commits the batch", async () => {
    const { firestore, collectionRef, batch } = fakeDb();
    const refs = [{ id: "a" }, { id: "b" }];
    collectionRef.doc
      .mockReturnValueOnce(refs[0] as never)
      .mockReturnValueOnce(refs[1] as never);
    const { result } = await invoke(bulkCreateDocuments, {
      firebaseConnection: conn,
      collection: "users",
      documents,
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(collectionRef.doc).toHaveBeenCalledWith();
    expect(batch.set.mock.calls).toEqual([
      [refs[0], documents[0]],
      [refs[1], documents[1]],
    ]);
    expect(batch.commit).toHaveBeenCalledTimes(1);
    expect(result).toEqual(bulkCreateDocumentsExamplePayload);
  });
  test("propagates a batch commit failure", async () => {
    const { batch } = fakeDb();
    batch.commit.mockRejectedValue(firestoreError());
    await expect(
      invoke(bulkCreateDocuments, {
        firebaseConnection: conn,
        collection: "users",
        documents,
      }),
    ).rejects.toThrow("PERMISSION_DENIED");
  });
  test("rejects documents that are not an array without committing", async () => {
    const { batch } = fakeDb();
    await expect(
      invoke(bulkCreateDocuments, {
        firebaseConnection: conn,
        collection: "users",
        documents: { field1: "value1" },
      }),
    ).rejects.toThrow("'documents' should be an array, but got object");
    expect(batch.set).not.toHaveBeenCalled();
    expect(batch.commit).not.toHaveBeenCalled();
  });
});
describe("listDocuments", () => {
  const [example] = listDocumentsExamplePayload.data;
  test("maps each query snapshot to id, path, and data", async () => {
    const { firestore, collectionRef } = fakeDb();
    collectionRef.get.mockResolvedValue({
      docs: [
        {
          id: example.id,
          ref: { path: example.path },
          data: () => example.data,
        },
      ],
    });
    const { result } = await invoke(listDocuments, {
      firebaseConnection: conn,
      collection: "users",
      queryOperatorCode: "",
      orderBy: "",
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(result).toEqual(listDocumentsExamplePayload);
  });
  test("propagates a Firestore failure", async () => {
    const { collectionRef } = fakeDb();
    collectionRef.get.mockRejectedValue(firestoreError());
    await expect(
      invoke(listDocuments, {
        firebaseConnection: conn,
        collection: "users",
        queryOperatorCode: "",
        orderBy: "",
      }),
    ).rejects.toThrow("Failed to list documents: 7 PERMISSION_DENIED");
  });
});
describe("getDocument", () => {
  const example = getDocumentExamplePayload.data;
  const timestamp = (date: Date) => ({ toDate: () => date });
  test("returns the snapshot data, id, existence, and timestamps", async () => {
    const { firestore, collectionRef, docRef } = fakeDb();
    docRef.get.mockResolvedValue({
      data: () => example.data,
      id: example.id,
      createTime: timestamp(example.createTime),
      updateTime: timestamp(example.updateTime),
      exists: true,
      readTime: timestamp(example.readTime),
    });
    const { result } = await invoke(getDocument, {
      firebaseConnection: conn,
      collection: "users",
      document: example.id,
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(collectionRef.doc).toHaveBeenCalledWith(example.id);
    expect(result).toEqual(getDocumentExamplePayload);
  });
  test("propagates a Firestore failure", async () => {
    const { docRef } = fakeDb();
    docRef.get.mockRejectedValue(firestoreError());
    await expect(
      invoke(getDocument, {
        firebaseConnection: conn,
        collection: "users",
        document: example.id,
      }),
    ).rejects.toThrow("PERMISSION_DENIED");
  });
});
describe("updateDocument", () => {
  test("updates the document and returns the write result", async () => {
    const { firestore, collectionRef, docRef } = fakeDb();
    docRef.update.mockResolvedValue(updateDocumentExamplePayload.data);
    const { result } = await invoke(updateDocument, {
      firebaseConnection: conn,
      collection: "users",
      document: "aBcDeFgHiJkLmNoPqRsT",
      data: { role: "admin" },
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(collectionRef.doc).toHaveBeenCalledWith("aBcDeFgHiJkLmNoPqRsT");
    expect(docRef.update).toHaveBeenCalledWith({ role: "admin" });
    expect(result).toEqual(updateDocumentExamplePayload);
  });
  test("propagates a Firestore failure", async () => {
    const { docRef } = fakeDb();
    docRef.update.mockRejectedValue(
      new Error("5 NOT_FOUND: No document to update"),
    );
    await expect(
      invoke(updateDocument, {
        firebaseConnection: conn,
        collection: "users",
        document: "missing",
        data: { role: "admin" },
      }),
    ).rejects.toThrow("NOT_FOUND");
  });
});
describe("deleteDocument", () => {
  test("deletes the document and returns the write result", async () => {
    const { firestore, collectionRef, docRef } = fakeDb();
    docRef.delete.mockResolvedValue(deleteDocumentExamplePayload.data);
    const { result } = await invoke(deleteDocument, {
      firebaseConnection: conn,
      collection: "users",
      document: "aBcDeFgHiJkLmNoPqRsT",
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(collectionRef.doc).toHaveBeenCalledWith("aBcDeFgHiJkLmNoPqRsT");
    expect(docRef.delete).toHaveBeenCalledWith();
    expect(result).toEqual(deleteDocumentExamplePayload);
  });
  test("propagates a Firestore failure", async () => {
    const { docRef } = fakeDb();
    docRef.delete.mockRejectedValue(firestoreError());
    await expect(
      invoke(deleteDocument, {
        firebaseConnection: conn,
        collection: "users",
        document: "aBcDeFgHiJkLmNoPqRsT",
      }),
    ).rejects.toThrow("PERMISSION_DENIED");
  });
});
describe("removeField", () => {
  test("updates the field with the delete sentinel and returns the write result", async () => {
    const { firestore, collectionRef, docRef } = fakeDb();
    docRef.update.mockResolvedValue(removeFieldExamplePayload.data);
    const { result } = await invoke(removeField, {
      firebaseConnection: conn,
      collection: "users",
      document: "aBcDeFgHiJkLmNoPqRsT",
      fieldToRemove: "address.city",
    });
    expect(firestore.collection).toHaveBeenCalledWith("users");
    expect(collectionRef.doc).toHaveBeenCalledWith("aBcDeFgHiJkLmNoPqRsT");
    expect(docRef.update).toHaveBeenCalledTimes(1);
    const [update] = docRef.update.mock.calls[0] as unknown as [
      Record<string, FieldValue>,
    ];
    expect(Object.keys(update)).toEqual(["address.city"]);
    expect(update["address.city"].isEqual(FieldValue.delete())).toBe(true);
    expect(result).toEqual(removeFieldExamplePayload);
  });
  test("propagates a Firestore failure", async () => {
    const { docRef } = fakeDb();
    docRef.update.mockRejectedValue(firestoreError());
    await expect(
      invoke(removeField, {
        firebaseConnection: conn,
        collection: "users",
        document: "aBcDeFgHiJkLmNoPqRsT",
        fieldToRemove: "address.city",
      }),
    ).rejects.toThrow("PERMISSION_DENIED");
  });
});
