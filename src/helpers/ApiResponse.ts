// Усі відповіді сервера, що надсилаються клієнту, тепер міститимуть поле success, яке показує, чи був запит успішним, чи ні, поле data, яке містить самі дані відповіді, і поле message, яке може містити додатковий опис або повідомлення.


export class ApiResponse<T> {
  constructor(public success: boolean, public data: T, public message?: string) {}
}
