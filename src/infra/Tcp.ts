import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";

// Імпортуємо наш інтерфейс сервісу і контролери
import { IService } from "types/services";
import { controllers } from "app/domain";
import { middlewares } from "app/middlewares";

// Оголошуємо клас Tcp, який реалізує інтерфейс IService
export class Tcp implements IService {
  private static instance: Tcp; // Ссылка на единственный экземпляр класса

  private routePrefix = "/api"; // Префикс для маршрутов API
  public server = express(); // Экземпляр Express.js

  // Конструктор, що реалізує шаблон Singleton для класу Tcp
  constructor() {
    // Якщо екземпляр ще не створено, зберігаємо посилання на поточний екземпляр
    if (!Tcp.instance) {
      Tcp.instance = this;
    }

    // Повертаємо посилання на єдиний екземпляр класу
    return Tcp.instance;
  }

  // Метод для ініціалізації сервісу
  async init() {
    const { server, routePrefix } = this;

    // Парсимо тіло запиту, потрібно для middlewares
    server.use(express.json());

    // Використовуємо бібліотеку routing-controllers для налаштування маршрутів
    useExpressServer(server, {
      routePrefix,
      controllers,
      middlewares,
      cors: true,
      defaultErrorHandler: true,
      validation: false, // Відключаємо вбудовану валідацію, щоб ми могли перевірити DTO самі всередині контролера
    });

    // Повертаємо Promise, який успішно виконується, коли сервер починає слухати порт
    return new Promise<boolean>((resolve) => {
      server.listen(4000, () => {
        console.log("Tcp service started on port 4000");

        return resolve(true);
      });
    });
  }
}

// Зверніть увагу на використання бібліотеки routing-controllers і функції useExpressServer. Вона дає змогу застосувати контролери до вашого застосунку Express, а також налаштувати різні параметри сервера, як-от префікс маршруту, налаштування CORS і оброблення помилок. Ми встановили префікс "/api", і тепер усі маршрути починатимуться з /api, тому нам не потрібно вказувати його в контролері.

// Метод init також повертає Promise, який успішно виконується після того, як сервер Express починає прослуховування на порту 4000. Це гарантує, що сервер повністю запущений і готовий до обробки запитів, перш ніж його буде використано.

// У конструкторі класу Tcp використовується шаблон одинак (Singleton), щоб гарантувати, що буде створено тільки один екземпляр класу Tcp. Це важливо, нам же не потрібно мати можливість підняти два Tcp-сервери на один і той самий порт.