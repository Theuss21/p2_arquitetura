// checkout-service/src/adapters/gateways/PaymentFactory.js
import { PixPayment, CreditCardPayment } from './PaymentStrategies.js';

export class PaymentFactory {
  static createPaymentMethod(method) {
    const parsedMethod = method.toLowerCase();
    
    if (parsedMethod === 'pix') {
      return new PixPayment();
    } else if (parsedMethod === 'card' || parsedMethod === 'cartao') {
      return new CreditCardPayment();
    }
    
    // Tratamento de erro robusto exigido pelo Clean Code e SOLID
    throw new Error(`[Erro Factory] Método de pagamento '${method}' não é suportado pelo sistema.`);
  }
}