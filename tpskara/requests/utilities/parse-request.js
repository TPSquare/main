export default function parseRequest(rawRequest) {
  const [id, request] = rawRequest.split(":");
  return {
    id,
    request: request?.trim(),
  };
}
