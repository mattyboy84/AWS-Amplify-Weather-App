async function handler(req, res) {
  const { query } = req;
  const url = new URL(`${process.env.API_URL}/weather`);

  url.search = new URLSearchParams(query).toString();
  const response = await fetch(url, {
    method: req.method || 'GET',
    headers: {
      ...req.headers,
      host: url.hostname,
      Authorization: `Bearer ${process.env.API_SECRET}`,
    },
    body: req.body || undefined,
  });

  const responseData = await response.json();

  res.status(200).json(responseData);
}

export default handler;
