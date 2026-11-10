import type { Localized, PostCategory, Testimonial } from "./types";
import type { Concern } from "@/store/types";

/** Tópicos de moradia e infraestrutura. */
export interface HousingTopic {
  id: string;
  icon: "coliving" | "coworking" | "longStay" | "workExchange" | "temporary" | "internet" | "safety" | "cost" | "community";
  title: Localized;
  text: Localized;
  check: Localized;
}

export const housingTopics: HousingTopic[] = [
  {
    id: "coliving", icon: "coliving",
    title: { pt: "Coliving", en: "Coliving", es: "Coliving" },
    text: { pt: "Moradia compartilhada com áreas de trabalho e convivência. Facilita a chegada e a criação de vínculos.", en: "Shared housing with work and social areas. Makes arriving and building connections easier.", es: "Vivienda compartida con áreas de trabajo y convivencia. Facilita la llegada y la creación de vínculos." },
    check: { pt: "Pergunte sobre privacidade, barulho e regras da casa.", en: "Ask about privacy, noise and house rules.", es: "Pregunta por privacidad, ruido y reglas de la casa." },
  },
  {
    id: "coworking", icon: "coworking",
    title: { pt: "Coworking", en: "Coworking", es: "Coworking" },
    text: { pt: "Espaços de trabalho com internet estável, salas de reunião e comunidade profissional.", en: "Workspaces with stable internet, meeting rooms and a professional community.", es: "Espacios de trabajo con internet estable, salas de reunión y comunidad profesional." },
    check: { pt: "Verifique horários, cabines para chamadas e planos semanais.", en: "Check opening hours, call booths and weekly plans.", es: "Verifica horarios, cabinas para llamadas y planes semanales." },
  },
  {
    id: "longStay", icon: "longStay",
    title: { pt: "Hospedagem de longa duração", en: "Long-stay accommodation", es: "Alojamiento de larga estancia" },
    text: { pt: "Estadias mensais costumam ter descontos e mais estrutura para trabalhar.", en: "Monthly stays often come with discounts and better work setups.", es: "Las estancias mensuales suelen tener descuentos y mejor estructura para trabajar." },
    check: { pt: "Confirme o que está incluso: limpeza, contas e internet.", en: "Confirm what's included: cleaning, utilities and internet.", es: "Confirma qué está incluido: limpieza, servicios e internet." },
  },
  {
    id: "workExchange", icon: "workExchange",
    title: { pt: "Troca de trabalho por hospedagem", en: "Work exchange for accommodation", es: "Intercambio de trabajo por alojamiento" },
    text: { pt: "Algumas horas de trabalho em troca de moradia. Pode reduzir custos, mas consome tempo e energia.", en: "A few hours of work in exchange for housing. It can lower costs but takes time and energy.", es: "Algunas horas de trabajo a cambio de alojamiento. Puede reducir costos, pero consume tiempo y energía." },
    check: { pt: "Verifique se o visto permite esse tipo de atividade.", en: "Check whether your visa allows this kind of activity.", es: "Verifica si tu visado permite este tipo de actividad." },
  },
  {
    id: "temporary", icon: "temporary",
    title: { pt: "Moradia temporária", en: "Temporary housing", es: "Vivienda temporal" },
    text: { pt: "Quartos ou apartamentos por semanas, úteis enquanto você conhece os bairros.", en: "Rooms or apartments for a few weeks, useful while you get to know the neighborhoods.", es: "Habitaciones o departamentos por semanas, útiles mientras conoces los barrios." },
    check: { pt: "Reserve os primeiros dias antes de chegar.", en: "Book your first days before arriving.", es: "Reserva los primeros días antes de llegar." },
  },
  {
    id: "internet", icon: "internet",
    title: { pt: "Qualidade de internet", en: "Internet quality", es: "Calidad de internet" },
    text: { pt: "A conexão é a base do trabalho remoto. Tenha sempre uma alternativa.", en: "Connectivity is the foundation of remote work. Always have an alternative.", es: "La conexión es la base del trabajo remoto. Ten siempre una alternativa." },
    check: { pt: "Peça um teste de velocidade antes de reservar.", en: "Ask for a speed test before booking.", es: "Pide una prueba de velocidad antes de reservar." },
  },
  {
    id: "safety", icon: "safety",
    title: { pt: "Segurança", en: "Safety", es: "Seguridad" },
    text: { pt: "Pesquise bairros, transporte noturno e canais de emergência locais.", en: "Research neighborhoods, night transport and local emergency channels.", es: "Investiga barrios, transporte nocturno y canales de emergencia locales." },
    check: { pt: "Considere fatores como gênero, raça e orientação sexual na avaliação.", en: "Consider factors like gender, race and sexual orientation in your assessment.", es: "Considera factores como género, raza y orientación sexual en la evaluación." },
  },
  {
    id: "cost", icon: "cost",
    title: { pt: "Custo de vida", en: "Cost of living", es: "Costo de vida" },
    text: { pt: "Moradia, alimentação, transporte, saúde e câmbio mudam o orçamento real.", en: "Housing, food, transport, health care and exchange rates change your real budget.", es: "Vivienda, comida, transporte, salud y tipo de cambio modifican el presupuesto real." },
    check: { pt: "Compare com sua renda líquida, não com a bruta.", en: "Compare against your net income, not gross.", es: "Compara con tus ingresos netos, no brutos." },
  },
  {
    id: "community", icon: "community",
    title: { pt: "Comunidade local", en: "Local community", es: "Comunidad local" },
    text: { pt: "Conviver com moradores e respeitar a cultura local torna a experiência mais justa e rica.", en: "Engaging with residents and respecting local culture makes the experience fairer and richer.", es: "Convivir con residentes y respetar la cultura local hace la experiencia más justa y rica." },
    check: { pt: "Prefira comércios locais e aprenda o básico do idioma.", en: "Support local businesses and learn the basics of the language.", es: "Prefiere comercios locales y aprende lo básico del idioma." },
  },
];

/** Depoimentos fictícios da comunidade de demonstração. */
export const testimonials: Testimonial[] = [
  {
    id: "t1", name: "Júlia M.", color: "#BE5436",
    role: { pt: "Marketing · primeira viagem planejada", en: "Marketing · first trip planned", es: "Marketing · primer viaje planificado" },
    text: {
      pt: "O checklist me fez perceber que eu não tinha pensado em plano de retorno. Ajustei meu orçamento antes de comprar a passagem.",
      en: "The checklist made me realize I hadn't thought about a return plan. I adjusted my budget before buying the ticket.",
      es: "El checklist me hizo notar que no había pensado en un plan de regreso. Ajusté mi presupuesto antes de comprar el pasaje.",
    },
  },
  {
    id: "t2", name: "Diego F.", color: "#3858A5",
    role: { pt: "Desenvolvedor · nômade há 4 anos", en: "Developer · nomad for 4 years", es: "Desarrollador · nómada hace 4 años" },
    text: {
      pt: "Gosto de responder iniciantes porque eu também errei muito no começo, principalmente com fuso horário e contratos.",
      en: "I like answering beginners because I also made a lot of mistakes at first, especially with time zones and contracts.",
      es: "Me gusta responder a quienes empiezan porque yo también me equivoqué mucho al principio, sobre todo con husos horarios y contratos.",
    },
  },
  {
    id: "t3", name: "Rafael N.", color: "#925806",
    role: { pt: "Atendimento · em transição para o remoto", en: "Customer service · moving to remote", es: "Atención al cliente · en transición al remoto" },
    text: {
      pt: "Ainda trabalho presencialmente, mas entender as formas de contratação me ajudou a traçar um plano realista para os próximos dois anos.",
      en: "I still work on-site, but understanding the types of contracts helped me draw up a realistic plan for the next two years.",
      es: "Todavía trabajo de forma presencial, pero entender las formas de contratación me ayudó a trazar un plan realista para los próximos dos años.",
    },
  },
];

/** Sugestões personalizadas por preocupação do onboarding. */
export interface Suggestion {
  id: string;
  concern: Concern;
  title: Localized;
  text: Localized;
  href: string;
  cta: Localized;
}

export const suggestions: Suggestion[] = [
  {
    id: "s-work", concern: "work", href: "/trabalho/guia",
    title: { pt: "Entenda as formas de contratação", en: "Understand the types of contracts", es: "Entiende las formas de contratación" },
    text: { pt: "Compare CLT, PJ, freelancer e contrato internacional antes de buscar vagas.", en: "Compare CLT, PJ, freelance and international contracts before looking for jobs.", es: "Compara CLT, PJ, freelance y contrato internacional antes de buscar vacantes." },
    cta: { pt: "Ler o guia", en: "Read the guide", es: "Leer la guía" },
  },
  {
    id: "s-income", concern: "income", href: "/planejador",
    title: { pt: "Monte sua reserva e orçamento", en: "Build your reserve and budget", es: "Arma tu reserva y presupuesto" },
    text: { pt: "Comece pelas tarefas de estabilidade financeira e custos no planejador.", en: "Start with the financial stability and cost tasks in the planner.", es: "Empieza por las tareas de estabilidad financiera y costos en el planificador." },
    cta: { pt: "Abrir planejador", en: "Open planner", es: "Abrir planificador" },
  },
  {
    id: "s-housing", concern: "housing", href: "/moradia",
    title: { pt: "Compare tipos de moradia", en: "Compare housing types", es: "Compara tipos de vivienda" },
    text: { pt: "Veja vantagens e cuidados de coliving, longa duração e moradia temporária.", en: "See the pros and cautions of coliving, long stays and temporary housing.", es: "Mira ventajas y cuidados del coliving, la larga estancia y la vivienda temporal." },
    cta: { pt: "Explorar moradia", en: "Explore housing", es: "Explorar vivienda" },
  },
  {
    id: "s-language", concern: "language", href: "/conversas",
    title: { pt: "Pratique com a comunidade", en: "Practice with the community", es: "Practica con la comunidad" },
    text: { pt: "Converse com pessoas que falam outros idiomas e use a tradução de apoio.", en: "Chat with people who speak other languages and use supporting translation.", es: "Conversa con personas que hablan otros idiomas y usa la traducción de apoyo." },
    cta: { pt: "Abrir conversas", en: "Open conversations", es: "Abrir conversaciones" },
  },
  {
    id: "s-safety", concern: "safety", href: "/seguranca",
    title: { pt: "Revise as orientações de segurança", en: "Review the safety guidance", es: "Revisa las orientaciones de seguridad" },
    text: { pt: "Saiba identificar vagas suspeitas e avaliar anúncios de moradia.", en: "Learn to spot suspicious jobs and evaluate housing listings.", es: "Aprende a identificar vacantes sospechosas y evaluar anuncios de vivienda." },
    cta: { pt: "Ver orientações", en: "See guidance", es: "Ver orientaciones" },
  },
  {
    id: "s-visa", concern: "visa", href: "/planejador",
    title: { pt: "Pesquise vistos em fontes oficiais", en: "Research visas in official sources", es: "Investiga visados en fuentes oficiales" },
    text: { pt: "Regras dependem do seu passaporte. Use o planejador para registrar fontes e prazos.", en: "Rules depend on your passport. Use the planner to record sources and deadlines.", es: "Las reglas dependen de tu pasaporte. Usa el planificador para registrar fuentes y plazos." },
    cta: { pt: "Ir para a tarefa", en: "Go to task", es: "Ir a la tarea" },
  },
  {
    id: "s-planning", concern: "planning", href: "/planejador",
    title: { pt: "Defina suas prioridades", en: "Set your priorities", es: "Define tus prioridades" },
    text: { pt: "Marque as tarefas mais urgentes como prioridade alta e acompanhe seu progresso.", en: "Mark the most urgent tasks as high priority and track your progress.", es: "Marca las tareas más urgentes como prioridad alta y sigue tu progreso." },
    cta: { pt: "Organizar tarefas", en: "Organize tasks", es: "Organizar tareas" },
  },
  {
    id: "s-community", concern: "community", href: "/comunidade",
    title: { pt: "Conheça quem já fez essa transição", en: "Meet people who've made the move", es: "Conoce a quien ya hizo esta transición" },
    text: { pt: "Pessoas com selo de mentoria estão disponíveis para conversar com iniciantes.", en: "People with a mentor badge are available to talk with beginners.", es: "Las personas con sello de mentoría están disponibles para conversar con principiantes." },
    cta: { pt: "Ir para a comunidade", en: "Go to community", es: "Ir a la comunidad" },
  },
];

/** Categorias de publicação relacionadas a cada preocupação (para recomendações). */
export const concernToCategory: Record<Concern, PostCategory[]> = {
  work: ["work"],
  income: ["planning", "work"],
  housing: ["housing", "destinations"],
  language: ["community", "destinations"],
  safety: ["documents", "wellbeing"],
  visa: ["documents"],
  planning: ["planning"],
  community: ["community", "wellbeing"],
  other: ["planning"],
};

/** Tarefas do planejador relacionadas a cada preocupação. */
export const concernToTasks: Record<Concern, string[]> = {
  work: ["income", "timezone"],
  income: ["finance", "costs"],
  housing: ["housing", "connectivity"],
  language: ["destination"],
  safety: ["emergency", "health"],
  visa: ["visa", "documents"],
  planning: ["costs", "emergency"],
  community: ["destination"],
  other: [],
};
