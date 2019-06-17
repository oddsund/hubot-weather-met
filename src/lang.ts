import i18next from "i18next";

export async function initializeLanguage(lang: string = "no") {
  await i18next.init({
    lng: lang,
    resources: {
      no: {
        translation: {
          umbrella: "paraply",
          "No umbrella": "Du trenger ikke paraply på en stund.",
          "Need umbrella now": "Du trenger paraply nå.",
          "Umbrella later": "Du trenger ikke paraply nå, men du trenger det om rundt {{rainStart}} minutter",
          rain: "regn",
          details: "detaljer",
          "No rain": "Det kommer (antakeligvis) ikke til å regne de neste 1.5 timene.",
          "Not currently raining": "Det regner ikke nå, men det kommer til å regne om {{rainStart}} minutter.",
          "Rain starting as":
            " Det vil starte som {{startingMm}} mm og ta seg opp til {{maxMm}} mm iløpet av {{timeleft}} minutter.",
          "It will rain": "Det vil da regne ${rainMm} mm.",
          "Currently raining": "Det regner {{rainMm}} mm nå, ",
          "Rain will increase": "og det kommer til å øke til {{rainMm}} mm innen(ca) {{timeleft}} minutter.",
          "No end in sight": "og det er ingen ende i syne!",
          "Rain will decrease": "men det kommer til å dabbe av til {{rainMm}} mm innen(ca) {{timeleft}} minutter."
        }
      },
      en: {
        translation: {
          umbrella: "umbrella",
          "No umbrella": "You won't need an umbrella for a while.",
          "Need umbrella now": "You'll need an umbrella right now.",
          "Umbrella later": "You won't need an umbrella right now, but you'll need it in about {{rainStart}} minutes",
          rain: "rain",
          details: "details",
          "No rain": "There will (probably) not be any rain for the next 1.5 hour.",
          "Not currently raining": "It's not raining now, but it's going to rain in {{rainStart}} minutes.",
          "Rain starting as":
            "It will start as {{startingMm}} mm and increase to {{maxMm}} mm within {{timeleft}} minutes.",
          "It will rain": "It will then rain {{rainMm}} mm.",
          "Currently raining": "It is currently raining {{rainMm}} mm, ",
          "Rain will increase": "and it will increase to {{rainMm}} mm within about {{timeleft}} minutes.",
          "No end in sight": "and there's no end in sight!",
          "Rain will decrease": "but it will decrease to about {{rainMm}} mm within {{timeleft}} minutes."
        }
      }
    }
  });
}
