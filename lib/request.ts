import { parse, type BaseSchema, type BaseIssue } from 'valibot';
import { useUserStore } from '@/store/userStore';

type GenericSchema = BaseSchema<unknown, unknown, BaseIssue<unknown>>;

type RequestOptions = Omit<RequestInit, 'body'> & {
  schema?: GenericSchema;
  body?: unknown;
};

async function fetcher<T>(url: string, options: RequestOptions & { method: string }): Promise<T> {
  const { schema, body, method, ...fetchOptions } = options;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...fetchOptions.headers },
    body: body ? JSON.stringify(body) : undefined,
    ...fetchOptions,
  });

  if (!res.ok) {
    if (res.status === 401) {
      useUserStore.getState().logout();
    }
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? `Request failed with status ${res.status}`);
  }

  const data: T = await res.json();

  if (schema) {
    return parse(schema, data) as T;
  }

  return data;
}

export const request = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetcher<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetcher<T>(url, { ...options, method: 'POST' });
  },
  put<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetcher<T>(url, { ...options, method: 'PUT' });
  },
  patch<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetcher<T>(url, { ...options, method: 'PATCH' });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetcher<T>(url, { ...options, method: 'DELETE' });
  },
};
