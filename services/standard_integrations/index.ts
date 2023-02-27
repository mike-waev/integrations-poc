import { parse } from "yaml";
import fs from "fs";

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;
type Json = Record<string, JSONValue>;

const getPath = (json: JSON, path: string): Json =>
	// @ts-ignore
	path.split(".").reduce((acc: Json, p) => acc && acc[p], json);

export const mapWebhookResponse = () => {
	const file = fs.readFileSync("./services/standard_integrations/forms/test.yaml", "utf8");
	const jsonResponse = JSON.parse(
		fs.readFileSync(
			"./services/standard_integrations/forms/text-example-response.json",
			"utf8",
		),
	);
	const parsed = parse(file);

	let mappedResponse: Json = {};

	if (parsed.Blob) {
		parsed.Blob.forEach((blob: string) =>
			Object.assign(mappedResponse, getPath(jsonResponse, blob)),
		);
	}

	if (parsed.KeyValue) {
		const keyValuePaths = Object.keys(parsed.KeyValue);
		keyValuePaths.forEach((keyValuePath: string) => {
			const item = getPath(jsonResponse, keyValuePath);

			if (parsed.KeyValue[keyValuePath].key) {
				// If a static key is defined, add it to our mapped response
				mappedResponse[parsed.KeyValue[keyValuePath].key] = item;
				return;
			}

			if (item.length) {
				// @ts-ignore
				(item as Record<string, JsonValue>[]).forEach((obj) => {
					const k = obj[parsed.KeyValue[keyValuePath].dynamicKey] as string;
					const v = obj[parsed.KeyValue[keyValuePath].value];
					mappedResponse[k] = v;
				});
			} else {
				// Item is an object
				const k = item[parsed.KeyValue[keyValuePath].dynamicKey] as string;
				const v = item[parsed.KeyValue[keyValuePath].value];
				mappedResponse[k] = v;
			}
		});
	}
	console.log("---- mappedResponse:", mappedResponse);
	return mappedResponse;
};
