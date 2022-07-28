import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";
import {
  TicketStatusEnum,
  TicketPriorityEnum,
  User,
} from "@tickets11131/ticket-tracker-common";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
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
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
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
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "Low priority ticket";
  const description = "I am a ticket";
  const status = TicketStatusEnum.NEW;
  const creationDate = new Date();
  const closedDate = null;
  const tags = ["server", ""];
  const priority = TicketPriorityEnum.LOW;
  const assigned = {
    id: "891234790812",
    email: "test@test.com",
    name: "Bob Smith",
  };

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      description,
      status,
      creationDate,
      closedDate,
      tags,
      priority,
      assigned,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toBe(1);
  expect(tickets[0].title).toBe(title);
  expect(tickets[0].description).toBe(description);
  expect(tickets[0].status).toBe(status);
  expect(tickets[0].creationDate).toEqual(creationDate);
  expect(tickets[0].closedDate).toEqual(closedDate);
  expect(tickets[0].tags).toEqual(tags);
  expect(tickets[0].priority).toBe(priority);
  expect(tickets[0].assigned).toEqual(assigned);
});

// it("publishes an event", async () => {
//   const title = "Test";

//   await request(app)
//     .post("/api/tickets")
//     .set("Cookie", global.signin())
//     .send({ title, price: 20 })
//     .expect(201);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });
