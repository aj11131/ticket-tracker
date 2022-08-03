import { User, UserAttrs } from "./models/user";

const users: UserAttrs[] = [
  {
    email: "bobsmith@test.com",
    password: "pass1",
    first: "Bob",
    last: "Smith",
  },
  {
    email: "brittanystevenson@test.com",
    password: "pass2",
    first: "Brittany",
    last: "Stevenson",
  },
  {
    email: "colinandrews@test.com",
    password: "pass3",
    first: "Colin",
    last: "Andrews",
  },
  {
    email: "marcellajames@test.com",
    password: "pass4",
    first: "Marcella",
    last: "James",
  },
  {
    email: "howardmann@test.com",
    password: "pass5",
    first: "Howard",
    last: "Mann",
  },
  {
    email: "hazeldavis@test.com",
    password: "pass6",
    first: "Hazel",
    last: "Davis",
  },
];

export const saveDefaultUsers = async () => {
  const userdocs: any = [];
  users.forEach((user) => {
    const { email, password, first, last } = user;
    userdocs.push(new User({ email, password, first, last }));
  });
  await User.bulkSave(userdocs);
};
