"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exchangerate = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class Exchangerate {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
}
exports.Exchangerate = Exchangerate;
//# sourceMappingURL=Exchangerate.node.js.map