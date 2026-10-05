import type {
  GetObjectLockConfigurationCommandOutput,
  GetObjectRetentionCommandOutput,
  PutObjectLockConfigurationCommandOutput,
  PutObjectRetentionCommandOutput,
} from "@aws-sdk/client-s3";
export const putObjectLockConfigurationExamplePayload: {
  data: PutObjectLockConfigurationCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "HRTN",
      extendedRequestId: "n2j6gnXOgOKm+PomoHrLsbOhatc7LMw1Su",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const getObjectLockConfigurationExamplePayload: {
  data: GetObjectLockConfigurationCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "J58R459KF4NH",
      extendedRequestId:
        "YLfHsBUyeXU06tYjF7ZLX7f7JhBL1FFZhA/UZKUr4WNTy0OHDOjYN=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    ObjectLockConfiguration: {
      ObjectLockEnabled: "Enabled",
      Rule: {
        DefaultRetention: {
          Mode: "GOVERNANCE",
          Years: 2,
        },
      },
    },
  },
};
export const putObjectRetentionExamplePayload: {
  data: PutObjectRetentionCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "9GKTJZDRMJCGMNY6",
      extendedRequestId:
        "NKjiPDGEYKYtH7sHPWKSVpy9y9NtjbXzeJ7whq75y62jiH9JLuZOpMLCBiYyc+/hOlnOTCaTpWo=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const getObjectRetentionExamplePayload: {
  data: GetObjectRetentionCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "88W3KJSMC9E",
      extendedRequestId: "aJ3Rpb+v2F6Fqy47J6fWoPPCqe+LC8UX8vo5x3KK/YhN/=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    Retention: {
      Mode: "COMPLIANCE",
      RetainUntilDate: new Date("2024-08-25T20:00:00.000Z"),
    },
  },
};
