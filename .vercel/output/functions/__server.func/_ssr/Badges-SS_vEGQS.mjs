import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C78POfLB.mjs";
import { n as deadlineTypeLabel, o as statusLabel } from "./store-CsDxLcvY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Badges-SS_vEGQS.js
var import_jsx_runtime = require_jsx_runtime();
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", status === "active" && "bg-ok/10 text-ok", status === "closed" && "bg-line text-muted", status === "draft" && "bg-warn/15 text-warn"),
		children: statusLabel[status] ?? status
	});
}
function DeadlineBadge({ type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex rounded-full bg-paper px-2 py-0.5 text-xs text-muted",
		children: deadlineTypeLabel[type] ?? type
	});
}
//#endregion
export { StatusBadge as n, DeadlineBadge as t };
