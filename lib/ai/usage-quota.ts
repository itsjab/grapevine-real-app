import type { User } from '../auth';

interface Quota {
  maxMessagesPerDay: number;
}

export const getQuotaByUserType = (user: User): Quota => {
  if (user.isAnonymous) {
    return {
      maxMessagesPerDay: 10,
    };
  }

  return {
    maxMessagesPerDay: 50,
  };
};
