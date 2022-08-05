import { Consumer } from "sqs-consumer";
import AWS from "aws-sdk";
import https from "https";

export abstract class BaseListener {
  abstract queueUrl: string;
  abstract handleMessage(message: AWS.SQS.Message): Promise<void>;

  listen() {
    const consumer = Consumer.create({
      queueUrl: this.queueUrl,
      handleMessage: this.handleMessage,
      sqs: new AWS.SQS({
        httpOptions: {
          agent: new https.Agent({
            keepAlive: true,
          }),
        },
      }),
    });

    consumer.on("error", (error) => {
      console.error(error.message);
    });

    consumer.on("processing_error", (error) => {
      console.error(error.message);
    });

    consumer.start();
  }
}
