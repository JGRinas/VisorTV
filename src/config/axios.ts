import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "~/store";

// Acceder a las variables de entorno correctamente
const BASE_URL_VISOR_TV = import.meta.env.VITE_VISOR_TV_API_URL;

// --- Handlers ---
const requestHandler = async (request: InternalAxiosRequestConfig) => {
  try {
    const state = store.getState();
    const token = state.auth.token; // Asumiendo que tu slice se llama authReducer

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`; // Añadir el token al header
    }
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

// Acceder a los prefijos de las rutas
const PREFIX = {
  AUTH: import.meta.env.VITE_PREFIX_AUTH,
  USER: import.meta.env.VITE_PREFIX_USER,
  SCREEN: import.meta.env.VITE_PREFIX_SCREEN,
};

const createInstance = (type: InstanceType) => {
  const instance = axios.create({
    baseURL: `${BASE_URL_VISOR_TV}/${PREFIX[type]}`, // Asegurarse de tener la barra aquí
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
