import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { saveDefaultUsers } from "../default-users";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

jest.mock("../events/publishers/account-created-publisher.ts");

jest.mock("../default-users", () => ({
  saveDefaultUsers: jest.fn().mockImplementation(() => {}),
}));

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";
  const first = "Test";
  const last = "User";
  const demo = false;

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
      first,
      last,
      demo,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
