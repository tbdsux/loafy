const fetcher = (url: string) => fetch(url).then((r) => r.json());

const requester = async <T extends Record<string, any>>(url: string, method: string, body?: T) => {
  return await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
};

export default fetcher;
export { requester };
