import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL_VISOR_TV = import.meta.env.VISOR_TV_API_URL;

// --- Handlers ---
const requestHandler = async (request: InternalAxiosRequestConfig) => {
  try {
    request.headers["x-api-key"] = import.meta.env.VITE_APIKEY;
    const userAgent = navigator.userAgent;
    request.headers["user-agent"] = userAgent;
  } catch (error) {
    console.error("Error setting request headers", error);
  }
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  if (response.status === 401) {
    // Manejar redirección en caso de no autorizado
    console.log("Unauthorized: Redirect to /login");
  }
  return response;
};

const errorHandler = (error: AxiosError) => {
  return Promise.reject(error);
};

export function responseErrorHandler(error: unknown) {
  if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 401:
        console.error("Unauthorized", error);
        break;
      case 403:
        console.error("Forbidden", error);
        break;
      case 404:
        console.error("Not Found", error);
        break;
      case 429:
        console.error("Too many requests", error);
        break;
      case 500:
        console.error("Server error", error);
        break;
      default:
        console.error("Error", error);
    }
  }
  return Promise.reject(error);
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError | undefined)?.isAxiosError ?? false;
}

// --- Interceptores para las instancias de Axios ---
function addInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );
  instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => responseErrorHandler(error)
  );
}

type InstanceType = "AUTH" | "USER" | "SCREEN";

const PREFIX = {
  BASE_URL_VISOR_TV,
  AUTH: import.meta.env.PREFIX_AUTH,
  USER: import.meta.env.PREFIX_USER,
  SCREEN: import.meta.env.PREFIX_SCREEN,
};

const createInstance = (type: InstanceType) => {
  const instance = axios.create({
    baseURL: `${BASE_URL_VISOR_TV}/${PREFIX[type]}`,
  });

  addInterceptors(instance);
  return instance;
};

const API = {
  AUTH: createInstance("AUTH"),
  USER: createInstance("USER"),
  SCREEN: createInstance("SCREEN"),
};

export { API, PREFIX };
