import { TypeformWebhookResponse, TypeFormFieldType } from "../../types/integrations/typeform";
import { RecordDataEntry } from "../../types";
import fs from "fs";

// Takes a webhook payload from Typeform and yields a simple Record payload for the Waev endpoint
// An example Typeform payload can be found here:
// https://www.typeform.com/developers/webhooks/example-payload/

export const typeformMap = (response: TypeformWebhookResponse): RecordDataEntry =>
	response.form_response.answers.reduce((acc: RecordDataEntry, answer) => {
		const fieldType = answer.type as TypeFormFieldType;

		const question = response.form_response.definition.fields.find(
			(field) => field.id === answer.field.id,
		);

		let answerValue;

		switch (fieldType) {
			case "choices":
				answerValue = answer.choices?.labels || [];
			case "choice":
				answerValue = answer.choice?.label;
			// Leaving these for visibility on the other Typeform field options that could return:
			// case "text":
			//   answerValue = answer.text;
			// case "email":
			//   answerValue = answer.email;
			// case "text":
			//   answerValue = answer.text;
			// case "date":
			//   answerValue = answer.date;
			// case "number":
			//   answerValue = answer.number;
			// case "boolean":
			//   answerValue = answer.boolean;
			// case "url":
			//   answerValue = answer.url;
			default:
				answerValue = answer[fieldType];
		}

		acc[question!.ref] = answerValue;

		return acc;
	}, {});

export const typeformPoC = () => {
	const jsonResponse = JSON.parse(
		fs.readFileSync(
			"./services/special_integrations/forms/typeform-webhook-response.json",
			"utf8",
		),
	);
	const mappedResponse = typeformMap(jsonResponse);
  console.log("---- mappedResponse:", mappedResponse);
	return mappedResponse;
};
