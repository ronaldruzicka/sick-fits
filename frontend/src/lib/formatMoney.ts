import { Maybe } from 'graphql/types';

export const formatMoney = (amount: Maybe<number> | undefined) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  const formatter = new Intl.NumberFormat('en-US', options);

  if (amount === null || !amount) {
    return formatter.format(0);
  }

  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  return formatter.format(amount / 100);
};
