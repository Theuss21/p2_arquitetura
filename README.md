# Plataforma de Checkout Distribuída (E-commerce)

## 📌 Descrição do Problema
Em plataformas de e-commerce tradicionais (monolíticas), processos secundários pós-venda (como disparo de e-mails e baixa de estoque) rodam no mesmo ciclo de execução do checkout de pagamento. Se um desses serviços externos falhar ou apresentar lentidão, todo o fluxo de compras é travado, gerando perda de receita. 

## 💡 Solução Proposta
A aplicação foi dividida em dois **Microsserviços** totalmente desacoplados comunicando-se via HTTP de forma assíncrona. Toda a lógica de negócio foi blindada seguindo os princípios da **Arquitetura Limpa** e **SOLID**, guiada por testes automatizados de comportamento e unidade (**BDD / TDD**).

## 🏗️ Arquitetura e Padrões de Projeto Utilizados
1. **Facade**: Centraliza a complexidade do ecossistema de checkout no controller da aplicação.
2. **Factory Method**: Encapsula a lógica de criação das estratégias de pagamento com base no input da API.
3. **Strategy**: Executa as regras de cálculo e validação específicas de cada meio de pagamento (Pix com 5% de desconto e Cartão de Crédito).
4. **Observer**: Notifica de forma reativa e assíncrona os serviços externos (como o serviço de notificação logística) assim que o status da entidade de domínio muda para `PAGO`.

## 🚀 Como Executar localmente (Docker)
Na raiz do projeto, execute o comando:
```bash
docker-compose up --build