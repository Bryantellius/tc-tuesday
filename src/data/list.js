import faker from "faker";

const seedNum = 7;
const list = [{ name: "", avatar: "" }];

for (let i = 1; i <= seedNum; i++) {
  list.push({ name: faker.name.firstName(), avatar: faker.image.avatar() });
}

export default list;
