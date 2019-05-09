export default async function login(credential) {
  let rawRespond = await fetch('http://192.168.1.123:8080/api/login', {
    method: 'POST',
    body: JSON.stringify(credential),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let respond = await rawRespond.json();
  return respond;
}
