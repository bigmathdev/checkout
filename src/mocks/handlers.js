import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/OFFER_CODE", () => {
    return HttpResponse.json({
      id: 1,
      offerName: "Pacote Gamer - Edição Especial",
      price: 4999.99,
      itemsIncluded: [
        "Computador Gamer i7 - 16GB RAM - 1TB SSD",
        "Monitor LED 27'' 144Hz",
        "Teclado Mecânico RGB",
        "Mouse Gamer 12000 DPI",
        "Headset Surround 7.1",
      ],
      paymentMethods: ["Pix", "Boleto Bancário", "Cartão de Crédito"],
      productImages: [
        "https://example.com/images/pc-gamer.png",
        "https://example.com/images/monitor.png",
        "https://example.com/images/teclado.png",
        "https://example.com/images/mouse.png",
        "https://example.com/images/headset.png",
      ],
    });
  }),
];
