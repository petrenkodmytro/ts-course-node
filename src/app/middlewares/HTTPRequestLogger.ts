// Request, Response і NextFunction з express. Це загальні типи, що використовуються для опису структури HTTP-запитів і відповідей, а також функції next, яка використовується для передавання керування наступному middleware у стеку.
import type { NextFunction, Request, Response } from "express";
// інтерфейс визначає, як мають виглядати проміжні обробники в routing-controllers.
import type { ExpressMiddlewareInterface } from "routing-controllers";
import { Middleware } from "routing-controllers";

// Декоратор @Middleware({ type: "before" }) використовується для вказівки, що цей клас є middleware. Параметр type вказує, коли має виконуватися middleware - до (before) або після (after) виклику контролера.
@Middleware({ type: "before" })
export class HTTPRequestLogger implements ExpressMiddlewareInterface {
  // Метод use визначає дію, що має відбутися під час обробки запиту. У цьому методі ми витягаємо необхідні дані із запиту (originalUrl, method, body), виводимо їх у консоль і потім викликаємо функцію next() для передачі керування наступному middleware у стеку.
  use(request: Request, _response: Response, next: NextFunction) {
    const { originalUrl, method, body } = request;

    console.log(`Received request: method=${method} path=${originalUrl}`, JSON.stringify(body));

    next();
  }
}
