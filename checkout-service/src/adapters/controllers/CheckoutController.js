// checkout-service/src/adapters/controllers/CheckoutController.js
import { ProcessCheckoutUseCase } from '../../use-cases/ProcessCheckout.js';

export class CheckoutController {
  constructor(observers = []) {
    this.observers = observers;
  }

  handle(req, res) {
    try {
      const { id, amount, paymentMethod } = req.body;

      // Validação básica (Clean Code - falhar rápido antes de gastar processamento)
      if (!id || !amount || !paymentMethod) {
        return res.status(400).json({
          error: "Requisição inválida. Os campos 'id', 'amount' e 'paymentMethod' são obrigatórios."
        });
      }

      // Executa o caso de uso passando os dados limpos
      const useCase = new ProcessCheckoutUseCase(this.observers);
      const output = useCase.execute({ id, amount, paymentMethod });

      // Retorna sucesso
      return res.status(200).json(output);

    } catch (error) {
      // Tratamento centralizado de erros (Ex: se a Factory explodir por método inválido)
      return res.status(422).json({
        error: error.message
      });
    }
  }
}