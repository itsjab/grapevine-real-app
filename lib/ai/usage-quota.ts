import type { UserWithAnonymous } from 'better-auth/plugins';

interface Quota {
  maxMessagesPerDay: number;
}

export const getQuotaByUserType = (user: UserWithAnonymous): Quota => {
  if (user.isAnonymous) {
    return {
      maxMessagesPerDay: 20,
    };
  }

  return {
    maxMessagesPerDay: 100,
  };
};
