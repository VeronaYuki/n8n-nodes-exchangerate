import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ExchangerateApi implements ICredentialType {
	name = 'exchangerateApi';
	displayName = 'Exchange Rate API';
	documentationUrl = 'https://www.exchangerate-api.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key for the Exchange Rate API',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://v6.exchangerate-api.com/v6',
			url: '/latest/USD',
			method: 'GET',
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
