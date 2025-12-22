const presentYear = new Date().getFullYear();

export const INPUTS = [
  { name: "title", label: "Başlık" },
  { name: "description", label: "Açıklama" },
  { name: "director", label: "Yönetmen" },
  { name: "cast", label: "Ekip (, ayırınız)" },
  { name: "genre", label: "Kategoriler (, ayırınız)" },
  { name: "language", label: "Dil" },
  { name: "duration", label: "Süre (dakika)", type: "number", min: 3 },
  { name: "rating", label: "Puan", type: "number", min: 1, max: 10 },
  { name: "year", label: "Yıl", type: "number", min: 1900, max: presentYear },
];
