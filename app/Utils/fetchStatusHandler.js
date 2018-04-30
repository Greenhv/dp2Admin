export default (response) => {
  if (response.status >= 400 && response.status < 200) {
    throw new Error(response.statusText);
    return;
  }

  return response;
}