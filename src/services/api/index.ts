import { apiService } from 'ts-api-toolkit';

apiService.changeBaseUrl('http://localhost:8000/api');
apiService.changeAuthSchema('Token');

export { apiService };
