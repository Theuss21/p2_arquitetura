// checkout-service/tests/unit/ProcessCheckout.test.js
import { Order } from '../../src/domain/entities/Order.js';
import { PaymentFactory } from '../../src/adapters/gateways/PaymentFactory.js';

// Aqui criamos um "Mock" simples para simular o comportamento do Observer do microsserviço de notificações
class MockNotificationObserver {
  constructor() {
    this.calledWith = null;
  }
  update(order) {
    this.calledWith = order;
  }
}

describe('BDD Cenário: Processamento de Checkout do E-commerce', () => {
  
  test('Deve processar um checkout via PIX com 5% de desconto e notificar observers', () => {
    // DADO (Contexto do cenário BDD)
    const orderId = "1001";
    const amount = 100.00;
    const paymentMethod = "pix";
    
    const order = new Order(orderId, amount);
    const observerMock = new MockNotificationObserver();
    order.addObserver(observerMock);

    // QUANDO (Ação que executa o comportamento)
    const paymentStrategy = PaymentFactory.createPaymentMethod(paymentMethod);
    const paymentResult = paymentStrategy.pay(order.amount);
    
    if (paymentResult.success) {
      order.setPaid();
    }

    // ENTÃO (Asserções / Resultados esperados)
    expect(paymentResult.success).toBe(true);
    expect(paymentResult.paidAmount).toBe(95.00); // 5% de desconto
    expect(order.status).toBe('PAGO');
    expect(observerMock.calledWith).toBe(order); // Garante que o observer foi acionado
  });

  test('Deve lançar uma exceção ao tentar pagar com um método inválido (Boleto)', () => {
    // DADO
    const amount = 50.00;
    const invalidMethod = "boleto";

    // QUANDO & ENTÃO
    expect(() => {
      PaymentFactory.createPaymentMethod(invalidMethod);
    }).toThrow("[Erro Factory] Método de pagamento 'boleto' não é suportado pelo sistema.");
  });
});