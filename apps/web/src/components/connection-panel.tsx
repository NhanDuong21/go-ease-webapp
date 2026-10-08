import { useEffect, useState } from 'react';
import type { HealthResponse } from '@goease/contracts';
import { fetchHealth } from '@/lib/health';
import { Button } from '@/components/ui/button';

type ConnectionState = { kind: 'loading' } | { kind: 'success'; health: HealthResponse } | { kind: 'error'; message: string };

export function ConnectionPanel() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ConnectionState>({ kind: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    void fetchHealth(controller.signal).then((health) => {
      if (!controller.signal.aborted) setState({ kind: 'success', health });
    }).catch((error: unknown) => {
      if (!controller.signal.aborted) {
        setState({ kind: 'error', message: error instanceof Error && error.message.startsWith('Phản hồi API') ? error.message :
          'Chưa nhận được phản hồi. Kiểm tra API và kết nối mạng, rồi thử lại.' });
      }
    });
    return () => controller.abort();
  }, [attempt]);

  function retry() { setState({ kind: 'loading' }); setAttempt((value) => value + 1); }

  const title = state.kind === 'loading' ? 'Đang kết nối API…' : state.kind === 'success' ? 'API đang hoạt động' : 'Không thể kết nối API';
  return (
    <section aria-labelledby="connection-title" className="connection-card">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">KIỂM TRA KẾT NỐI</p>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">Bản nền M0</span>
      </div>
      <div className="my-8 flex items-center gap-4" role="status" aria-live="polite" aria-atomic="true">
        <span aria-hidden="true" className={`status-icon ${state.kind}`}>
          {state.kind === 'loading' ? <span className="spinner" /> : state.kind === 'success' ? '✓' : '!'}
        </span>
        <div className="min-w-0">
          <h2 id="connection-title" className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {state.kind === 'loading' ? 'Đợi một chút để kiểm tra phản hồi thật.' : state.kind === 'success' ? 'Web đã nhận phản hồi từ GoEase API.' : state.message}
          </p>
        </div>
      </div>
      <dl className="connection-details">
        <div><dt>Phạm vi</dt><dd>Chỉ tiến trình API</dd></div>
        <div><dt>Lần nhận gần nhất</dt><dd>{state.kind === 'success' ? new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(state.health.timestamp)) : 'Chưa có phản hồi'}</dd></div>
      </dl>
      <Button className="mt-6 w-full" disabled={state.kind === 'loading'} onClick={retry}>
        {state.kind === 'loading' ? 'Đang kiểm tra…' : state.kind === 'error' ? 'Thử lại' : 'Kiểm tra lại'}
        <span aria-hidden="true">↻</span>
      </Button>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Database, AI và bản đồ sẽ được kiểm chứng ở các bước tiếp theo.</p>
    </section>
  );
}
