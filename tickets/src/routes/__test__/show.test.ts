import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import {
  TicketStatusEnum,
  TicketPriorityEnum,
} from "@tickets11131/ticket-tracker-common";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
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

  const response = await request(app)
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

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toBe(title);
  expect(ticketResponse.body.description).toBe(description);
  expect(ticketResponse.body.status).toBe(status);
  expect(new Date(ticketResponse.body.creationDate)).toEqual(creationDate);
  expect(ticketResponse.body.closedDate).toEqual(closedDate);
  expect(ticketResponse.body.tags).toEqual(tags);
  expect(ticketResponse.body.priority).toBe(priority);
  expect(ticketResponse.body.assigned).toEqual(assigned);
});
