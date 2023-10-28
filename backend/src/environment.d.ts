declare global {
  namespace NodeJs {
    interface ProcessEnv {
      token_key: string;
    }
  }
}
export {};
