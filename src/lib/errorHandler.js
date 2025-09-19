// Extract only API / Axios errors. Return null for non-Axios errors so callers
// can decide how to handle them.
export function extractApiError(error) {
  if (!error) return null;

  // Prefer axios detection (isAxiosError) but also accept any error with a response
  const isAxios = Boolean(error.isAxiosError || error.response);
  if (!isAxios) return null;

  const res = error.response;
  const data = res?.data;

  if (data) {
    if (typeof data === "string") return data;
    if (data.message) return data.message;

    // Validation errors shape: { errors: { field: ["msg"] } }
    if (data.errors && typeof data.errors === "object") {
      // If errors is an array (e.g. [{ msg: '...' }]) extract messages
      if (Array.isArray(data.errors)) {
        const errors = [];
        for (const item of data.errors) {
          if (!item) continue;
          if (typeof item === "string") errors.push(item);
          else if (typeof item === "object") {
            if (item.msg) errors.push(item.msg);
            else if (item.message) errors.push(item.message);
            else if (typeof item === "object") {
              // Fallback: try to stringify a path/message pair if present
              if (item.path && item.type && item.msg) errors.push(item.msg);
            }
          }
        }
        return errors.length ? errors : null;
      }

      // Fallback for object map shape: { errors: { field: ["msg"] } }
      const errors = [];
      for (const key in data.errors) {
        const val = data.errors[key];
        if (Array.isArray(val)) errors.push(...val);
        else if (typeof val === "string") errors.push(val);
      }
      return errors.length ? errors : null;
    }
  }

  // Fallback to response status text or a generic message
  return (
    res?.statusText || `Request failed${res?.status ? ` (${res.status})` : ""}`
  );
}

export default extractApiError;
