import i18next from "i18next";

export async function initializeLanguage(lang: string = "no") {
  await i18next.init({
    lng: lang,
    resources: {
      no: {
        translation: {
          weather: "været",
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
          "Rain will decrease": "men det kommer til å dabbe av til {{rainMm}} mm innen(ca) {{timeleft}} minutter.",
          help: `regn - gir en kort status om regn på Grønland, Oslo. Legg til ordet 'detaljer' for å få en graf over regnet.
          paraply - gir deg beskjed om du trenger en paraply nå, eller om en liten stund
          været - viser været på Grønland, Oslo, akkurat nå
          værvarsel - viser værvarslet for uka
          været imorgen - viser værvarslet for morgendagen
          været *dag* - viser værvarslet for en gitt dag denne uken`
        }
      },
      en: {
        translation: {
          weather: "weather",
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
          "Rain will decrease": "but it will decrease to about {{rainMm}} mm within {{timeleft}} minutes.",
          help: `rain - gives a short status about the rain at Grønland, Oslo. Add the word 'details' to also receive a graph of the rain.
          umbrella - lets you know if you need an umbrella right now, or in a little while
          weather - shows the weather at Grønland, Oslo, right now
          forecast - show the forecast for the next week
          weather tomorrow - show the forecast for tomorrow
          weather *day* - show the forecast for a given day the next seven days`
        }
      }
    }
  });
}
