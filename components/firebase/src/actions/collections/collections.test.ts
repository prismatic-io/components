import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { vi } from "vitest";
import { firebaseConnection } from "../../connections/firebaseConnection";
import { listCollectionsExamplePayload } from "../../examplePayloads";
import { listCollections } from "./listCollections";

const db = vi.hoisted(() => ({ listCollections: vi.fn() }));

vi.mock("../../client", () => ({
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
});

describe("listCollections", () => {
  test("maps each collection reference to id and path", async () => {
    db.listCollections.mockResolvedValue(
      listCollectionsExamplePayload.data.map(({ id, path }) => ({
        id,
        path,
        parent: null,
      })),
    );

    const { result } = await invoke(listCollections, {
      firebaseConnection: conn,
    });

    expect(result).toEqual(listCollectionsExamplePayload);
  });

  test("propagates a Firestore failure", async () => {
    db.listCollections.mockRejectedValue(
      new Error("7 PERMISSION_DENIED: Missing permissions"),
    );

    await expect(
      invoke(listCollections, { firebaseConnection: conn }),
    ).rejects.toThrow("PERMISSION_DENIED");
  });
});
