import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

import {
  TicketStatusEnum,
  TicketPriorityEnum,
} from "@tickets11131/ticket-tracker-common";

it("returns a 404 if the provided id does not exist", async () => {
  const id = 1000;
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
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
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = 1000;
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
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
    .expect(401);
});

it("returns a 400 if the user provides an invalid title", async () => {
  const cookie = global.signin();
  const id = 1000;
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", cookie)
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
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
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
    });

  const title = "Medium priority ticket";
  const description = "I am a ticket 2";
  const status = TicketStatusEnum.ACTIVE;
  const creationDate = new Date();
  const closedDate = new Date();
  const tags = ["server", "help"];
  const priority = TicketPriorityEnum.MEDIUM;
  const assigned = {
    id: "2",
    email: "test@test.com",
    name: "Bob Smith",
  };

  await request(app)
    .put(`/api/tickets/${response.body.ticketId}`)
    .set("Cookie", cookie)
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
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.ticketId}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toBe(title);
  expect(ticketResponse.body.description).toBe(description);
  expect(ticketResponse.body.status).toBe(status);
  expect(new Date(ticketResponse.body.creationDate)).toEqual(creationDate);
  expect(new Date(ticketResponse.body.closedDate)).toEqual(closedDate);
  expect(ticketResponse.body.tags).toEqual(tags);
  expect(ticketResponse.body.priority).toBe(priority);
  expect(ticketResponse.body.assigned).toEqual(assigned);
});
