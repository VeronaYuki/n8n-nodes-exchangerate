# Criando um Nó Customizado no n8n

Este readme mostra como criar um nó customizado para o n8n, passo a passo, usando o exemplo do Exchange Rate API.

## Pré-requisitos

- Node.js 18.17.0 ou superior
- npm instalado
- Conta no Exchange Rate API (ou qualquer outra API que você queira integrar)

## Passo 1: Criar o Projeto com n8n-node

O n8n fornece uma ferramenta oficial chamada `n8n-node` que facilita a criação de nós customizados.

### 1.1. Executar o comando de criação

```bash
npm create @n8n/node@latest n8n-nodes-seu-nome
```

Este comando irá:
- Criar a estrutura de diretórios necessária
- Configurar os arquivos base (package.json, tsconfig.json, etc.)
- Instalar as dependências

### 1.2. Responder às perguntas interativas

Quando executar o comando, você será perguntado:

- **Template**: Escolha `declarative/custom` (recomendado para APIs REST)
- **Base URL**: A URL base da API (ex: `https://v6.exchangerate-api.com/v6`)
- **Tipo de autenticação**: Escolha `API Key` (ou o tipo que sua API usa)

## Passo 2: Limpar Arquivos de Exemplo

O scaffold cria alguns arquivos de exemplo que você deve remover:

```bash
cd n8n-nodes-seu-nome
rm -rf nodes/ExemploNode nodes/HTTPBin
rm -rf credentials/ExampleCredentials.credentials.ts credentials/HttpBinApi.credentials.ts
```

## Passo 3: Criar o Arquivo do Nó

### 3.1. Estrutura do arquivo do nó

O arquivo principal do nó fica em `nodes/SeuNode/SeuNode.node.ts`. Exemplo:

```typescript
import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class SeuNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Nome do Nó',
		name: 'nomeDoNo',
		icon: { light: 'file:icone.svg', dark: 'file:icone.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Descrição do que o nó faz',
		defaults: {
			name: 'Nome do Nó',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'suaApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.exemplo.com/v1',
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
						name: 'Get Data',
						value: 'getData',
						action: 'Get data',
						description: 'Get data from API',
						routing: {
							request: {
								method: 'GET',
								url: '=/endpoint/{{$parameter["parametro"]}}',
							},
						},
					},
				],
				default: 'getData',
			},
			{
				displayName: 'Parâmetro',
				name: 'parametro',
				type: 'string',
				required: true,
				default: 'valor',
				description: 'Descrição do parâmetro',
			},
		],
	};
}
```

### 3.2. Explicação dos campos principais

- **displayName**: Nome que aparece na interface do n8n
- **name**: Nome interno (usado em código)
- **icon**: Caminho para o ícone do nó
- **group**: Categoria do nó (transform, input, output, etc.)
- **credentials**: Referência às credenciais necessárias
- **requestDefaults**: Configurações padrão das requisições HTTP
- **properties**: Array com os campos que aparecem na interface

## Passo 4: Criar o Arquivo de Credenciais

O arquivo de credenciais fica em `credentials/SuaApi.credentials.ts`:

```typescript
import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SuaApi implements ICredentialType {
	name = 'suaApi';
	displayName = 'Sua API';
	documentationUrl = 'https://docs.exemplo.com';
	
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
			description: 'Sua chave de API',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.exemplo.com/v1',
			url: '/test',
			method: 'GET',
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
}
```

## Passo 5: Adicionar Ícone

1. Crie ou baixe um ícone SVG
2. Salve em `nodes/SeuNode/icone.svg`
3. Opcionalmente, crie uma versão escura: `icone.dark.svg`

## Passo 6: Atualizar package.json

Atualize o `package.json` com as informações do seu nó:

```json
{
	"name": "n8n-nodes-seu-nome",
	"version": "0.1.0",
	"description": "Descrição do seu nó",
	"n8n": {
		"n8nNodesApiVersion": 1,
		"credentials": [
			"dist/credentials/SuaApi.credentials.js"
		],
		"nodes": [
			"dist/nodes/SeuNode/SeuNode.node.js"
		]
	}
}
```

## Passo 7: Compilar o Nó

```bash
npm run build
```

Este comando:
- Compila o TypeScript para JavaScript
- Copia os arquivos necessários para a pasta `dist/`

## Passo 8: Testar o Nó Localmente

### Opção 1: Usando n8n-node dev (Recomendado)

```bash
npm run dev
```

Isso irá:
- Compilar o nó automaticamente
- Iniciar o n8n com seu nó carregado
- Recarregar automaticamente quando você fizer alterações
- Abrir o n8n em `http://localhost:5678`

### Opção 2: Link Manual

```bash
# No diretório do seu nó
npm link

# No diretório custom do n8n
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
npm link n8n-nodes-seu-nome

# Iniciar n8n
n8n start
```

## Passo 9: Usar o Nó no n8n

1. Abra o n8n no navegador (`http://localhost:5678`)
2. Crie um novo workflow
3. Procure pelo nome do seu nó no painel de nós
4. Adicione o nó ao workflow
5. Configure as credenciais:
   - Clique em "Credential to connect with"
   - Selecione "Create New"
   - Preencha os campos (ex: API Key)
   - Salve
6. Configure os parâmetros do nó
7. Execute o workflow
8. Verifique o resultado

## Dicas e Boas Práticas

### Estilo Declarativo vs Programático

- **Declarativo** (recomendado): Mais simples, ideal para APIs REST. Não precisa de método `execute()`.
- **Programático**: Mais flexível, necessário para casos complexos ou quando precisa transformar dados.

### Expressões no n8n

Você pode usar expressões para valores dinâmicos:

```typescript
// Em URLs
url: '=/endpoint/{{$parameter["id"]}}'

// Em headers
Authorization: '=Bearer {{$credentials.apiKey}}'

// Em query strings (no routing)
qs: {
	date: '={{ new Date($value).toISOString() }}',
}
```

### Estrutura de Diretórios

```
n8n-nodes-seu-nome/
├── package.json
├── tsconfig.json
├── nodes/
│   └── SeuNode/
│       ├── SeuNode.node.ts      # Código principal
│       ├── SeuNode.node.json    # Metadados
│       └── icone.svg            # Ícone
├── credentials/
│   └── SuaApi.credentials.ts    # Credenciais
└── dist/                        # Arquivos compilados (gerado)
```

## Comandos Úteis

```bash
# Compilar
npm run build

# Desenvolvimento com auto-reload
npm run dev

# Verificar erros de código
npm run lint

# Corrigir erros automaticamente
npm run lint:fix


