export function getToken() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, val] = cookie.split('=');
    acc[key] = decodeURIComponent(val);
    return acc;
  }, {} as Record<string, string>);
  
  return cookies['access_token'];
}
