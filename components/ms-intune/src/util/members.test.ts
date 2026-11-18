import { GENERAL_MEMBER_TYPE_URL } from "../constants";
import { addObjectTypeToMemberIds } from "./members";

describe("addObjectTypeToMemberIds", () => {
  test("keeps http and https member URLs as they are", () => {
    const urls = [
      "https://graph.microsoft.com/v1.0/directoryObjects/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "http://example.com/member",
    ];
    expect(addObjectTypeToMemberIds(urls)).toEqual(urls);
  });

  test("prefixes a bare member ID and a scheme-less path with the directoryObjects URL", () => {
    expect(
      addObjectTypeToMemberIds([
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "graph.microsoft.com/v1.0/users/abc",
      ]),
    ).toEqual([
      `${GENERAL_MEMBER_TYPE_URL}/a1b2c3d4-e5f6-7890-abcd-ef1234567890`,
      `${GENERAL_MEMBER_TYPE_URL}/graph.microsoft.com/v1.0/users/abc`,
    ]);
  });

  test("treats non-web schemes as member IDs, since util.types.isUrl accepts http and https only", () => {
    expect(
      addObjectTypeToMemberIds([
        "ftp://example.com/file",
        "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      ]),
    ).toEqual([
      `${GENERAL_MEMBER_TYPE_URL}/ftp://example.com/file`,
      `${GENERAL_MEMBER_TYPE_URL}/urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890`,
    ]);
  });
});
