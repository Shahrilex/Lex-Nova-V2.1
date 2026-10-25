type WebViewBridge = {
  postMessage: (message: unknown) => void;
  addEventListener: (name: "message", listener: (event: MessageEvent) => void) => void;
  removeEventListener: (name: "message", listener: (event: MessageEvent) => void) => void;
};

export function getDesktopBridge(): WebViewBridge | undefined {
  return (window as Window & { chrome?: { webview?: WebViewBridge } }).chrome?.webview;
}

export function askDesktopAi(data: { query: string; officeBrief: string; messages: { role: string; content: string }[]; sources: { id: string; title: string; article: string; summary: string }[] }) {
  const bridge = getDesktopBridge();
  if (!bridge) return null;
  const activeBridge = bridge;
  const requestId = crypto.randomUUID();
  return new Promise<{ ok: true; text: string; citations?: { id: string; title: string; article: string; summary: string }[] } | { ok: false; error: string }>((resolve) => {
    const finish = (result: { ok: true; text: string; citations?: { id: string; title: string; article: string; summary: string }[] } | { ok: false; error: string }) => {
      window.clearTimeout(timer);
      activeBridge.removeEventListener("message", onMessage);
      resolve(result);
    };
    const timer = window.setTimeout(() => finish({ ok: false, error: "زمان پاسخ هوش مصنوعی به پایان رسید." }), 125_000);
    const onMessage = (event: MessageEvent) => {
      const result = event.data as { type?: string; requestId?: string; ok?: boolean; text?: string; error?: string; citations?: { id: string; title: string; article: string; summary: string }[] };
      if (result.requestId !== requestId || !["ai-response", "ai-operation-error"].includes(result.type ?? "")) return;
      finish(result.ok === true && result.text ? { ok: true, text: result.text, citations: result.citations } : { ok: false, error: result.error ?? "درخواست هوش مصنوعی ناموفق بود." });
    };
    activeBridge.addEventListener("message", onMessage);
    activeBridge.postMessage({ type: "ask-ai", requestId, ...data });
  });
}
