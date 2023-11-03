// JsonController, Get, Post, UseAfter - декоратори HTTP-методу з бібліотеки routing-controllers.
import { JsonController, Get, Post, Body, Param, UseAfter } from "routing-controllers";

// validate повертає Promise, який повертає масив помилок валідації. Якщо масив порожній, валідація пройшла успішно. Якщо ні, ви можете перевірити масив на наявність помилок і обробити їх відповідним чином. Сам масив містить тип ValidationError, який ми і задали для errors у хеплері ApiError.
import { validate } from "class-validator";

import { IPerson } from "./Person.types";
import { ApiResponse } from "helpers/ApiResponse";
import { ApiError } from "helpers/ApiError";
import { CreatePerson } from "./CreatePerson.dto";
import { HTTPResponseLogger } from "app/middlewares/HTTPResponseLogger";

const storeData: IPerson[] = []; // умовно база данних

@JsonController("/person")
export default class Person {
  @Get()
  // getAll(). Цей метод обробляє GET-запити на ендпоінт api/person і повертає всі записи з масиву storeData.
  @UseAfter(HTTPResponseLogger)
  async getAll() {
    return new ApiResponse(true, storeData);
  }

  @Get("/:id")
  // getOne(id: number). Цей метод обробляє GET-запити на ендпоінт api/person/:id, де :id є параметром. Він повертає запис person з відповідним id або порожній об'єкт, якщо запис не знайдено.
  async getOne(@Param("id") id: number): Promise<ApiResponse<IPerson | {}>> {
    const person = storeData.find((item) => {
      return item.id === id;
    });

    if (!person) {
      throw new ApiError(404, {
        code: "PERSON_NOT_FOUND",
        message: `Person with id ${id} not found`,
      });
    }

    return new ApiResponse(true, person);
  }

  @Post()
  // setPerson(body: IPerson). Цей метод обробляє POST-запити на ендпоінт api/person і додає новий запис person у масив storeData. Запис person отримується з тіла запиту.
  async setPerson(@Body() body: CreatePerson) {
    const errors = await validate(body);

    if (errors.length > 0) {
      throw new ApiError(400, {
        message: "Validation failed",
        code: "PERSON_VALIDATION_ERROR",
        errors,
      });
    }

    const id = storeData.length;

    storeData.push({ ...body, id });
    console.log(storeData);

    return new ApiResponse(true, "Person successfully created");
  }
}

// Декоратор @JsonController("/person") вказує, що цей клас є контролером, і всі запити, що починаються з api/person, будуть спрямовані на цей контролер.

// Декоратор @Body використовується для анотації параметра, що має бути витягнутий з тіла запиту.

// Декоратор @Param("id") є анотацією параметра, що має бути витягнутий з параметрів маршруту.
