import { BaseListener } from "@tickets11131/ticket-tracker-common";
import { saveDefaultTickets } from "../../default-tickets";

export class AccountCreatedListener extends BaseListener {
  queueUrl =
    "https://sqs.us-east-1.amazonaws.com/405944478746/account-created.fifo";

  async handleMessage(message: AWS.SQS.Message) {
    if (!message.Body) return;
    const body = JSON.parse(message.Body) as { Message: string };
    const data = JSON.parse(body.Message) as { accountId: string };
    const accountId = data.accountId;

    await saveDefaultTickets(accountId);
  }
}
