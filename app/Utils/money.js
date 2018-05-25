const currencies = {
  'PE': 'S/',
  'US': 'US$',
};

let activeCurrency = 'S/';

export const setCurrency = (type) => {
  activeCurrency = currencies[type];
};

export const transformToMoney = price => `${activeCurrency}${parseFloat(price).toFixed(2)}`;

export const applyDiscount = (initialPrice, discount) => {
  const discountParsed = parseFloat(discount).toFixed(2)/100;
  const initialPricePrrsed = parseFloat(initialPrice).toFixed(2);

  return transformToMoney(initialPrice - (initialPrice * discountParsed));
};
