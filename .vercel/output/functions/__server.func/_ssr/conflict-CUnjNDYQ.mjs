//#region node_modules/.nitro/vite/services/ssr/assets/conflict-CUnjNDYQ.js
function findConflicts(clients, parties, cases) {
	const hits = [];
	const byCode = /* @__PURE__ */ new Map();
	for (const c of clients) {
		if (!c.nationalCode) continue;
		const list = byCode.get(c.nationalCode) ?? [];
		list.push(c);
		byCode.set(c.nationalCode, list);
	}
	for (const [code, list] of byCode) if (list.length > 1) hits.push({
		nationalCode: code,
		nameA: list[0].fullName,
		nameB: list[1].fullName,
		reason: "کد ملی در دو کارت موکل تکرار شده است."
	});
	for (const p of parties) {
		if (!p.nationalCode || p.role !== "opponent") continue;
		const client = clients.find((c) => c.nationalCode === p.nationalCode);
		if (client) {
			const cse = cases.find((c) => c.id === p.caseId);
			hits.push({
				nationalCode: p.nationalCode,
				nameA: client.fullName,
				nameB: p.fullName,
				reason: "موکل دفتر در پرونده دیگر طرف مقابل است.",
				caseTitle: cse?.title
			});
		}
	}
	return hits;
}
function lookupCode(code, clients, parties, cases) {
	return {
		clients: clients.filter((c) => c.nationalCode === code),
		parties: parties.filter((p) => p.nationalCode === code).map((p) => ({
			...p,
			caseTitle: cases.find((c) => c.id === p.caseId)?.title
		}))
	};
}
//#endregion
export { lookupCode as n, findConflicts as t };
