export default async function update(data) {
  let rawRespond = await fetch('https://lenek93.usermd.net/api/update', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let respond = await rawRespond.json();
  return respond;
}
