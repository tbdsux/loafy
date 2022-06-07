const fetcher = (url: string) => fetch(url).then((r) => r.json());

const requester = async <T extends Record<string, any>>(url: string, body: T) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export default fetcher;
export { requester };
