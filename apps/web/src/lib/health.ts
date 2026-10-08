import { isHealthResponse, type HealthResponse } from '@goease/contracts';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api').replace(/\/+$/, '');
export const HEALTH_URL = `${API_BASE_URL}/health`;

export async function fetchHealth(signal: AbortSignal): Promise<HealthResponse> {
  const response = await fetch(HEALTH_URL, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
    headers: { Accept: 'application/json' }, cache: 'no-store', credentials: 'omit',
  });
  if (!response.ok) throw new Error('API chưa trả lời thành công. Vui lòng thử lại.');
  const body: unknown = await response.json();
  if (!isHealthResponse(body)) throw new Error('Phản hồi API chưa đúng định dạng health.');
  return body;
}
