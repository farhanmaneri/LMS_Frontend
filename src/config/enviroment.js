// Create: src/config/environment.js
const getApiBaseUrl = () => {
  // Method 1: Check if we're in development mode
  if (import.meta.env.DEV) {
    return "http://localhost:5000/api";
  }

  // Method 2: Check the hostname
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:5000/api";
  }

  // Method 3: Check if there's an explicit environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Default to production
  return "https://lms-backend-rho-steel.vercel.app/api";
};

export const config = {
  apiBaseUrl: getApiBaseUrl(),
  environment: import.meta.env.DEV ? "development" : "production",
  isProduction: !import.meta.env.DEV,
  isDevelopment: import.meta.env.DEV,
};

// Debug logging (remove in production)
console.log("🔧 Environment Configuration:", {
  apiBaseUrl: config.apiBaseUrl,
  environment: config.environment,
  hostname: window.location.hostname,
  isDev: import.meta.env.DEV,
  envVars: {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
  },
});
