// notification-service/src/use-cases/ProcessNotification.js

// Classe responsável estritamente pelo fluxo de e-mail (Single Responsibility Principle)
class EmailService {
  sendConfirmation(orderId, amount) {
    console.log(`\n[E-MAIL] 📧 Enviando e-mail para o cliente...`);
    console.log(`[E-MAIL] Olá! Seu pedido #${orderId} no valor de R$ ${amount.toFixed(2)} foi aprovado com sucesso!`);
  }
}

// Classe responsável estritamente pela atualização logística do inventário
class StockService {
  decreaseInventory(orderId) {
    console.log(`\n[ESTOQUE] 📦 Atualizando inventário no galpão central...`);
    console.log(`[ESTOQUE] Baixa de mercadoria realizada com sucesso para o pedido #${orderId}.`);
  }
}

// O Caso de Uso principal que orquestra as ações pós-venda
export class ProcessNotificationUseCase {
  constructor() {
    this.emailService = new EmailService();
    this.stockService = new StockService();
  }

  execute(notificationData) {
    const { orderId, amount, status } = notificationData;

    console.log(`\n[MENSAGERIA] 📥 Nova notificação recebida de processamento de pedido.`);
    console.log(`[MENSAGERIA] Processando ações pós-venda para o Pedido #${orderId} com status [${status}]`);

    // Executa as tarefas em paralelo sem travar o checkout original
    this.emailService.sendConfirmation(orderId, amount);
    this.stockService.decreaseInventory(orderId);

    return {
      processed: true,
      tasks: ['email_sent', 'inventory_updated']
    };
  }
}