import { HttpError } from "routing-controllers";
import type { ValidationError } from "class-validator";

interface MessageInterface {
  status: number;
  message?: string;
  code?: string;
  errors?: ValidationError[];
}
export class ApiError extends HttpError {
  protected error: MessageInterface;
  public removeLog: boolean;

  constructor(status = 500, error: Omit<MessageInterface, "status">) {
    super(status);

    this.error = { ...error, status, code: error.code || "INTERNAL_ERROR" };

    this.name = "ApiError";

    this.message = error.message || "";
  }

  public toJSON = (): MessageInterface => {
    return this.error;
  };
}

// Помилки також важлива частина обробки запитів. Наш новий клас ApiError розширює базовий клас HttpError з бібліотеки routing-controllers, даючи нам змогу кастомізувати обробку помилок, виходячи з наших потреб. У конструкторі ApiError ми приймаємо статус помилки та об'єкт помилки з додатковою інформацією. Для обробки помилок ми використовуємо тип ValidationError. Детальніше про те, як він працює, буде зрозуміло в наступному розділі, коли ми займемося валідацією.