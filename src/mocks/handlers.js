import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("https://localhost:3000/OFFER_CODE", () => {
    return HttpResponse.json({
      id: 1,
      offerName: "Promo - Nike Air Jordan Edição Especial",
      price: 1500,
      size: "Tamanho 43",
      itemsIncluded: "Nike Air Jordan Edição Especial",
      paymentMethods: ["Pix", "Boleto Bancário", "Cartão de Crédito"],
      shipping: 13.20,
      productImages: "../assets/jordan.png",
    });
  }),
];
