declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_AUDIENCE: string;
      JWT_ISSUER: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export {};
