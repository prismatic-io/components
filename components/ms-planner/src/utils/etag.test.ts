import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { createClient } from "../client";
import { templatedOauth } from "../connections";
import { deleteWithEtag, patchWithEtag, resolveEtag } from "./etag";

const BASE = "https://graph.microsoft.com";
const TASK_PATH = "/planner/tasks/01gzSlKkIUSUl6DF_EilrmQAKDhh";
const URL_PATH = `/v1.0${TASK_PATH}`;

const FIRST_ETAG = 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="';
const SECOND_ETAG = 'W/"JzItVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="';

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const client = () => createClient(connection, false);

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

describe("resolveEtag", () => {
  test("returns the current @odata.etag", async () => {
    nock(BASE)
      .get(URL_PATH)
      .reply(200, { "@odata.etag": FIRST_ETAG, id: "t_1" });
    await expect(resolveEtag(client(), TASK_PATH)).resolves.toBe(FIRST_ETAG);
  });

  test("throws when the resource carries no @odata.etag", async () => {
    nock(BASE).get(URL_PATH).reply(200, { id: "t_1" });
    await expect(resolveEtag(client(), TASK_PATH)).rejects.toThrow(
      /did not return an @odata\.etag/,
    );
  });
});

describe("patchWithEtag with a caller-supplied etag", () => {
  test("writes once against that version and never re-reads it", async () => {
    let gets = 0;
    let patches = 0;
    const sentIfMatch: (string | undefined)[] = [];

    nock(BASE)
      .get(URL_PATH)
      .times(5)
      .reply(() => {
        gets += 1;
        return [200, { "@odata.etag": SECOND_ETAG }];
      });
    nock(BASE)
      .patch(URL_PATH)
      .matchHeader("If-Match", (value) => {
        sentIfMatch.push(value as string);
        return true;
      })
      .times(5)
      .reply(() => {
        patches += 1;
        return [200, { id: "t_1", title: "Renamed" }];
      });

    const data = await patchWithEtag<{ id: string; title: string }>(
      client(),
      TASK_PATH,
      { title: "Renamed" },
      FIRST_ETAG,
    );

    expect(data).toEqual({ id: "t_1", title: "Renamed" });
    expect(gets).toBe(0);
    expect(patches).toBe(1);
    expect(sentIfMatch).toEqual([FIRST_ETAG]);
  });

  test("surfaces a 409 rather than retrying against a fresh etag", async () => {
    let gets = 0;
    let patches = 0;

    nock(BASE)
      .get(URL_PATH)
      .times(5)
      .reply(() => {
        gets += 1;
        return [200, { "@odata.etag": SECOND_ETAG }];
      });
    nock(BASE)
      .patch(URL_PATH)
      .times(5)
      .reply(() => {
        patches += 1;
        return [409, { error: { code: "conflict" } }];
      });

    await expect(
      patchWithEtag(client(), TASK_PATH, { title: "Renamed" }, FIRST_ETAG),
    ).rejects.toThrow();
    expect(gets).toBe(0);
    expect(patches).toBe(1);
  });
});

describe("patchWithEtag with no caller-supplied etag", () => {
  test("reads the current etag, then patches with it", async () => {
    let gets = 0;
    const sentIfMatch: (string | undefined)[] = [];

    nock(BASE)
      .get(URL_PATH)
      .times(5)
      .reply(() => {
        gets += 1;
        return [200, { "@odata.etag": FIRST_ETAG }];
      });
    nock(BASE)
      .patch(URL_PATH)
      .matchHeader("If-Match", (value) => {
        sentIfMatch.push(value as string);
        return true;
      })
      .times(5)
      .reply(200, { id: "t_1", title: "Renamed" });

    const data = await patchWithEtag<{ id: string }>(client(), TASK_PATH, {
      title: "Renamed",
    });

    expect(data).toEqual({ id: "t_1", title: "Renamed" });
    expect(gets).toBe(1);
    expect(sentIfMatch).toEqual([FIRST_ETAG]);
  });

  test("re-reads a fresh etag and retries after a conflict", async () => {
    const servedEtags = [FIRST_ETAG, SECOND_ETAG];
    const sentIfMatch: (string | undefined)[] = [];
    let patches = 0;

    nock(BASE)
      .get(URL_PATH)
      .times(5)
      .reply(() => [
        200,
        { "@odata.etag": servedEtags.shift() ?? SECOND_ETAG },
      ]);
    nock(BASE)
      .patch(URL_PATH)
      .matchHeader("If-Match", (value) => {
        sentIfMatch.push(value as string);
        return true;
      })
      .times(5)
      .reply(() => {
        patches += 1;
        return patches === 1
          ? [412, { error: { code: "preconditionFailed" } }]
          : [200, { id: "t_1" }];
      });

    const data = await patchWithEtag<{ id: string }>(client(), TASK_PATH, {
      title: "Renamed",
    });

    expect(data).toEqual({ id: "t_1" });
    expect(patches).toBe(2);
    expect(sentIfMatch).toEqual([FIRST_ETAG, SECOND_ETAG]);
  });

  test("gives up after ETAG_RETRY_LIMIT + 1 attempts and reports the conflict with a cause", async () => {
    let gets = 0;
    let patches = 0;

    nock(BASE)
      .get(URL_PATH)
      .times(10)
      .reply(() => {
        gets += 1;
        return [200, { "@odata.etag": FIRST_ETAG }];
      });
    nock(BASE)
      .patch(URL_PATH)
      .times(10)
      .reply(() => {
        patches += 1;
        return [409, { error: { code: "conflict" } }];
      });

    let error: Error | undefined;
    try {
      await patchWithEtag(client(), TASK_PATH, { title: "Renamed" });
    } catch (thrown) {
      if (thrown instanceof Error) error = thrown;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toContain(
      `version conflict on ${TASK_PATH} after 3 attempts`,
    );
    expect(error?.cause).toBeDefined();
    expect(gets).toBe(3);
    expect(patches).toBe(3);
  });

  test("rethrows a non-conflict failure immediately without consuming a retry", async () => {
    let gets = 0;
    let patches = 0;

    nock(BASE)
      .get(URL_PATH)
      .times(10)
      .reply(() => {
        gets += 1;
        return [200, { "@odata.etag": FIRST_ETAG }];
      });
    nock(BASE)
      .patch(URL_PATH)
      .times(10)
      .reply(() => {
        patches += 1;
        return [400, { error: { code: "invalidRequest" } }];
      });

    await expect(
      patchWithEtag(client(), TASK_PATH, { title: "" }),
    ).rejects.toThrow();
    expect(gets).toBe(1);
    expect(patches).toBe(1);
  });
});

describe("deleteWithEtag", () => {
  test("reads the current etag and sends it as If-Match", async () => {
    const sentIfMatch: (string | undefined)[] = [];

    nock(BASE).get(URL_PATH).reply(200, { "@odata.etag": FIRST_ETAG });
    nock(BASE)
      .delete(URL_PATH)
      .matchHeader("If-Match", (value) => {
        sentIfMatch.push(value as string);
        return true;
      })
      .reply(204);

    await expect(deleteWithEtag(client(), TASK_PATH)).resolves.toBeUndefined();
    expect(sentIfMatch).toEqual([FIRST_ETAG]);
  });

  test("honors a caller-supplied etag without reading the current one", async () => {
    let gets = 0;
    const sentIfMatch: (string | undefined)[] = [];

    nock(BASE)
      .get(URL_PATH)
      .times(5)
      .reply(() => {
        gets += 1;
        return [200, { "@odata.etag": SECOND_ETAG }];
      });
    nock(BASE)
      .delete(URL_PATH)
      .matchHeader("If-Match", (value) => {
        sentIfMatch.push(value as string);
        return true;
      })
      .reply(204);

    await deleteWithEtag(client(), TASK_PATH, FIRST_ETAG);
    expect(gets).toBe(0);
    expect(sentIfMatch).toEqual([FIRST_ETAG]);
  });
});
