declare var process: {
  exit(code?: number): never;
  env: Record<string, string>;
  $disconnect?: () => Promise<void>;
};