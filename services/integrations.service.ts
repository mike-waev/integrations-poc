import type { Context, Service, ServiceSchema } from "moleculer";
import { mapWebhookResponse } from "./standard_integrations";
import { typeformPoC } from "./special_integrations/typeform";

export interface ActionStandardParams {
	name: string;
}

interface IntegrationsSettings {
	defaultName: string;
}

interface IntegrationsMethods {
	uppercase(str: string): string;
}

interface IntegrationsLocalVars {
	myVar: string;
}

type IntegrationsThis = Service<IntegrationsSettings> & IntegrationsMethods & IntegrationsLocalVars;

const IntegrationsService: ServiceSchema<IntegrationsSettings> = {
	name: "integrations",

	/**
	 * Settings
	 */
	settings: {
		defaultName: "Moleculer",
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		standard: {
			rest: {
				method: "GET",
				path: "/standard",
			},
			handler(this: IntegrationsThis /* , ctx: Context */): string {
				return JSON.stringify(mapWebhookResponse());
			},
		},

		typeform: {
			rest: {
				method: "GET",
				path: "/typeform",
			},
			handler(this: IntegrationsThis, ctx: Context<ActionStandardParams>): string {
				return JSON.stringify(typeformPoC());
			},
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created(this: IntegrationsThis) {},

	/**
	 * Service started lifecycle event handler
	 */
	async started(this: IntegrationsThis) {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped(this: IntegrationsThis) {},
};

export default IntegrationsService;
