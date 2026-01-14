"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangerateApi = void 0;
class ExchangerateApi {
    constructor() {
        this.name = 'exchangerateApi';
        this.displayName = 'Exchange Rate API';
        this.documentationUrl = 'https://www.exchangerate-api.com/docs';
        this.properties = [
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
        this.test = {
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
}
exports.ExchangerateApi = ExchangerateApi;
//# sourceMappingURL=ExchangerateApi.credentials.js.map