import { MemberType, Post, PrismaClient, Profile, User } from "@prisma/client";
import DataLoader from "dataloader";

export type Context = {
  prisma: PrismaClient;
  loaders: {
    memberTypeLoader: DataLoader<string, MemberType | null, string>,
    profileLoader: DataLoader<string, Profile | null, string>,
    postsLoader: DataLoader<string, Post[], string>,
    userLoaders: DataLoader<string, { userSubscribedTo: User[], subscribedToUser: User[] }, string>,
  }
}
