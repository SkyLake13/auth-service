import { QueueClient, QueueServiceClient } from "@azure/storage-queue";

const connectionString = (process.env as any).STORAGE_CONNECTION_STRING;

const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

const queueName = 'phone-verification';
const queueClient: QueueClient = queueServiceClient.getQueueClient(queueName);

export function sendPhoneVerification(payload: string): void {
    queueClient.sendMessage(Buffer.from(payload).toString('base64')).then(() => console.log('message sent to queue'));
}

const loginQueueName = 'user-login';
const loginQueueClient: QueueClient = queueServiceClient.getQueueClient(loginQueueName);

export function sendLogin(payload: string): void {
    loginQueueClient.sendMessage(Buffer.from(payload).toString('base64')).then(() => console.log('message sent to queue'));
}
