import prisma from "../../src/database";

export const getUserType = async (userId: string) => {
  const isDonor = await prisma.donor.findFirst({
    where: {
      fk_user: userId,
    },
  });
  const isReceiver = await prisma.receiver.findFirst({
    where: {
      fk_user: userId,
    },
  });
  const isIntermediary = await prisma.intermediary.findFirst({
    where: {
      fk_user: userId,
    },
  });
  if (isDonor) {
    return "donor";
  }
  if (isReceiver) {
    return "receiver";
  }
  if (isIntermediary) {
    return "intermediary";
  }
  throw new Error("User is not of any type");
};
