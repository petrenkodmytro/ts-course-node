import { App } from './infra/App';

// створюємо екземпляр класу App і викликаємо його метод init, який ініціалізує всі сервіси. Це є точкою входу в наш застосунок.
const app = new App();

app.init();