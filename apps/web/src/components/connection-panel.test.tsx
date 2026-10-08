import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ConnectionPanel } from './connection-panel';
import { HEALTH_URL } from '@/lib/health';

const health = { status: 'ok', service: 'goease-api', scope: 'api-only', timestamp: '2026-10-08T08:00:00.000Z' };

describe('màn kết nối API (fetch double, không phải smoke thật)', () => {
  it('hiển thị tải, gọi đúng URL rồi hiển thị success có phạm vi', async () => {
    let resolve!: (response: Response) => void;
    const fetchMock = vi.fn(() => new Promise<Response>((done) => { resolve = done; }));
    vi.stubGlobal('fetch', fetchMock);
    render(<ConnectionPanel />);
    expect(screen.getByRole('heading', { name: 'Đang kết nối API…' })).toBeVisible();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledWith(HEALTH_URL, expect.objectContaining({ credentials: 'omit', cache: 'no-store' }));
    resolve(new Response(JSON.stringify(health)));
    expect(await screen.findByRole('heading', { name: 'API đang hoạt động' })).toBeVisible();
    expect(screen.getByText('Chỉ tiến trình API')).toBeVisible();
  });

  it('API tắt không báo success; thử lại có thể phục hồi', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new TypeError('Failed to fetch')).mockResolvedValueOnce(new Response(JSON.stringify(health)));
    vi.stubGlobal('fetch', fetchMock);
    render(<ConnectionPanel />);
    expect(await screen.findByRole('heading', { name: 'Không thể kết nối API' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'API đang hoạt động' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Thử lại/ }));
    expect(await screen.findByRole('heading', { name: 'API đang hoạt động' })).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['HTTP lỗi', () => new Response('{}', { status: 503 })],
    ['contract sai', () => new Response(JSON.stringify({ status: 'ok' }))],
    ['JSON sai', () => new Response('<html>offline</html>')],
  ])('từ chối %s', async (_name, response) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response()));
    render(<ConnectionPanel />);
    expect(await screen.findByRole('heading', { name: 'Không thể kết nối API' })).toBeVisible();
  });

  it('hủy request khi rời màn hình', async () => {
    let signal: AbortSignal | undefined;
    vi.stubGlobal('fetch', vi.fn((_url: string, options: RequestInit) => {
      signal = options.signal as AbortSignal;
      return new Promise<Response>(() => {});
    }));
    const { unmount } = render(<ConnectionPanel />);
    unmount();
    await waitFor(() => expect(signal?.aborted).toBe(true));
  });
});
