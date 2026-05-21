export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const notFound = new Request(`${url.origin}/index.html`, request);

    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.startsWith('/assets/')) {
        return env.ASSETS.fetch(notFound);
      }
      return response;
    } catch {
      return env.ASSETS.fetch(notFound);
    }
  },
};
