import i18next from "i18next";

export async function initializeLanguage(lang: string = "no") {
  await i18next.init({
    lng: lang,
    resources: {
      no: {
        translation: {
          "No rain": "Det kommer (antakeligvis) ikke til å regne de neste 1.5 timene.",
          "Not currently raining": "Det regner ikke nå, men det kommer til å regne om {{rainStart}} minutter.",
          "Rain starting as":
            " Det vil starte som {{startingMm}} mm/t og ta seg opp til {{maxMm}} mm/t iløpet av {{timeleft}} minutter.",
          "It will rain": "Det vil da regne ${rainMm} mm/t.",
          "Currently raining": "Det regner {{rainMm}} mm/t nå, ",
          "Rain will increase": "og det kommer til å øke til {{rainMm}} mm/t innen(ca) {{timeleft}} minutter.",
          "No end in sight": "og det er ingen ende i syne!",
          "Rain will decrease": "men det kommer til å dabbe av til {{rainMm}} mm/t innen(ca) {{timeleft}} minutter."
        }
      },
      en: {
        translation: {
          "No rain": "There will (probably) not be any rain for the next 1.5 hour.",
          "Not currently raining": "It's not raining now, but it's going to rain in {{rainStart}} minutes.",
          "Rain starting as":
            "It will start as {{startingMm}} mm/h and increase to {{maxMm}} mm/h within {{timeleft}} minutes.",
          "It will rain": "It will then rain {{rainMm}} mm/h.",
          "Currently raining": "It is currently raining {{rainMm}} mm/h, ",
          "Rain will increase": "and it will increase to {{rainMm}} mm/h within about {{timeleft}} minutes.",
          "No end in sight": "and there's no end in sight!",
          "Rain will decrease": "but it will decrease to about {{rainMm}} mm/t within {{timeleft}} minutes."
        }
      }
    }
  });
}
