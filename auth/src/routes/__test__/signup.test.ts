import request from "supertest";
import { app } from "../../app";
import { saveDefaultUsers } from "../../default-users";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      first: "Test",
      last: "User",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "password",
      first: "Test",
      last: "User",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pas",
      first: "Test",
      last: "User",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
});

it("returns a 400 with missing first or last name", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      first: "Test",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      last: "User",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      first: "Test",
      last: "User",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      first: "Test",
      last: "User",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      first: "Test",
      last: "User",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("creates demo users and publishes event if demo mode is selected", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      first: "Test",
      last: "User",
      demo: true,
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
  expect(saveDefaultUsers).toBeCalledTimes(1);
});
