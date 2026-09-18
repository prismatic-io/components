import type { DropboxResponse, files } from "dropbox";
export const copyObjectExamplePayload: DropboxResponse<files.RelocationResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: {
        ".tag": "file",
        name: "Prime_Numbers_copy.txt",
        id: "id:pQ7rS9tU0vWAAAAAAAAABw",
        client_modified: "2024-03-18T14:22:41Z",
        server_modified: "2024-03-18T14:22:43Z",
        rev: "b2d31ef0aa47",
        size: 2048,
      },
    },
  };
export const deleteObjectExamplePayload: DropboxResponse<files.DeleteResult> = {
  status: 200,
  headers: {},
  result: {
    metadata: {
      ".tag": "file",
      name: "Prime_Numbers.txt",
      id: "id:zA3bC4dE5fGAAAAAAAAACg",
      client_modified: "2024-02-05T09:14:02Z",
      server_modified: "2024-02-05T09:14:05Z",
      rev: "c3e42f01bb58",
      size: 2048,
    },
  },
};
export const downloadFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet",
};
export const exportFileExamplePayload: DropboxResponse<files.ExportResult> = {
  status: 200,
  headers: {},
  result: {
    export_metadata: {
      export_hash:
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      name: "Prime_Numbers.xlsx",
      size: 7189,
    },
    file_metadata: {
      client_modified: "2015-05-12T15:50:38Z",
      content_hash:
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      file_lock_info: {
        created: "2015-05-12T15:50:38Z",
        is_lockholder: true,
        lockholder_name: "Imaginary User",
      },
      has_explicit_shared_members: false,
      id: "id:a4ayc_80_OEAAAAAAAAAXw",
      is_downloadable: true,
      name: "Prime_Numbers.txt",
      path_display: "/Homework/math/Prime_Numbers.txt",
      path_lower: "/homework/math/prime_numbers.txt",
      property_groups: [
        {
          fields: [
            {
              name: "Security Policy",
              value: "Confidential",
            },
          ],
          template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
        },
      ],
      rev: "a1c10ce0dd78",
      server_modified: "2015-05-12T15:50:38Z",
      sharing_info: {
        modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
        parent_shared_folder_id: "84528192421",
        read_only: true,
      },
      size: 7212,
    },
  },
};
export const getDownloadStatusExamplePayload: DropboxResponse<files.SaveUrlJobStatus> =
  {
    status: 200,
    headers: {},
    result: {
      ".tag": "in_progress",
    },
  };
export const getFileOrFolderMetadataExamplePayload: DropboxResponse<
  | files.FileMetadataReference
  | files.FolderMetadataReference
  | files.DeletedMetadataReference
> = {
  status: 200,
  headers: {},
  result: {
    ".tag": "file",
    client_modified: "2015-05-12T15:50:38Z",
    content_hash:
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    file_lock_info: {
      created: "2015-05-12T15:50:38Z",
      is_lockholder: true,
      lockholder_name: "Imaginary User",
    },
    has_explicit_shared_members: false,
    id: "id:a4ayc_80_OEAAAAAAAAAXw",
    is_downloadable: true,
    name: "Prime_Numbers.txt",
    path_display: "/Homework/math/Prime_Numbers.txt",
    path_lower: "/homework/math/prime_numbers.txt",
    property_groups: [
      {
        fields: [
          {
            name: "Security Policy",
            value: "Confidential",
          },
        ],
        template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
      },
    ],
    rev: "a1c10ce0dd78",
    server_modified: "2015-05-12T15:50:38Z",
    sharing_info: {
      modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
      parent_shared_folder_id: "84528192421",
      read_only: true,
    },
    size: 7212,
  },
};
export const lockFileBatchExamplePayload: DropboxResponse<files.LockFileBatchResult> =
  {
    status: 200,
    headers: {},
    result: {
      entries: [
        {
          ".tag": "success",
          lock: {
            content: {
              ".tag": "single_user",
              created: "2015-05-12T15:50:38Z",
              lock_holder_account_id:
                "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              lock_holder_team_id: "dbtid:1234abcd",
            },
          },
          metadata: {
            ".tag": "file",
            client_modified: "2015-05-12T15:50:38Z",
            content_hash:
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            file_lock_info: {
              created: "2015-05-12T15:50:38Z",
              is_lockholder: true,
              lockholder_name: "Imaginary User",
            },
            has_explicit_shared_members: false,
            id: "id:a4ayc_80_OEAAAAAAAAAXw",
            is_downloadable: true,
            name: "Prime_Numbers.txt",
            path_display: "/Homework/math/Prime_Numbers.txt",
            path_lower: "/homework/math/prime_numbers.txt",
            property_groups: [
              {
                fields: [
                  {
                    name: "Security Policy",
                    value: "Confidential",
                  },
                ],
                template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
              },
            ],
            rev: "a1c10ce0dd78",
            server_modified: "2015-05-12T15:50:38Z",
            sharing_info: {
              modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              parent_shared_folder_id: "84528192421",
              read_only: true,
            },
            size: 7212,
          },
        },
      ],
    },
  };
export const getFileLockExamplePayload = lockFileBatchExamplePayload;
export const unlockFileExamplePayload = lockFileBatchExamplePayload;
export const moveObjectExamplePayload: DropboxResponse<files.RelocationResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: {
        ".tag": "file",
        name: "Prime_Numbers.txt",
        id: "id:hH7iJ8kL9mNAAAAAAAAADQ",
        client_modified: "2024-04-02T11:05:19Z",
        server_modified: "2024-04-02T11:05:21Z",
        rev: "d4f53a12cc69",
        size: 2048,
      },
    },
  };
export const saveFromUrlExamplePayload: DropboxResponse<files.SaveUrlResult> = {
  status: 200,
  headers: {},
  result: {
    ".tag": "async_job_id",
    async_job_id: "LnMobEc7XVEAAAAAAAAAAQ",
  },
};
export const searchFilesExamplePayload: DropboxResponse<files.SearchV2Result> =
  {
    status: 200,
    headers: {},
    result: {
      has_more: false,
      matches: [
        {
          metadata: {
            ".tag": "metadata",
            metadata: {
              ".tag": "file",
              client_modified: "2015-05-12T15:50:38Z",
              content_hash:
                "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              has_explicit_shared_members: false,
              id: "id:a4ayc_80_OEAAAAAAAAAXw",
              is_downloadable: true,
              name: "Prime_Numbers.txt",
              path_display: "/Homework/math/Prime_Numbers.txt",
              path_lower: "/homework/math/prime_numbers.txt",
              rev: "a1c10ce0dd78",
              server_modified: "2015-05-12T15:50:38Z",
              sharing_info: {
                modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
                parent_shared_folder_id: "84528192421",
                read_only: true,
              },
              size: 7212,
            },
          },
        },
      ],
    },
  };
export const uploadFileExamplePayload: DropboxResponse<files.FileMetadata> = {
  status: 200,
  headers: {},
  result: {
    id: "id:oP1qR2sT3uVAAAAAAAAAEQ",
    client_modified: "2024-05-14T08:32:10Z",
    server_modified: "2024-05-14T08:32:12Z",
    rev: "e50641b23d7a",
    size: 2048,
    name: "Quarterly_Report.xlsx",
  },
};
