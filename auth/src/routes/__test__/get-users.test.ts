import request from "supertest";
import { app } from "../../app";

jest.mock("../../events/publishers/account-created-publisher");

it("returns a 401 if not authenticated", async () => {
  await request(app).get("/api/users").send().expect(401);
});

it("returns users if authenticated", async () => {
  const cookie = await signin();

  const response = await request(app)
    .get("/api/users")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
});
