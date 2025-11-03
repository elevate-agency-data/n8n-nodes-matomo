import { 
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon
} from 'n8n-workflow';

export class MatomoApi implements ICredentialType {
	name = 'matomoApi';
	displayName = 'Matomo API';
	documentationUrl = 'https://developer.matomo.org/api-reference/reporting-api';
  icon: Icon = 'file:icons/matomo.svg';
	properties: INodeProperties[] = [
    {
			displayName: 'Protocol, Domain and Path',
			name: 'domain',
			type: 'string',
			default: 'https://demo.matomo.cloud/',
			required: true,
			description: 'Protocol, domain and path for the Matomo API'
		},
		{
			displayName: 'Auth Token',
			name: 'authToken',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: 'anonymous',
			required: true,
			description: 'Auth Token for the Matomo API'
		}
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
        'Content-Type': 'application/json',	
        'Accept': 'application/json'
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
      method: 'POST',
			url: '={{$credentials.domain}}?module=API&method=API.getMatomoVersion&format=xml',
			headers: {
        'Content-Type': 'application/json',	
        'Accept': 'application/json'
			},
			body: {
        'token_auth': '={{$credentials.authToken}}'
			},
			json: true,
		},
	};
}
