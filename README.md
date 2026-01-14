# n8n-nodes-exchangerate

This is an n8n community node that integrates with the Exchange Rate API v6. It allows you to get exchange rates for different currencies in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Compatibility](#compatibility) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Local Development

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the node: `npm run build`
4. Link the package: `npm link`
5. Install in n8n custom directory: `npm link n8n-nodes-exchangerate` (in `~/.n8n/custom/`)
6. Start n8n: `n8n start`

Or use the dev command for automatic rebuilding:
```bash
npm run dev
```

## Operations

### Get Rates

Get exchange rates for a base currency. Returns conversion rates for all supported currencies.

**Parameters:**
- **Base Currency** (required): The currency code to get rates for (e.g., USD, BRL, EUR)
  - Default: USD
  - Example values: USD, BRL, EUR, GBP, JPY

**Output:**
Returns an object containing:
- `result`: "success"
- `base_code`: The base currency code
- `conversion_rates`: Object with currency codes as keys and exchange rates as values

## Credentials

### Exchange Rate API

To use this node, you need an API key from the Exchange Rate API.

**Prerequisites:**
- Sign up at [Exchange Rate API](https://www.exchangerate-api.com/) to get a free API key

**Setup:**
1. In your n8n workflow, add the Exchange Rate node
2. Click on "Credential to connect with" and select "Create New"
3. Enter your Exchange Rate API key
4. Click "Save" to store the credentials

**API Key:**
- The API key is sent as part of the URL path (not as a header or query parameter)
- Free tier API keys are available from Exchange Rate API

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Tested with**: n8n 1.0.0+
- **Node.js version**: 18.17.0 or higher

## Usage

### Example Workflow

1. Add a **Start** node to your workflow
2. Add an **Exchange Rate** node
3. Configure the node:
   - Select your Exchange Rate API credentials
   - Set **Base Currency** to the currency you want rates for (e.g., "USD")
4. Execute the workflow

### Example Output

```json
{
  "result": "success",
  "base_code": "USD",
  "conversion_rates": {
    "USD": 1,
    "BRL": 5.25,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 150.50
  }
}
```

### Using in Expressions

You can use the output in subsequent nodes:

```javascript
// Get BRL rate from USD
{{ $json.conversion_rates.BRL }}

// Get EUR rate from USD
{{ $json.conversion_rates.EUR }}
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Exchange Rate API Documentation](https://www.exchangerate-api.com/docs)
* [Exchange Rate API Overview](https://www.exchangerate-api.com/docs/overview)

## Version history

### 0.1.0

- Initial release
- Get Rates operation
- Support for all Exchange Rate API v6 currencies
