// checkout-service/src/adapters/gateways/PaymentStrategies.js

// Interface base (Liskov Substitution Principle - todas herdam o mesmo comportamento)
export class PaymentStrategy {
  pay(amount) {
    throw new Error("Método pay() deve ser implementado.");
  }
}

// Estratégia 1: Pix (Aplica os 5% de desconto que tínhamos no projeto anterior)
export class PixPayment extends PaymentStrategy {
  pay(amount) {
    const finalAmount = amount * 0.95;
    return {
      success: true,
      method: 'pix',
      originalAmount: amount,
      paidAmount: finalAmount,
      details: `R$ ${finalAmount.toFixed(2)} recebido com 5% de desconto via Pix.`
    };
  }
}

// Estratégia 2: Cartão de Crédito
export class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    return {
      success: true,
      method: 'cartao',
      originalAmount: amount,
      paidAmount: amount,
      details: `Cobrança de R$ ${amount.toFixed(2)} autorizada pela operadora.`
    };
  }
}