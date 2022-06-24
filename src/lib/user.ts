import { prisma } from './prisma';

interface UserProps {
  email: string;
  username: string;
  id: number;
}

const findUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      email: true,
      username: true,
      id: true,
      password: true
    }
  });

  return user;
};

const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      email: true,
      username: true,
      id: true,
      password: true
    }
  });
};

const updateUserUsername = async (userid: number, newUsername: string) => {
  return await prisma.user.update({
    where: {
      id: userid
    },
    data: {
      username: newUsername
    }
  });
};

const updateUserEmail = async (userid: number, newEmail: string) => {
  return await prisma.user.update({
    where: {
      id: userid
    },
    data: {
      email: newEmail
    }
  });
};

const updateUserPassword = async (userid: number, newPassword: string) => {
  return await prisma.user.update({
    where: {
      id: userid
    },
    data: {
      password: newPassword
    }
  });
};

export { findUser, findUserById, updateUserUsername, updateUserEmail, updateUserPassword };
export type { UserProps };
