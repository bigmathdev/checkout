import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.deepspacestore.com/offers/nike_offer", () => {
    return HttpResponse.json({
      id: 1,
      offerName: "Promo - Nike Air Jordan Edição Especial",
      price: 1500,
      size: "Tamanho 43",
      itemsIncluded: "Nike Air Jordan Edição Especial",
      paymentMethods: ["Pix", "Boleto Bancário", "Cartão de Crédito"],
      shipping: 13.20,
      productImages: "src/assets/jordan.png",
      quantity: 1,
      total: 1500,
      subtotal: 1500
    });
  }),

  http.post(
    "https://api.deepspacestore.com/offers/nike_offer/create_order",
    async ({request}) => {
      return new HttpResponse(request.body, {
        status: 201
      })
    }
  ),
];