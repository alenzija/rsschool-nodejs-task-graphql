import { PrismaClient, Profile } from "@prisma/client";
import DataLoader from "dataloader";

export const profileDataLoader = (prisma: PrismaClient) => new DataLoader<string, Profile | null>(async (ids: readonly string[]) => {
  const profiles = await prisma.profile.findMany({
    where: {
      userId: {
        in: ids as string[],
      }
    }
  });
  const profilesByUserIds = profiles.reduce<Record<string, Profile>>((acc, cur) => acc[cur.userId] ? acc: {...acc, [cur.userId]: cur}, {});
  return ids.map((id) => profilesByUserIds[id]);
});

