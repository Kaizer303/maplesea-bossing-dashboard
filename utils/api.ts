import ky from "https://esm.sh/ky@1.7.0";
import { camelCase, snakeCase } from "https://deno.land/x/case@2.2.0/mod.ts";

function convertKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = snakeCase(key);
      acc[snakeKey] = convertKeysToSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = camelCase(key);
      acc[camelKey] = convertKeysToCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

const api = ky.create({
  prefixUrl: "https://maple-rs-production.up.railway.app/",
  hooks: {
    beforeRequest: [
      (request) => {
        const { body, method } = request;
        if (
          body && (method === "POST" || method === "PUT" || method === "PATCH")
        ) {
          const jsonBody = JSON.parse(body as unknown as string);
          const snakeCaseBody = convertKeysToSnakeCase(jsonBody);
          return new Request(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(snakeCaseBody),
            credentials: request.credentials,
            mode: request.mode,
            cache: request.cache,
            redirect: request.redirect,
            referrer: request.referrer,
            referrerPolicy: request.referrerPolicy,
            integrity: request.integrity,
          });
        }
        return request;
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const json = await response.json();
          const camelCaseJson = convertKeysToCamelCase(json);

          return new Response(JSON.stringify(camelCaseJson), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          });
        }

        return response;
      },
    ],
  },
});

export default api;
