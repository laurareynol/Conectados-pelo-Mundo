import type { Destination } from "./types";

/**
 * DESTINOS DE DEMONSTRAÇÃO — custos, índices de conectividade/segurança,
 * coworkings e comentários são ilustrativos e fictícios.
 * Confirme sempre em fontes atualizadas antes de qualquer decisão.
 */
const day = 86400000;
const ago = (d: number) => new Date(Date.UTC(2026, 10, 9) - d * day).toISOString();

export const destinations: Destination[] = [
  {
    id: "lisboa",
    city: { pt: "Lisboa", en: "Lisbon", es: "Lisboa" },
    country: { pt: "Portugal", en: "Portugal", es: "Portugal" },
    region: "europe",
    languages: ["pt", "en"],
    timezone: "UTC+0",
    monthlyCost: { min: 1600, max: 2400 },
    connectivity: 88,
    safety: 4,
    housing: ["coliving", "longStay", "apartment"],
    palette: ["#0E5E63", "#F2B880", "#E9E4D8"],
    coworkings: [
      { name: "Ladeira Coworking (exemplo)", note: { pt: "Salas de chamada e passe mensal", en: "Call booths and monthly pass", es: "Cabinas para llamadas y pase mensual" } },
      { name: "Casa Azulejo Hub (exemplo)", note: { pt: "Eventos semanais de comunidade", en: "Weekly community events", es: "Eventos semanales de comunidad" } },
    ],
    summary: {
      pt: "Destino frequente para quem fala português, com boa infraestrutura e comunidade internacional ativa. A procura elevada pressiona o custo de moradia.",
      en: "A popular destination for Portuguese speakers, with good infrastructure and an active international community. High demand pushes up housing costs.",
      es: "Destino frecuente para quienes hablan portugués, con buena infraestructura y una comunidad internacional activa. La alta demanda encarece la vivienda.",
    },
    highlights: [
      { pt: "Idioma facilita a adaptação para brasileiros", en: "The language makes adapting easier for Brazilians", es: "El idioma facilita la adaptación para brasileños" },
      { pt: "Muitos coworkings e encontros de comunidade", en: "Many coworking spaces and community meetups", es: "Muchos coworkings y encuentros de comunidad" },
      { pt: "Transporte público bem conectado", en: "Well-connected public transport", es: "Transporte público bien conectado" },
    ],
    considerations: [
      { pt: "Moradia cara e concorrida, especialmente no verão", en: "Expensive, competitive housing, especially in summer", es: "Vivienda cara y disputada, sobre todo en verano" },
      { pt: "Impacto da gentrificação sobre moradores locais", en: "Impact of gentrification on local residents", es: "Impacto de la gentrificación en los residentes locales" },
      { pt: "Fuso de 3 a 4 horas à frente do Brasil", en: "3 to 4 hours ahead of Brazil", es: "De 3 a 4 horas por delante de Brasil" },
    ],
    comments: [
      { id: "lc1", authorId: "ana", lang: "pt", createdAt: ago(20), text: "Reserve pelo menos o primeiro mês antes de chegar. Procurar quarto já na cidade foi bem mais caro do que eu imaginava." },
      { id: "lc2", authorId: "kwame", lang: "en", createdAt: ago(41), text: "Great coworking scene, but check that your lease includes utilities. Winters inside old buildings can be cold." },
    ],
  },
  {
    id: "cdmx",
    city: { pt: "Cidade do México", en: "Mexico City", es: "Ciudad de México" },
    country: { pt: "México", en: "Mexico", es: "México" },
    region: "latam",
    languages: ["es", "en"],
    timezone: "UTC−6",
    monthlyCost: { min: 1200, max: 1900 },
    connectivity: 79,
    safety: 3,
    housing: ["coliving", "apartment", "temporary"],
    palette: ["#BE5436", "#F4D35E", "#2D3047"],
    coworkings: [
      { name: "Patio Roma Coworking (exemplo)", note: { pt: "Ambiente silencioso e internet com redundância", en: "Quiet environment and redundant internet", es: "Ambiente silencioso e internet redundante" } },
      { name: "Jacaranda Work Club (exemplo)", note: { pt: "Diárias acessíveis", en: "Affordable day passes", es: "Pases diarios accesibles" } },
    ],
    summary: {
      pt: "Metrópole com vida cultural intensa e grande comunidade remota. Bairros variam muito em segurança e custo; pesquisar a região é essencial.",
      en: "A metropolis with an intense cultural life and a large remote community. Neighborhoods vary widely in safety and cost, so researching the area is essential.",
      es: "Metrópolis con intensa vida cultural y una gran comunidad remota. Los barrios varían mucho en seguridad y costo; investigar la zona es esencial.",
    },
    highlights: [
      { pt: "Fuso compatível com equipes nas Américas", en: "Time zone compatible with teams in the Americas", es: "Huso compatible con equipos en América" },
      { pt: "Oferta ampla de coworkings e cafés", en: "Wide range of coworking spaces and cafés", es: "Amplia oferta de coworkings y cafés" },
    ],
    considerations: [
      { pt: "Altitude elevada pode exigir adaptação", en: "High altitude may require adjustment", es: "La altitud puede requerir adaptación" },
      { pt: "Segurança varia bastante entre bairros", en: "Safety varies a lot between neighborhoods", es: "La seguridad varía mucho entre barrios" },
      { pt: "Debate local sobre aumento de aluguéis", en: "Local debate about rising rents", es: "Debate local sobre el aumento de los alquileres" },
    ],
    comments: [
      { id: "mc1", authorId: "diego", lang: "es", createdAt: ago(9), text: "Vale la pena tener un plan B de internet: en temporada de lluvias hubo cortes de luz en mi edificio un par de veces." },
      { id: "mc2", authorId: "julia", lang: "pt", createdAt: ago(30), text: "Fiquei duas semanas e amei, mas senti o fuso nas reuniões com o Brasil. Organize sua agenda antes." },
    ],
  },
  {
    id: "florianopolis",
    city: { pt: "Florianópolis" },
    country: { pt: "Brasil", en: "Brazil", es: "Brasil" },
    region: "brazil",
    languages: ["pt"],
    timezone: "UTC−3",
    monthlyCost: { min: 900, max: 1500 },
    connectivity: 82,
    safety: 4,
    housing: ["longStay", "apartment", "workExchange"],
    palette: ["#1E6F8A", "#A7D3D4", "#F6EFE3"],
    coworkings: [
      { name: "Ilha Coletiva (exemplo)", note: { pt: "Comunidade de tecnologia ativa", en: "Active tech community", es: "Comunidad tecnológica activa" } },
      { name: "Lagoa Hub (exemplo)", note: { pt: "Planos semanais", en: "Weekly plans", es: "Planes semanales" } },
    ],
    summary: {
      pt: "Uma forma de testar a rotina de trabalho remoto viajando sem sair do país: sem questões de visto, mesmo fuso e boa estrutura de coworkings.",
      en: "A way to test a traveling remote-work routine without leaving the country: no visa issues, same time zone and good coworking infrastructure.",
      es: "Una forma de probar la rutina de trabajo remoto viajando sin salir del país: sin cuestiones de visado, mismo huso y buena oferta de coworkings.",
    },
    highlights: [
      { pt: "Ótimo destino para uma primeira experiência", en: "A great destination for a first experience", es: "Excelente destino para una primera experiencia" },
      { pt: "Sem câmbio nem visto para brasileiros", en: "No currency exchange or visa for Brazilians", es: "Sin cambio de moneda ni visado para brasileños" },
    ],
    considerations: [
      { pt: "Preços sobem muito na alta temporada", en: "Prices rise sharply in high season", es: "Los precios suben mucho en temporada alta" },
      { pt: "Deslocamento entre bairros depende de carro ou ônibus", en: "Getting between neighborhoods depends on car or bus", es: "Moverse entre barrios depende de auto o bus" },
    ],
    comments: [
      { id: "fc1", authorId: "lucas", lang: "pt", createdAt: ago(12), text: "Fiz um mês aqui como teste antes de ir para fora. Ajudou a entender quanto eu gasto e como me organizo com a equipe." },
    ],
  },
  {
    id: "buenos-aires",
    city: { pt: "Buenos Aires" },
    country: { pt: "Argentina", en: "Argentina", es: "Argentina" },
    region: "latam",
    languages: ["es"],
    timezone: "UTC−3",
    monthlyCost: { min: 1000, max: 1700 },
    connectivity: 74,
    safety: 3,
    housing: ["apartment", "temporary", "longStay"],
    palette: ["#3858A5", "#E8C9A0", "#F5F1EA"],
    coworkings: [
      { name: "Palermo Norte Cowork (exemplo)", note: { pt: "Espaço amplo com cabines", en: "Spacious with booths", es: "Espacio amplio con cabinas" } },
    ],
    summary: {
      pt: "Mesmo fuso de Brasília e vida cultural rica. A economia instável faz com que preços e formas de pagamento mudem com frequência.",
      en: "Same time zone as Brasília and a rich cultural life. An unstable economy means prices and payment methods change often.",
      es: "Mismo huso que Brasilia y una vida cultural rica. La economía inestable hace que precios y medios de pago cambien con frecuencia.",
    },
    highlights: [
      { pt: "Mesmo fuso horário do Brasil", en: "Same time zone as Brazil", es: "Mismo huso horario que Brasil" },
      { pt: "Cena cultural e gastronômica intensa", en: "Intense cultural and food scene", es: "Intensa escena cultural y gastronómica" },
    ],
    considerations: [
      { pt: "Inflação e câmbio exigem atenção diária", en: "Inflation and exchange rates require daily attention", es: "La inflación y el tipo de cambio requieren atención diaria" },
      { pt: "Contratos de aluguel temporário variam muito", en: "Temporary rental contracts vary a lot", es: "Los contratos de alquiler temporario varían mucho" },
    ],
    comments: [
      { id: "bc1", authorId: "camila", lang: "es", createdAt: ago(18), text: "Consulten siempre cómo conviene pagar el alquiler antes de llegar; las condiciones cambian rápido." },
    ],
  },
  {
    id: "medellin",
    city: { pt: "Medellín" },
    country: { pt: "Colômbia", en: "Colombia", es: "Colombia" },
    region: "latam",
    languages: ["es"],
    timezone: "UTC−5",
    monthlyCost: { min: 900, max: 1500 },
    connectivity: 76,
    safety: 3,
    housing: ["coliving", "apartment", "workExchange"],
    palette: ["#157A4A", "#F1C27D", "#EFEAE0"],
    coworkings: [
      { name: "Montaña Coworking (exemplo)", note: { pt: "Terraço e salas de reunião", en: "Rooftop and meeting rooms", es: "Terraza y salas de reunión" } },
      { name: "Eterna Primavera Hub (exemplo)", note: { pt: "Comunidade bilíngue", en: "Bilingual community", es: "Comunidad bilingüe" } },
    ],
    summary: {
      pt: "Clima ameno o ano todo e comunidade remota grande. É importante entender os impactos da chegada de estrangeiros nos bairros mais procurados.",
      en: "Mild climate all year and a large remote community. It's important to understand the impact of incoming foreigners on the most sought-after neighborhoods.",
      es: "Clima templado todo el año y una gran comunidad remota. Es importante entender el impacto de la llegada de extranjeros en los barrios más buscados.",
    },
    highlights: [
      { pt: "Clima estável favorece rotina de trabalho", en: "Stable climate supports a work routine", es: "El clima estable favorece la rutina de trabajo" },
      { pt: "Muitas opções de coliving", en: "Many coliving options", es: "Muchas opciones de coliving" },
    ],
    considerations: [
      { pt: "Segurança e golpes em aplicativos de encontro", en: "Safety and scams on dating apps", es: "Seguridad y estafas en apps de citas" },
      { pt: "Fuso 2 horas atrás de Brasília", en: "2 hours behind Brasília", es: "2 horas detrás de Brasilia" },
    ],
    comments: [
      { id: "mdc1", authorId: "camila", lang: "es", createdAt: ago(6), text: "Busquen barrios fuera de los más turísticos: se integra mejor con la comunidad local y los precios son más justos." },
      { id: "mdc2", authorId: "diego", lang: "en", createdAt: ago(50), text: "The coliving I stayed at had backup power, which saved me during two client demos." },
    ],
  },
  {
    id: "valencia",
    city: { pt: "Valência", en: "Valencia", es: "Valencia" },
    country: { pt: "Espanha", en: "Spain", es: "España" },
    region: "europe",
    languages: ["es", "en"],
    timezone: "UTC+1",
    monthlyCost: { min: 1500, max: 2200 },
    connectivity: 90,
    safety: 4,
    housing: ["apartment", "coliving", "longStay"],
    palette: ["#6B4FA0", "#F3B391", "#F1ECE4"],
    coworkings: [
      { name: "Turia Studio (exemplo)", note: { pt: "Internet por fibra e café incluso", en: "Fiber internet and coffee included", es: "Fibra óptica y café incluido" } },
    ],
    summary: {
      pt: "Cidade média, plana e com ciclovias, com custo menor que outras capitais europeias. A Espanha tem regras específicas para estadias de trabalho remoto.",
      en: "A flat, mid-sized city with bike lanes and lower costs than other European capitals. Spain has specific rules for remote-work stays.",
      es: "Ciudad mediana, plana y con ciclovías, más económica que otras capitales europeas. España tiene reglas específicas para estancias de trabajo remoto.",
    },
    highlights: [
      { pt: "Excelente conectividade de fibra", en: "Excellent fiber connectivity", es: "Excelente conectividad por fibra" },
      { pt: "Cidade fácil de percorrer de bicicleta", en: "Easy to get around by bike", es: "Fácil de recorrer en bicicleta" },
    ],
    considerations: [
      { pt: "Regras migratórias exigem pesquisa em fontes oficiais", en: "Immigration rules require research in official sources", es: "Las reglas migratorias requieren investigar en fuentes oficiales" },
      { pt: "Fuso 4 horas à frente de Brasília", en: "4 hours ahead of Brasília", es: "4 horas por delante de Brasilia" },
    ],
    comments: [
      { id: "vc1", authorId: "kwame", lang: "en", createdAt: ago(15), text: "Very calm city to work from. Do your homework on visa requirements for your specific nationality — it really differs." },
    ],
  },
  {
    id: "chiang-mai",
    city: { pt: "Chiang Mai" },
    country: { pt: "Tailândia", en: "Thailand", es: "Tailandia" },
    region: "asia",
    languages: ["en"],
    timezone: "UTC+7",
    monthlyCost: { min: 800, max: 1300 },
    connectivity: 80,
    safety: 4,
    housing: ["longStay", "coliving", "temporary"],
    palette: ["#B82630", "#E9C46A", "#F4EFE6"],
    coworkings: [
      { name: "Nimman Desk (exemplo)", note: { pt: "Aberto 24 horas", en: "Open 24 hours", es: "Abierto 24 horas" } },
      { name: "Old City Commons (exemplo)", note: { pt: "Eventos de integração", en: "Social events", es: "Eventos de integración" } },
    ],
    summary: {
      pt: "Comunidade nômade consolidada e custo baixo, mas com fuso muito distante das Américas e temporada de queimadas que afeta a qualidade do ar.",
      en: "An established nomad community and low costs, but a time zone far from the Americas and a burning season that affects air quality.",
      es: "Comunidad nómada consolidada y costo bajo, pero con un huso muy lejano a América y una temporada de quemas que afecta la calidad del aire.",
    },
    highlights: [
      { pt: "Custo de vida acessível", en: "Affordable cost of living", es: "Costo de vida accesible" },
      { pt: "Comunidade internacional grande", en: "Large international community", es: "Gran comunidad internacional" },
    ],
    considerations: [
      { pt: "Fuso de 10 horas em relação a Brasília", en: "10-hour difference from Brasília", es: "10 horas de diferencia con Brasilia" },
      { pt: "Qualidade do ar ruim entre fevereiro e abril", en: "Poor air quality between February and April", es: "Mala calidad del aire entre febrero y abril" },
      { pt: "Barreira de idioma fora das áreas turísticas", en: "Language barrier outside tourist areas", es: "Barrera idiomática fuera de las zonas turísticas" },
    ],
    comments: [
      { id: "cc1", authorId: "mei", lang: "en", createdAt: ago(4), text: "Plan your months around the burning season. I now spend February to April somewhere else." },
    ],
  },
  {
    id: "montevideu",
    city: { pt: "Montevidéu", en: "Montevideo", es: "Montevideo" },
    country: { pt: "Uruguai", en: "Uruguay", es: "Uruguay" },
    region: "latam",
    languages: ["es"],
    timezone: "UTC−3",
    monthlyCost: { min: 1400, max: 2100 },
    connectivity: 86,
    safety: 4,
    housing: ["apartment", "longStay", "temporary"],
    palette: ["#2D6A8E", "#D9C5A0", "#F2EEE6"],
    coworkings: [
      { name: "Rambla Coworking (exemplo)", note: { pt: "Vista para o rio e salas privativas", en: "River view and private rooms", es: "Vista al río y salas privadas" } },
    ],
    summary: {
      pt: "Cidade tranquila, com ótima cobertura de internet e mesmo fuso do Brasil. Custo de vida mais alto que a média da região.",
      en: "A calm city with great internet coverage and the same time zone as Brazil. Cost of living above the regional average.",
      es: "Ciudad tranquila, con excelente cobertura de internet y mismo huso que Brasil. Costo de vida por encima del promedio regional.",
    },
    highlights: [
      { pt: "Infraestrutura digital robusta", en: "Robust digital infrastructure", es: "Infraestructura digital robusta" },
      { pt: "Ritmo de vida mais calmo", en: "Slower pace of life", es: "Ritmo de vida más tranquilo" },
    ],
    considerations: [
      { pt: "Custo acima de outros destinos latino-americanos", en: "Higher cost than other Latin American destinations", es: "Costo superior a otros destinos latinoamericanos" },
      { pt: "Inverno frio e úmido", en: "Cold, damp winter", es: "Invierno frío y húmedo" },
    ],
    comments: [],
  },
];

export function getDestination(id: string) {
  return destinations.find((d) => d.id === id);
}
