import mongoose from "mongoose";
import { User, UserAttrs } from "./models/user";

export const users: UserAttrs[] = [
  {
    _id: "",
    accountId: "",
    email: "bobsmith@test.com",
    password: "pass1",
    first: "Bob",
    last: "Smith",
  },
  {
    _id: "",
    accountId: "",
    email: "brittanystevenson@test.com",
    password: "pass2",
    first: "Brittany",
    last: "Stevenson",
  },
  {
    _id: "",
    accountId: "",
    email: "colinandrews@test.com",
    password: "pass3",
    first: "Colin",
    last: "Andrews",
  },
  {
    _id: "",
    accountId: "",
    email: "marcellajames@test.com",
    password: "pass4",
    first: "Marcella",
    last: "James",
  },
  {
    _id: "",
    accountId: "",
    email: "howardmann@test.com",
    password: "pass5",
    first: "Howard",
    last: "Mann",
  },
  {
    _id: "",
    accountId: "",
    email: "hazeldavis@test.com",
    password: "pass6",
    first: "Hazel",
    last: "Davis",
  },
];

export const saveDefaultUsers = async (accountId: string) => {
  const usersWithAccountIds = users.map((user) => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    return { ...user, _id: userId, accountId };
  });
  const userdocs: any = [];
  usersWithAccountIds.forEach((user) => {
    const { email, password, first, last, _id, accountId } = user;
    userdocs.push(new User({ _id, email, password, first, last, accountId }));
  });
  await User.bulkSave(userdocs);
  return usersWithAccountIds;
};
