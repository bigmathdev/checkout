import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://localhost:3000/OFFER_CODE", () => {
    return HttpResponse.json({
      id: 1,
      offerName: "Promo - Nike Air Jordan Edição Especial",
      price: 1500,
      size: "Tamanho 43",
      itemsIncluded: "Nike Air Jordan Edição Especial",
      paymentMethods: ["Pix", "Boleto Bancário", "Cartão de Crédito"],
      shipping: 13.2,
      productImages: "https://github.com/bigmathdev/checkout/blob/6c45fdcf646a09e9d02a3cdf576fee1f6f5c73b1/src/assets/jordan.png",
    });
  }),

  http.post(
    "http://localhost:3000/offers/OFFER_CODE/create_order",
    async ({request}) => {
      return new HttpResponse(request.body, {
        status: 201
      })
    }
  ),
];
