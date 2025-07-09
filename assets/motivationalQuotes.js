const motivationalQuotes = [
  "Małe kroki prowadzą do wielkich zmian.",
  "Codzienna konsekwencja przynosi wielkie efekty.",
  "Nie musisz być najlepszy – wystarczy, że będziesz lepszy niż wczoraj.",
  "To, co robisz codziennie, kształtuje to, kim się stajesz.",
  "Wielkie rzeczy nigdy nie powstają z komfortu.",
  "Twój nawyk dziś to twoje jutro.",
  "Dyscyplina to wybór między tym, czego chcesz teraz, a tym, czego chcesz najbardziej.",
  "Każdy dzień to nowa szansa, by zacząć od nowa.",
  "Nie poddawaj się – początki zawsze są trudne.",
  "To nie motywacja cię zmienia, ale działanie dzień po dniu.",
];

export const getRandomQuote = () => {
  return motivationalQuotes[
    Math.floor(Math.random() * motivationalQuotes.length + 1)
  ];
};
