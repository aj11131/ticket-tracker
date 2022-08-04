import { User, UserAttrs } from "./models/user";

const users: UserAttrs[] = [
  {
    _id: "62eab54baf2f7b7384cddbc1",
    email: "bobsmith@test.com",
    password: "pass1",
    first: "Bob",
    last: "Smith",
  },
  {
    _id: "62eab5a1a9d6cf01c437bf5d",
    email: "brittanystevenson@test.com",
    password: "pass2",
    first: "Brittany",
    last: "Stevenson",
  },
  {
    _id: "62eab5a6de0a61d848c00068",
    email: "colinandrews@test.com",
    password: "pass3",
    first: "Colin",
    last: "Andrews",
  },
  {
    _id: "62eab5aa8ca60be52aeb68b4",
    email: "marcellajames@test.com",
    password: "pass4",
    first: "Marcella",
    last: "James",
  },
  {
    _id: "62eab5b110697baa63a5aacf",
    email: "howardmann@test.com",
    password: "pass5",
    first: "Howard",
    last: "Mann",
  },
  {
    _id: "62eab5b56b6288743f88026c",
    email: "hazeldavis@test.com",
    password: "pass6",
    first: "Hazel",
    last: "Davis",
  },
  {
    _id: "62eab5b56b6288743f88026a",
    email: "test@test.com",
    password: "pass",
    first: "Test",
    last: "User",
  },
];

export const saveDefaultUsers = async () => {
  const userdocs: any = [];
  users.forEach((user) => {
    const { email, password, first, last, _id } = user;
    userdocs.push(new User({ _id, email, password, first, last }));
  });
  await User.bulkSave(userdocs);
};
