import { JsonController, Get, Post, Body, Param } from "routing-controllers";
// JsonController, Get, Post - декоратори HTTP-методу з бібліотеки routing-controllers.

import { IPerson } from "./Person.types";

const storeData: IPerson[] = []; // умовно база данних

@JsonController("/person")
export default class Person {
  @Get()
  // getAll(). Цей метод обробляє GET-запити на ендпоінт api/person і повертає всі записи з масиву storeData.
  async getAll() {
    return storeData;
  }

  @Get("/:id")
  // getOne(id: number). Цей метод обробляє GET-запити на ендпоінт api/person/:id, де :id є параметром. Він повертає запис person з відповідним id або порожній об'єкт, якщо запис не знайдено.
  async getOne(@Param("id") id: number): Promise<IPerson | {}> {
    const person = storeData.find((item) => {
      return item.id === id;
    });

    return person || {};
  }

  @Post()
  // setPerson(body: IPerson). Цей метод обробляє POST-запити на ендпоінт api/person і додає новий запис person у масив storeData. Запис person отримується з тіла запиту.
  async setPerson(@Body() body: IPerson) {
    storeData.push(body);

    return true;
  }
}

// Декоратор @JsonController("/person") вказує, що цей клас є контролером, і всі запити, що починаються з api/person, будуть спрямовані на цей контролер.

// Декоратор @Body використовується для анотації параметра, що має бути витягнутий з тіла запиту.

// Декоратор @Param("id") є анотацією параметра, що має бути витягнутий з параметрів маршруту.