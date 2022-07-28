import request from "supertest";
import { app } from "../../app";
import {
  TicketStatusEnum,
  TicketPriorityEnum,
  User,
} from "@tickets11131/ticket-tracker-common";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      id: "1234",
      title: "Low priority ticket",
      description: "I am a ticket",
      status: TicketStatusEnum.NEW,
      creationDate: new Date(),
      closedDate: null,
      tags: ["server", ""],
      priority: TicketPriorityEnum.LOW,
      assigned: {
        id: "891234790812",
        email: "test@test.com",
        name: "Bob Smith",
      },
    })
    .expect(201);
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(`/api/tickets`).send().expect(200);

  expect(response.body.length).toEqual(3);
});
