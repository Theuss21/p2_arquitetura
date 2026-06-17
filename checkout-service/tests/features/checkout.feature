# checkout-service/tests/features/checkout.feature

Funcionalidade: Checkout de Pedidos com Diferentes Estratégias de Pagamento

  Cenário: Finalizar compra com sucesso utilizando PIX aplicando desconto
    Dado que um cliente possui um pedido com o ID "1001" no valor de 100.00
    Quando ele finaliza a compra utilizando o método "pix"
    Então o pagamento deve ser processado com sucesso
    E o valor cobrado final deve ser 95.00 com status "PAGO"

  Cenário: Tentar finalizar compra com método de pagamento não suportado
    Dado que um cliente possui um pedido com o ID "1003" no valor de 50.00
    Quando ele tenta finalizar a compra utilizando o método "boleto"
    Então o sistema deve rejeitar a transação informando que o método não é suportado