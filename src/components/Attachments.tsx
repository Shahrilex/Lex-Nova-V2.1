import { useEffect, useRef, useState } from "react";
import type { FileAttachment } from "@/lib/types";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

type DesktopBridge = { postMessage: (message: unknown) => void; addEventListener: (name: "message", listener: (event: MessageEvent) => void) => void; removeEventListener: (name: "message", listener: (event: MessageEvent) => void) => void };
function desktopBridge(): DesktopBridge | undefined {
  return (window as Window & { chrome?: { webview?: DesktopBridge } }).chrome?.webview;
}

export function Attachments({ files, onChange }: { files: FileAttachment[]; onChange: (files: FileAttachment[]) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const pendingRequest = useRef("");
  const filesRef = useRef(files);
  const onChangeRef = useRef(onChange);
  filesRef.current = files;
  onChangeRef.current = onChange;
  const [error, setError] = useState("");

  useEffect(() => {
    const bridge = desktopBridge();
    if (!bridge) return;
    const onMessage = (event: MessageEvent) => {
      const message = event.data as { type?: string; requestId?: string; files?: { id: string; name: string; size: number; type: string; base64: string }[] };
      if (message.type === "file-operation-error") { setError("انتخاب فایل ناموفق بود. دوباره تلاش کنید."); return; }
      if (message.type !== "files-selected" || message.requestId !== pendingRequest.current) return;
      pendingRequest.current = "";
      const chosen = (message.files ?? []).map((file) => ({ id: file.id, name: file.name, size: file.size, type: file.type, dataUrl: `data:${file.type};base64,${file.base64}` }));
      if (chosen.some((file) => file.size > MAX_FILE_SIZE)) {
        setError("حجم هر فایل باید حداکثر ۲۰ مگابایت باشد.");
        return;
      }
      if (chosen.length) onChangeRef.current([...filesRef.current, ...chosen]);
      setError("");
    };
    bridge.addEventListener("message", onMessage);
    return () => bridge.removeEventListener("message", onMessage);
  }, []);

  async function addFiles(selected: FileList | null) {
    if (!selected?.length) return;
    const incoming = Array.from(selected);
    const oversized = incoming.find((file) => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setError(`حجم هر فایل باید حداکثر ۲۰ مگابایت باشد: ${oversized.name}`);
      return;
    }
    try {
      const added = await Promise.all(incoming.map((file) => new Promise<FileAttachment>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ id: crypto.randomUUID(), name: file.name, size: file.size, type: file.type || "application/octet-stream", dataUrl: String(reader.result) });
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      })));
      onChange([...files, ...added]);
      setError("");
    } catch {
      setError("خواندن یکی از فایل‌ها ناموفق بود.");
    } finally {
      if (input.current) input.current.value = "";
    }
  }

  return <section className="space-y-2 rounded-lg border border-line bg-surface p-4">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div><h3 className="font-semibold text-navy">پیوست‌ها</h3><p className="text-xs text-muted">ذخیره روی همین دستگاه · حداکثر ۲۰ مگابایت برای هر فایل</p></div>
      <button type="button" onClick={() => {
        const bridge = desktopBridge();
        if (bridge) {
          pendingRequest.current = crypto.randomUUID();
          bridge.postMessage({ type: "pick-files", requestId: pendingRequest.current });
        } else input.current?.click();
      }} className="h-10 rounded-md bg-navy px-4 text-sm text-paper">افزودن فایل</button>
      <input ref={input} type="file" multiple accept=".png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.pdf,.txt,*/*" className="hidden" onChange={(event) => void addFiles(event.target.files)} />
    </div>
    {error && <p role="alert" className="text-sm text-danger">{error}</p>}
    {files.length === 0 ? <p className="text-sm text-muted">فایلی پیوست نشده است.</p> : <ul className="divide-y divide-line">{files.map((file) => <li key={file.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
      <span className="min-w-0 truncate">{file.name} <span className="text-xs text-muted">({(file.size / 1024).toFixed(0)} KB)</span></span>
      <span className="flex gap-3"><a href={file.dataUrl} download={file.name} className="text-navy underline">دریافت</a><button type="button" onClick={() => onChange(files.filter((item) => item.id !== file.id))} className="text-danger">حذف</button></span>
    </li>)}</ul>}
  </section>;
}
