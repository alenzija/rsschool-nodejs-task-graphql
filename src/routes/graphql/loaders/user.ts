import { PrismaClient, SubscribersOnAuthors, User } from "@prisma/client";
import DataLoader from "dataloader";

export const userDataLoaders = (prisma: PrismaClient) => new DataLoader<string, { userSubscribedTo: User[], subscribedToUser: User[] }>(async (ids: readonly string[]) => {
  const subscribersOnAuthors = await prisma.subscribersOnAuthors.findMany({
    where: {        
      OR: [
        { 
          subscriberId: {
            in: ids as string[],
          },
        }, 
        {
          authorId: {
            in: ids as string[],   
          }
        },  
      ]
    },
  });

  const authorByIds = subscribersOnAuthors.reduce<Record<string, SubscribersOnAuthors[]>>((acc, cur) => acc[cur.subscriberId] ? {...acc, [cur.subscriberId]: [...acc[cur.subscriberId], cur]} : {...acc, [cur.subscriberId]: [cur]} ,{})
  const subscribersByIds = subscribersOnAuthors.reduce<Record<string, SubscribersOnAuthors[]>>((acc, cur) => acc[cur.authorId] ? {...acc, [cur.authorId]: [...acc[cur.authorId], cur]} : {...acc, [cur.authorId]: [cur]} ,{})

  const userIds = [...new Set([...subscribersOnAuthors.map(({ authorId }) => authorId), ...subscribersOnAuthors.map(({ subscriberId }) => subscriberId)])];
  const users =  await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      }  
    },
  });

  return ids.map((id) => ({
    userSubscribedTo: (authorByIds[id]?.map((item) => users.find(({id}) => id === item.authorId)).filter((item) => item !== undefined) ?? []) as User[],
    subscribedToUser: (subscribersByIds[id]?.map((item) => users.find(({id}) => id === item.subscriberId)).filter((item) => item !== undefined) ?? []) as User[],
  }));
});
