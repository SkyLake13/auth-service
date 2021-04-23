import { QueueClient, QueueServiceClient } from "@azure/storage-queue";

const connectionString = `DefaultEndpointsProtocol=https;AccountName=az900storageacc;AccountKey=4RVpNwp3z8g6e3rOAG04qYjZ2rCuPE5jEh58WtYzB8C2GbZMdgChtk8YvAnAPKKgBOQeEHgx0pRPjjgr+3l9/w==;EndpointSuffix=core.windows.net`;

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
