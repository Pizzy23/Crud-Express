const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Prisma {
  async loginUser(user) {
    const loginUser = await prisma.registers.findFirst({
      where: {
        email: user.email,
      },
    });
    return loginUser;
  }
}

module.exports = { Prisma };
