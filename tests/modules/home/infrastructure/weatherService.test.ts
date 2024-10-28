// weatherService.test.ts
import axios from "axios";
import { fetchWeatherData } from "../../../../src/modules/home/infrastructure/weatherService";

jest.mock("axios"); // Mocks axios para evitar llamadas reales a la API
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchWeatherData", () => {
  it("debe obtener y devolver los datos de clima correctamente", async () => {
    // Mock de la respuesta de axios
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        main: { temp: 31.34, humidity: 38, pressure: 1010.2 },
        weather: [{ description: "cielo claro", icon: "01d" }],
        wind: { speed: 14 },
        visibility: 10000,
      },
    });

    const location = { country: "Argentina", province: "Corrientes" };
    const result = await fetchWeatherData(location);

    expect(result).toEqual({
      temperature: "31.34°C",
      condition: "cielo claro",
      icon: "https://openweathermap.org/img/wn/01d@2x.png",
      lastUpdated: expect.any(String),
      humidity: "38%",
      pressure: "1010.2 hPa",
      wind: "14 km/h",
      visibility: "10 km",
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      params: expect.objectContaining({
        q: "Corrientes,Argentina",
        units: "metric",
        appid: expect.any(String),
        lang: "es",
      }),
    });
  });

  it("debe manejar errores al fallar la API de clima", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Error en la API"));

    const location = { country: "Argentina", province: "Corrientes" };

    await expect(fetchWeatherData(location)).rejects.toThrow(
      "No se pudo obtener la información del clima."
    );
  });
});
