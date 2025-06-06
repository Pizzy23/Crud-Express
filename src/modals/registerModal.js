const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Prisma {
  async registerUser(user) {
    const newUser = await prisma.registers.create({
      data: {
        name: user.username,
        password: user.password,
        email: user.email,
      },
    });
    return newUser;
  }
}

module.exports = { Prisma };
