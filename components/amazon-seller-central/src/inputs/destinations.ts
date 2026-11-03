import { input, util } from "@prismatic-io/spectral";
import { awsRegion as awsRegionInput } from "aws-utils";
import { connectionInput, destinationId } from "./common";

const destinationName = input({
  label: "Name",
  type: "string",
  placeholder: "Enter destination name",
  comments: "A developer-defined name to help identify this destination.",
  required: true,
  example: "MyNotificationDestination",
  clean: util.types.toString,
});

const arn = input({
  label: "ARN",
  type: "string",
  placeholder: "Enter ARN",
  comments: "The Amazon Resource Name (ARN) associated with the SQS queue.",
  required: false,
  example: "arn:aws:sqs:us-east-1:123456789012:my-notification-queue",
  clean: util.types.toString,
});

const awsRegion = awsRegionInput;

const accountId = input({
  label: "Account ID",
  type: "string",
  placeholder: "Enter AWS account ID",
  comments:
    "The identifier for the AWS account that is responsible for charges related to receiving notifications.",
  required: false,
  example: "123456789012",
  clean: util.types.toString,
});

export const createDestinationInputs = {
  connectionInput,
  name: destinationName,
  arn,
  region: { ...awsRegion, required: false },
  accountId,
};

export const deleteDestinationInputs = {
  connectionInput,
  destinationId: {
    ...destinationId,
    required: true,
    comments: "The identifier for the destination that you want to delete.",
  },
};

export const getDestinationInputs = {
  connectionInput,
  destinationId: {
    ...destinationId,
    required: true,
    comments: "The identifier generated when you created the destination.",
  },
};

export const listDestinationsInputs = {
  connectionInput,
};
