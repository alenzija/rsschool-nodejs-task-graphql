import { Profile, User } from "@prisma/client";

export const isUser = (data: unknown): data is User  => {
  return typeof data === 'object' 
          && data !== null 
          && 'id' in data 
          && 'name' in data 
          && 'balance' in data 
}

export const isProfile = (data: unknown): data is Profile  => {
  return typeof data === 'object' 
          && data !== null 
          && 'isMale' in data 
          && 'yearOfBirth' in data 
          && 'userId' in data
          && 'memberTypeId' in data 
}