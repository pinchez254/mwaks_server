import faker from 'faker';

import Event from '../models/Event';
import User from '../models/User';

const EVENTS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
  try {
    await Event.remove();
    await User.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      });

      await Array.from({ length: EVENTS_TOTAL }).forEach(
        async () => await Event.create({ text: faker.lorem.sentence(), user: user._id }),
      );
    });
  } catch (error) {
    throw error;
  }
};
