import { MemberType, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const memberTypeDataLoader = (prisma: PrismaClient) => new DataLoader<string, MemberType>(async (ids: readonly string[]) => {
  const memberTypes = await prisma.memberType.findMany({
    where: {
      id: {
        in: ids as string[],
      }
    }
  });
  const memberTypesByIds = memberTypes.reduce<Record<string, MemberType>>((acc, cur) => acc[cur.id] ? acc : {...acc, [cur.id]: cur}, {});
  return ids.map((id) => memberTypesByIds[id]);
});

