export default async function login(credential) {
  let rawRespond = await fetch('http://localhost:8080/api/login', {
    method: 'POST',
    body: JSON.stringify(credential),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let respond = await rawRespond.json();
  return respond;
}
