declare namespace config {
  const static: {
    port: number;
  };
  const api: {
    port: number;
    host: number;
    transport: 'http' | 'https' | 'ws';
  };
  const sandbox: {
    timeout: number;
    displayErrors: boolean;
  };
  const dbPool: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  const pg: {
    database: string;
    user: string;
    password: string;
  };
  const hashSettings: {
    encodingScheme: string;
  }
}
