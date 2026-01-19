import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function extractError(err) {
  try {
    const data = err?.response?.data;
    if (data) {
      if (typeof data.error === 'string') return data.error;
      if (typeof data.message === 'string') return data.message;
      if (data.error && typeof data.error.message === 'string') return data.error.message;
      if (data.message && typeof data.message.message === 'string') return data.message.message;
      if (typeof data.error === 'object') return JSON.stringify(data.error);
      if (typeof data.message === 'object') return JSON.stringify(data.message);
    }
    if (err?.message) return String(err.message);
    return 'An error occurred';
  } catch (e) {
    return 'An error occurred';
  }
}
