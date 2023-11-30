declare namespace config {
  const static: {
    root: string;
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
  const hashSettings: {
    encodingScheme: string;
  }
  const projects: {
    path: string;
  };
}
