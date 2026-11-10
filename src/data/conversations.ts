import type { Conversation } from "./types";

/**
 * CONVERSAS DE DEMONSTRAÇÃO.
 * `demoTranslations` são traduções escritas previamente para ilustrar a funcionalidade
 * de tradução. Elas NÃO são geradas automaticamente. Ver src/services/translation.ts.
 */
const min = 60000;
const base = Date.UTC(2026, 10, 9, 16);
const ago = (m: number) => new Date(base - m * min).toISOString();

export const conversations: Conversation[] = [
  {
    id: "conv_diego",
    participantId: "diego",
    messages: [
      {
        id: "d1", from: "diego", lang: "es", createdAt: ago(300),
        text: "¡Hola! Vi tu pregunta sobre el presupuesto. ¿Ya sabes cuánto tiempo te quedarás en tu primer destino?",
        demoTranslations: {
          pt: "Olá! Vi sua pergunta sobre o orçamento. Você já sabe quanto tempo vai ficar no seu primeiro destino?",
          en: "Hi! I saw your question about the budget. Do you already know how long you'll stay at your first destination?",
        },
      },
      {
        id: "d2", from: "me", lang: "pt", createdAt: ago(290),
        text: "Oi, Diego! Penso em dois meses, mas ainda estou comparando cidades.",
        demoTranslations: {
          es: "¡Hola, Diego! Pienso en dos meses, pero todavía estoy comparando ciudades.",
          en: "Hi, Diego! I'm thinking two months, but I'm still comparing cities.",
        },
      },
      {
        id: "d3", from: "diego", lang: "es", createdAt: ago(280),
        text: "Dos meses es un buen tiempo. Mi consejo: reserva el primer mes y decide el segundo cuando ya conozcas los barrios.",
        demoTranslations: {
          pt: "Dois meses é um bom tempo. Meu conselho: reserve o primeiro mês e decida o segundo quando já conhecer os bairros.",
          en: "Two months is a good amount of time. My advice: book the first month and decide on the second once you know the neighborhoods.",
        },
      },
    ],
  },
  {
    id: "conv_kwame",
    participantId: "kwame",
    messages: [
      {
        id: "k1", from: "kwame", lang: "en", createdAt: ago(1500),
        text: "Hey! Happy to share what I learned about visa paperwork. Which country are you thinking about?",
        demoTranslations: {
          pt: "Oi! Fico feliz em compartilhar o que aprendi sobre a papelada de vistos. Em qual país você está pensando?",
          es: "¡Hola! Con gusto comparto lo que aprendí sobre los trámites de visado. ¿En qué país estás pensando?",
        },
      },
      {
        id: "k2", from: "me", lang: "pt", createdAt: ago(1490),
        text: "Estou pensando em Espanha ou Portugal, mas ainda não sei qual visto faz sentido.",
        demoTranslations: {
          en: "I'm thinking about Spain or Portugal, but I still don't know which visa makes sense.",
          es: "Estoy pensando en España o Portugal, pero todavía no sé qué visado tiene sentido.",
        },
      },
      {
        id: "k3", from: "kwame", lang: "en", createdAt: ago(1480),
        text: "Start with the official consulate websites for your nationality, and consider talking to an immigration professional. Rules change, so don't rely only on blog posts.",
        demoTranslations: {
          pt: "Comece pelos sites oficiais dos consulados para a sua nacionalidade e considere conversar com um profissional de imigração. As regras mudam, então não confie apenas em posts de blog.",
          es: "Empieza por los sitios oficiales de los consulados para tu nacionalidad y considera hablar con un profesional de inmigración. Las reglas cambian, así que no confíes solo en blogs.",
        },
      },
    ],
  },
  {
    id: "conv_ana",
    participantId: "ana",
    messages: [
      {
        id: "a1", from: "ana", lang: "pt", createdAt: ago(3000),
        text: "Que bom que você entrou na comunidade! Se quiser, posso te contar como foi meu primeiro mês em Lisboa.",
        demoTranslations: {
          en: "Great that you joined the community! If you'd like, I can tell you how my first month in Lisbon went.",
          es: "¡Qué bueno que te uniste a la comunidad! Si quieres, te cuento cómo fue mi primer mes en Lisboa.",
        },
      },
    ],
  },
  {
    id: "conv_mei",
    participantId: "mei",
    messages: [
      {
        id: "m1", from: "mei", lang: "en", createdAt: ago(4500),
        text: "Thanks for reading my post about loneliness. How are you feeling about your first trip?",
        demoTranslations: {
          pt: "Obrigada por ler minha publicação sobre solidão. Como você está se sentindo em relação à sua primeira viagem?",
          es: "Gracias por leer mi publicación sobre la soledad. ¿Cómo te sientes con respecto a tu primer viaje?",
        },
      },
      {
        id: "m2", from: "me", lang: "pt", createdAt: ago(4400),
        text: "Com muita vontade de ir, mas com um pouco de receio de me sentir só.",
        demoTranslations: {
          en: "Really eager to go, but a little worried about feeling lonely.",
          es: "Con muchas ganas de ir, pero con un poco de miedo de sentirme solo/a.",
        },
      },
      {
        id: "m3", from: "mei", lang: "en", createdAt: ago(4390),
        text: "That's completely normal. Try booking a coliving for the first weeks — it makes the start much softer.",
        demoTranslations: {
          pt: "Isso é completamente normal. Tente reservar um coliving nas primeiras semanas — deixa o começo bem mais leve.",
          es: "Es completamente normal. Intenta reservar un coliving las primeras semanas: hace que el comienzo sea mucho más suave.",
        },
      },
    ],
  },
];
