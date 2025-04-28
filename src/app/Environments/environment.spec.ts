import { environment } from './environment';

describe('Environment', () => {

  it('should have production set to false', () => {
    expect(environment.production).toBeFalse();
  });

  it('should have the correct API base URL', () => {
    expect(environment.apiBaseUrl).toBe('http://localhost:7184/api/Stories');
  });

  it('should have endpoints defined', () => {
    expect(environment.endpoints).toBeDefined();
    expect(environment.endpoints.users).toBe('/stories');
  });

});
