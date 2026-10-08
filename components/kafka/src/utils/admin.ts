import type { Admin, Kafka } from "kafkajs";
export const withAdmin = async <T>(
  kafka: Kafka,
  work: (admin: Admin) => Promise<T>,
): Promise<T> => {
  const admin = kafka.admin();
  try {
    await admin.connect();
    const result = await work(admin);
    await admin.disconnect();
    return result;
  } catch (error) {
    await admin.disconnect().catch(() => {});
    throw error;
  }
};
