## Changelog

### 2026-10-08

Added Amazon MSK IAM authentication, along with connection and trigger updates:

- Added the **IAM Access Key and Secret** and **IAM Role ARN** connections for Amazon MSK clusters that use IAM access control
- Added a required **AWS Region** dropdown to the **IAM Access Key and Secret** and **IAM Role ARN** connections for selecting the region of the Amazon MSK cluster
- Updated the **Schema Registry API Key** field on the **Basic Authentication** connection to a masked password field
- Updated the **Kafka Consumer** trigger to group **From Beginning**, **Auto Commit**, and **Deserialize Keys as Avro** into a **Consumer Options** structured object, and to show **Session Timeout (ms)** and **Heartbeat Interval (ms)** as top-level inputs again in place of the **Session Timing** group
- Updated the **Kafka Consumer** trigger to fail the run when the consumer cannot start, such as when it cannot join its consumer group, and to reject a **Max Messages** value below 1
- Updated the **Publish Messages** action to close its broker connection when sending messages fails

### 2026-08-13

Enhanced component capabilities:
- Updated the **Select Topic** data source to read the cluster address from the **Brokers** input so topic dropdowns resolve (breaking: the data source's **Broker** input was removed, so previously configured values must be re-entered)
- Grouped the **Session Timeout** and **Heartbeat Interval** inputs on the **Kafka Consumer** trigger into a **Session Timing** structured object
- Added output schemas across all actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration

### 2026-07-30

Added Confluent Schema Registry Avro deserialization support for the **Kafka Consumer** trigger:
- Automatically decoded consumed Avro-encoded message values to JSON objects
- Added optional **Deserialize Keys as Avro** input for key deserialization

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-02-11

Added comprehensive Kafka consumer/subscriber functionality and enhanced connection security.
