import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { cert, deleteApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { vi } from "vitest";
import { withFirestore } from "./client";
import { firebaseConnection } from "./connections/firebaseConnection";

vi.mock("firebase-admin/app", () => ({
  cert: vi.fn((serviceAccount) => ({ serviceAccount })),
  initializeApp: vi.fn((_options, name: string) => ({ name })),
  deleteApp: vi.fn(async () => undefined),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn((app) => ({ app })),
}));

const connectionFor = (projectId: string) => ({
  firebaseConnection: createConnection(firebaseConnection, {
    projectId,
    clientEmail: `svc@${projectId}.iam.gserviceaccount.com`,
    privateKey: "line1\\nline2",
  }),
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("withFirestore", () => {
  test("returns the callback result and deletes the app it created", async () => {
    const result = await withFirestore(
      connectionFor("project-a"),
      async () => "done",
    );

    expect(result).toBe("done");
    const app = vi.mocked(initializeApp).mock.results[0].value;
    expect(getFirestore).toHaveBeenCalledWith(app);
    expect(deleteApp).toHaveBeenCalledTimes(1);
    expect(deleteApp).toHaveBeenCalledWith(app);
  });

  test("initializes a separately named app per connection", async () => {
    await withFirestore(connectionFor("project-a"), async () => undefined);
    await withFirestore(connectionFor("project-b"), async () => undefined);

    const [first, second] = vi.mocked(initializeApp).mock.calls;
    expect(first[1]).not.toBe(second[1]);
    expect(vi.mocked(cert).mock.calls.map(([sa]) => sa)).toEqual([
      expect.objectContaining({ projectId: "project-a" }),
      expect.objectContaining({ projectId: "project-b" }),
    ]);
  });

  test("unescapes newlines in the private key", async () => {
    await withFirestore(connectionFor("project-a"), async () => undefined);

    expect(cert).toHaveBeenCalledWith({
      projectId: "project-a",
      clientEmail: "svc@project-a.iam.gserviceaccount.com",
      privateKey: "line1\nline2",
    });
  });

  test("deletes the app when the callback throws", async () => {
    await expect(
      withFirestore(connectionFor("project-a"), async () => {
        throw new Error("firestore failure");
      }),
    ).rejects.toThrow("firestore failure");

    expect(deleteApp).toHaveBeenCalledTimes(1);
  });

  test("rejects an unsupported connection without initializing an app", async () => {
    const { firebaseConnection: connection } = connectionFor("project-a");

    await expect(
      withFirestore(
        { firebaseConnection: { ...connection, key: "otherConnection" } },
        async () => undefined,
      ),
    ).rejects.toBeInstanceOf(ConnectionError);

    expect(initializeApp).not.toHaveBeenCalled();
  });

  test("surfaces the key-parse detail from the credential error cause", async () => {
    const parseError = new Error("Failed to parse private key.", {
      cause: new Error("error:1E08010C:DECODER routines::unsupported"),
    });
    vi.mocked(cert).mockImplementationOnce(() => {
      throw parseError;
    });

    const rejection = withFirestore(
      connectionFor("project-a"),
      async () => undefined,
    );

    await expect(rejection).rejects.toThrow(
      "Failed to parse private key. error:1E08010C:DECODER routines::unsupported",
    );
    await expect(rejection).rejects.toHaveProperty("cause", parseError);
    expect(initializeApp).not.toHaveBeenCalled();
  });

  test("rethrows a credential error without a cause unchanged", async () => {
    const certError = new Error(
      'Service account object must contain a string "project_id" property.',
    );
    vi.mocked(cert).mockImplementationOnce(() => {
      throw certError;
    });

    await expect(
      withFirestore(connectionFor("project-a"), async () => undefined),
    ).rejects.toBe(certError);
  });
});
