import faker from "faker";

const seedNum = 10;
const list = [];

for (let i = 1; i <= seedNum; i++) {
  list.push({
    id: faker.random.alphaNumeric(),
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    title: faker.name.jobTitle(),
    task: faker.lorem.sentence(),
  });
}

export default list;
