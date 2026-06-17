// checkout-service/src/infrastructure/webserver/express.js
import express from 'express';
import { CheckoutController } from '../../adapters/controllers/CheckoutController.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Padrão Observer: Este observador avisa o microsserviço de notificações de forma assíncrona
class HttpNotificationObserver {
  update(order) {
    console.log(`[Observer HTTP] Pedido ${order.id} pago! Notificando microsserviço de notificações...`);
    
    // Aqui usamos o fetch nativo do Node para disparar para o microsserviço de notificações
    // A URL usará o nome do container do docker que definiremos adiante
    const notificationServiceUrl = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3001/notify';
    
    fetch(notificationServiceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: order.id, status: order.status, amount: order.amount })
    })
    .then(res => console.log(`[Observer HTTP] Resposta do serviço de notificação: ${res.status}`))
    .catch(err => console.error(`[Observer HTTP] Falha ao enviar notificação externa: ${err.message}`));
  }
}

// Instancia os observers necessários para o fluxo do sistema
const httpObserver = new HttpNotificationObserver();
const checkoutController = new CheckoutController([httpObserver]);

// Definição da rota principal do Checkout
app.post('/checkout', (req, res) => checkoutController.handle(req, res));

// Rota raiz opcional para documentação ou teste simples via navegador
app.get('/', (req, res) => {
  res.status(200).json({
    service: "checkout-service",
    status: "online",
    endpoints: { checkout: "POST /checkout" }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Checkout Service rodando nativamente na porta ${PORT}`);
});