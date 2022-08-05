import { User, UserAttrs } from "./models/user";

export const users: UserAttrs[] = [
  {
    _id: "62eab54baf2f7b7384cddbc1",
    accountId: "",
    email: "bobsmith@test.com",
    password: "pass1",
    first: "Bob",
    last: "Smith",
  },
  {
    _id: "62eab5a1a9d6cf01c437bf5d",
    accountId: "",
    email: "brittanystevenson@test.com",
    password: "pass2",
    first: "Brittany",
    last: "Stevenson",
  },
  {
    _id: "62eab5a6de0a61d848c00068",
    accountId: "",
    email: "colinandrews@test.com",
    password: "pass3",
    first: "Colin",
    last: "Andrews",
  },
  {
    _id: "62eab5aa8ca60be52aeb68b4",
    accountId: "",
    email: "marcellajames@test.com",
    password: "pass4",
    first: "Marcella",
    last: "James",
  },
  {
    _id: "62eab5b110697baa63a5aacf",
    accountId: "",
    email: "howardmann@test.com",
    password: "pass5",
    first: "Howard",
    last: "Mann",
  },
  {
    _id: "62eab5b56b6288743f88026c",
    accountId: "",
    email: "hazeldavis@test.com",
    password: "pass6",
    first: "Hazel",
    last: "Davis",
  },
  {
    _id: "62eab5b56b6288743f88026a",
    accountId: "",
    email: "test@test.com",
    password: "password1234!",
    first: "Test",
    last: "User",
  },
];

export const saveDefaultUsers = async (accountId: string) => {
  const usersWithAccountIds = users.map((user) => ({ ...user, accountId }));

  const userdocs: any = [];
  usersWithAccountIds.forEach((user) => {
    const { email, password, first, last, _id, accountId } = user;
    userdocs.push(new User({ _id, email, password, first, last, accountId }));
  });
  await User.bulkSave(userdocs);
};
