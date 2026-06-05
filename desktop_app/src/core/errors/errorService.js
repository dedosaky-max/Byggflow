import { logEvent } from "../logging/logService";

export function reportError(error, context = {}) {
  logEvent("RUNTIME_ERROR", {
    message: error?.message,
    stack: error?.stack,
    ...context,
  });
}
