import { apiService } from 'ts-api-toolkit';

apiService.changeBaseUrl('https://conduit.productionready.io/api');
apiService.changeAuthSchema('Token');

export { apiService };
