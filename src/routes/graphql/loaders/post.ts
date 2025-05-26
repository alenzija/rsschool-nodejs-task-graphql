import { Post, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const postsDataLoader = (prisma: PrismaClient) => new DataLoader<string, Post[]>(async (ids: readonly string[]) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: ids as string[],
      }
    }
  });
  const postsByUserIds = posts.reduce<Record<string, Post[]>>((acc, cur) => acc[cur.authorId] ? { ...acc, [cur.authorId]: [...acc[cur.authorId], cur]}: {...acc, [cur.authorId]: [cur]}, {});
  return ids.map((id) => postsByUserIds[id] ?? []);
});

