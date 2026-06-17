// checkout-service/src/domain/entities/Order.js

export class Order {
  constructor(id, amount) {
    this.id = id;
    this.amount = amount;
    this.status = 'PENDENTE';
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  setPaid() {
    this.status = 'PAGO';
    this.notifyObservers();
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}