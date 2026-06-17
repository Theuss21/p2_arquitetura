// checkout-service/src/use-cases/ProcessCheckout.js
import { Order } from '../domain/entities/Order.js';
import { PaymentFactory } from '../adapters/gateways/PaymentFactory.js';

export class ProcessCheckoutUseCase {
  constructor(observers = []) {
    // Injeção de dependência (Princípio de Inversão de Dependência - DIP)
    // Passamos os observadores (ex: notificações) por aqui
    this.observers = observers;
  }

  execute(orderData) {
    const { id, amount, paymentMethod } = orderData;

    // 1. Instancia a Entidade de Domínio (Negócio Puro)
    const order = new Order(id, amount);

    // 2. Registra os observadores na entidade antes de executar as ações
    this.observers.forEach(observer => order.addObserver(observer));

    // 3. Obtém a estratégia de pagamento correta através do Factory Method
    const paymentStrategy = PaymentFactory.createPaymentMethod(paymentMethod);

    // 4. Executa o pagamento usando o padrão Strategy
    const paymentResult = paymentStrategy.pay(order.amount);

    // 5. Se o pagamento deu certo, altera o estado do pedido (que aciona o Observer)
    if (paymentResult.success) {
      order.setPaid();
    }

    // Retorna o payload limpo detalhando o sucesso do fluxo
    return {
      orderId: order.id,
      status: order.status,
      paymentDetails: paymentResult.details,
      originalAmount: paymentResult.originalAmount,
      paidAmount: paymentResult.paidAmount
    };
  }
}