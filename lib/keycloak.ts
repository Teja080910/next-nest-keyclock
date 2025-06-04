export const getToken = () => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, val] = cookie.split('=');
    acc[key] = decodeURIComponent(val);
    return acc;
  }, {} as Record<string, string>);

  const token = cookies['access_token'];
  return token;
};