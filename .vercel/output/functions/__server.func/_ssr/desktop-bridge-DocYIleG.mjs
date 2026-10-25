//#region node_modules/.nitro/vite/services/ssr/assets/desktop-bridge-DocYIleG.js
function getDesktopBridge() {
	return window.chrome?.webview;
}
function askDesktopAi(data) {
	const bridge = getDesktopBridge();
	if (!bridge) return null;
	const activeBridge = bridge;
	const requestId = crypto.randomUUID();
	return new Promise((resolve) => {
		const finish = (result) => {
			window.clearTimeout(timer);
			activeBridge.removeEventListener("message", onMessage);
			resolve(result);
		};
		const timer = window.setTimeout(() => finish({
			ok: false,
			error: "زمان پاسخ هوش مصنوعی به پایان رسید."
		}), 125e3);
		const onMessage = (event) => {
			const result = event.data;
			if (result.requestId !== requestId || !["ai-response", "ai-operation-error"].includes(result.type ?? "")) return;
			finish(result.ok === true && result.text ? {
				ok: true,
				text: result.text,
				citations: result.citations
			} : {
				ok: false,
				error: result.error ?? "درخواست هوش مصنوعی ناموفق بود."
			});
		};
		activeBridge.addEventListener("message", onMessage);
		activeBridge.postMessage({
			type: "ask-ai",
			requestId,
			...data
		});
	});
}
//#endregion
export { getDesktopBridge as n, askDesktopAi as t };
