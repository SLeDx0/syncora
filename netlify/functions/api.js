const { handleApi, loadState, initAuthStorage } = require("../../server");

function normalizeHeaders(headers = {}) {
  return Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]));
}

function rawQuery(event) {
  if (typeof event.rawQuery === "string") return event.rawQuery;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(event.queryStringParameters || {})) {
    if (value !== undefined && value !== null) params.set(key, value);
  }
  return params.toString();
}

function eventHeader(event, name) {
  const headers = event.headers || {};
  return headers[name] || headers[name.toLowerCase()] || headers[name.toUpperCase()] || "";
}

function createRequest(event, pathname) {
  const body = event.body
    ? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8")
    : Buffer.alloc(0);
  const query = rawQuery(event);

  return {
    method: event.httpMethod || "GET",
    url: `${pathname}${query ? `?${query}` : ""}`,
    headers: normalizeHeaders(event.headers || {}),
    async *[Symbol.asyncIterator]() {
      if (body.length) yield body;
    }
  };
}

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    multiValueHeaders: {},
    body: "",
    isBase64Encoded: false,
    writeHead(statusCode, headers = {}) {
      this.statusCode = statusCode;
      for (const [key, value] of Object.entries(headers)) {
        const normalizedKey = key.toLowerCase();
        if (normalizedKey === "set-cookie") {
          this.multiValueHeaders["set-cookie"] = Array.isArray(value) ? value : [value];
        } else {
          this.headers[normalizedKey] = Array.isArray(value) ? value.join(", ") : String(value);
        }
      }
    },
    end(chunk = "") {
      if (Buffer.isBuffer(chunk)) {
        this.body = chunk.toString("base64");
        this.isBase64Encoded = true;
        return;
      }
      this.body = String(chunk);
    },
    toNetlifyResponse() {
      return {
        statusCode: this.statusCode,
        headers: this.headers,
        multiValueHeaders: this.multiValueHeaders,
        body: this.body,
        isBase64Encoded: this.isBase64Encoded
      };
    }
  };
}

function resolveUrl(event) {
  const host = eventHeader(event, "host") || "syncora.netlify.app";
  const query = rawQuery(event);
  const fallbackUrl = `https://${host}${event.path || "/api"}${query ? `?${query}` : ""}`;
  const url = new URL(event.rawUrl || fallbackUrl);
  let pathname = url.pathname;

  if (pathname.startsWith("/.netlify/functions/api")) {
    pathname = pathname.replace("/.netlify/functions/api", "/api") || "/api";
  }
  if (!pathname.startsWith("/api/") && event.pathParameters?.splat) {
    pathname = `/api/${event.pathParameters.splat}`;
  }

  url.pathname = pathname;
  return { url, pathname };
}

exports.handler = async (event) => {
  await loadState();
  await initAuthStorage();
  const { url, pathname } = resolveUrl(event);
  const req = createRequest(event, pathname);
  const res = createResponse();
  await handleApi(req, res, pathname, url);
  return res.toNetlifyResponse();
};
