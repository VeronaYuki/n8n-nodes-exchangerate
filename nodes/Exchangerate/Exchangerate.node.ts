import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class Exchangerate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Exchange Rate',
		name: 'exchangeRate',
		icon: 'file:capimlogo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Get exchange rates from Exchange Rate API v6',
		defaults: {
			name: 'Exchange Rate',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'exchangerateApi', required: true }],
		requestDefaults: {
			baseURL: 'https://v6.exchangerate-api.com/v6',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Rates',
						value: 'getRates',
						action: 'Get exchange rates',
						description: 'Get exchange rates for a base currency',
						routing: {
							request: {
								method: 'GET',
								url: '=/latest/{{$parameter["currency"]}}',
							},
						},
					},
				],
				default: 'getRates',
			},
			{
				displayName: 'Base Currency',
				name: 'currency',
				type: 'string',
				required: true,
				default: 'USD',
				placeholder: 'e.g. USD',
				description: 'The base currency code (e.g., USD, BRL, EUR)',
			},
		],
	};
}
