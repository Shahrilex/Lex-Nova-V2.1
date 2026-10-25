import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Attachments-BfpPLMQy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_FILE_SIZE = 20971520;
function desktopBridge() {
	return window.chrome?.webview;
}
function Attachments({ files, onChange }) {
	const input = (0, import_react.useRef)(null);
	const pendingRequest = (0, import_react.useRef)("");
	const filesRef = (0, import_react.useRef)(files);
	const onChangeRef = (0, import_react.useRef)(onChange);
	filesRef.current = files;
	onChangeRef.current = onChange;
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const bridge = desktopBridge();
		if (!bridge) return;
		const onMessage = (event) => {
			const message = event.data;
			if (message.type === "file-operation-error") {
				setError("انتخاب فایل ناموفق بود. دوباره تلاش کنید.");
				return;
			}
			if (message.type !== "files-selected" || message.requestId !== pendingRequest.current) return;
			pendingRequest.current = "";
			const chosen = (message.files ?? []).map((file) => ({
				id: file.id,
				name: file.name,
				size: file.size,
				type: file.type,
				dataUrl: `data:${file.type};base64,${file.base64}`
			}));
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
	async function addFiles(selected) {
		if (!selected?.length) return;
		const incoming = Array.from(selected);
		const oversized = incoming.find((file) => file.size > MAX_FILE_SIZE);
		if (oversized) {
			setError(`حجم هر فایل باید حداکثر ۲۰ مگابایت باشد: ${oversized.name}`);
			return;
		}
		try {
			const added = await Promise.all(incoming.map((file) => new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve({
					id: crypto.randomUUID(),
					name: file.name,
					size: file.size,
					type: file.type || "application/octet-stream",
					dataUrl: String(reader.result)
				});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-2 rounded-lg border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-navy",
						children: "پیوست‌ها"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "ذخیره روی همین دستگاه · حداکثر ۲۰ مگابایت برای هر فایل"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							const bridge = desktopBridge();
							if (bridge) {
								pendingRequest.current = crypto.randomUUID();
								bridge.postMessage({
									type: "pick-files",
									requestId: pendingRequest.current
								});
							} else input.current?.click();
						},
						className: "h-10 rounded-md bg-navy px-4 text-sm text-paper",
						children: "افزودن فایل"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: input,
						type: "file",
						multiple: true,
						accept: ".png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.pdf,.txt,*/*",
						className: "hidden",
						onChange: (event) => void addFiles(event.target.files)
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-danger",
				children: error
			}),
			files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "فایلی پیوست نشده است."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-2 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 truncate",
						children: [
							file.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									"(",
									(file.size / 1024).toFixed(0),
									" KB)"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: file.dataUrl,
							download: file.name,
							className: "text-navy underline",
							children: "دریافت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange(files.filter((item) => item.id !== file.id)),
							className: "text-danger",
							children: "حذف"
						})]
					})]
				}, file.id))
			})
		]
	});
}
//#endregion
export { Attachments as t };
