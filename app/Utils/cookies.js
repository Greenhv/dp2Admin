/**
 * values[0] : Cookie name and value concatenated`
 * values[1] : Cookie name
 * values[2] : Cookie value
*/
export const getCookie = (name) => {
  const result = {};

  document.cookie.split(';').forEach((cookie) => {
    const values = cookie.trim().match(/(\w+)=(.*)/);

    if (values && name === values[1]) {
      result[values[1]] = values[2];
    }
  });

  if (Object.keys(result) < 1) {
    return null;
  }

  return result;
};

/**
 * values[0] : Cookie name and value concatenated
 * values[1] : Cookie name
 * values[2] : Cookie value
*/
export const getAll = () => {
  const cookies = {};

  document.cookie.split(';').forEach((cookie) => {
    const values = cookie.trim().match(/(\w+)=(.*)/);

    if (values !== undefined) {
      cookies[values[1]] = decodeURIComponent(values[2]);
    }
  });

  return cookies;
};

/**
 * expDate : Must be an UTC date.
*/
export const setCookie = (name, value, expDays = 1, expDate = '') => {
  if (!name || !value) {
    console.warn('You must pass the first two parameters (name and value) of the cookie');
    return;
  }

  const expDateWithDays = new Date();
  const offSet = expDays * 24 * 60 * 60 * 1000;

  expDateWithDays.setTime(expDateWithDays.getTime() + offSet);

  document.cookie = `${name}=${value};expires=${expDate || expDateWithDays.toUTCString()};path=/`;
};
