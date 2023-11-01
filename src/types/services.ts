//  інтерфейс для сервісів, в кожного сервісу буде метод init.
export interface IService {
  init(): Promise<boolean>;
}
