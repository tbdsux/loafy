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

export { findUser };
export type { UserProps };
