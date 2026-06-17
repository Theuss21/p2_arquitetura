// notification-service/src/infrastructure/webserver/express.js
import express from 'express';
import { ProcessNotificationUseCase } from '../../use-cases/ProcessNotification.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Rota POST que recebe a notificação assíncrona do checkout
app.post('/notify', (req, res) => {
  try {
    const { orderId, amount, status } = req.body;

    if (!orderId || !amount || !status) {
      return res.status(400).json({ error: "Payload de notificação inválido." });
    }

    const useCase = new ProcessNotificationUseCase();
    const result = useCase.execute({ orderId, amount, status });

    return res.status(200).json(result);
  } catch (error) {
    console.error(`[Erro Notificação]`, error.message);
    return res.status(500).json({ error: "Erro interno ao processar notificação." });
  }
});

// Rota raiz para checagem de integridade (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({
    service: "notification-service",
    status: "online",
    endpoints: { notify: "POST /notify" }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Notification Service rodando nativamente na porta ${PORT}`);
});