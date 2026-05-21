export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404) {
        return env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
      }
      return response;
    } catch {
      return new Response('Not Found', { status: 404 });
    }
  },
};
