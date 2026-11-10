import type { PlannerTaskTemplate } from "./types";
import type { PlannerTask } from "@/store/types";

/** Checklist padrão da primeira jornada. */
export const plannerTemplates: PlannerTaskTemplate[] = [
  {
    id: "income",
    category: "work",
    priority: "high",
    title: { pt: "Definir fonte de renda", en: "Define your source of income", es: "Definir la fuente de ingresos" },
    description: {
      pt: "Confirme se seu trabalho atual permite atuar de outro lugar, por quanto tempo e em quais condições. Se for buscar novas fontes, mapeie clientes, vagas ou projetos antes de viajar.",
      en: "Confirm whether your current job allows you to work from elsewhere, for how long and under which conditions. If you need new sources, map clients, jobs or projects before you travel.",
      es: "Confirma si tu trabajo actual permite trabajar desde otro lugar, por cuánto tiempo y en qué condiciones. Si buscarás nuevas fuentes, identifica clientes, vacantes o proyectos antes de viajar.",
    },
  },
  {
    id: "finance",
    category: "finance",
    priority: "high",
    title: { pt: "Verificar estabilidade financeira", en: "Check your financial stability", es: "Verificar la estabilidad financiera" },
    description: {
      pt: "Calcule uma reserva de emergência para alguns meses, considere variação cambial e verifique como receberá pagamentos fora do país.",
      en: "Calculate an emergency fund for a few months, consider exchange-rate swings and check how you will receive payments abroad.",
      es: "Calcula un fondo de emergencia para algunos meses, considera la variación cambiaria y verifica cómo recibirás pagos en el exterior.",
    },
  },
  {
    id: "documents",
    category: "documents",
    priority: "high",
    sensitive: true,
    title: { pt: "Organizar documentos", en: "Organize your documents", es: "Organizar documentos" },
    description: {
      pt: "Passaporte com validade, documentos de identificação, comprovantes de renda e cópias digitais em local seguro.",
      en: "A valid passport, ID documents, proof of income and digital copies stored somewhere safe.",
      es: "Pasaporte vigente, documentos de identidad, comprobantes de ingresos y copias digitales en un lugar seguro.",
    },
  },
  {
    id: "destination",
    category: "destination",
    priority: "medium",
    title: { pt: "Pesquisar destino", en: "Research your destination", es: "Investigar el destino" },
    description: {
      pt: "Compare custo de vida, clima, idioma, segurança e comunidade local. Prefira começar por um destino com boa infraestrutura.",
      en: "Compare cost of living, climate, language, safety and local community. Consider starting with a destination with good infrastructure.",
      es: "Compara costo de vida, clima, idioma, seguridad y comunidad local. Considera empezar por un destino con buena infraestructura.",
    },
  },
  {
    id: "housing",
    category: "housing",
    priority: "medium",
    title: { pt: "Pesquisar moradia", en: "Research housing", es: "Investigar alojamiento" },
    description: {
      pt: "Avalie coliving, hospedagem de longa duração ou moradia temporária. Reserve as primeiras semanas antes de chegar e desconfie de pagamentos fora de plataformas conhecidas.",
      en: "Consider coliving, long-stay rentals or temporary housing. Book the first weeks before arriving and be wary of payments outside known platforms.",
      es: "Evalúa coliving, alojamiento de larga estancia o vivienda temporal. Reserva las primeras semanas antes de llegar y desconfía de pagos fuera de plataformas conocidas.",
    },
  },
  {
    id: "connectivity",
    category: "connectivity",
    priority: "high",
    title: { pt: "Verificar conectividade", en: "Check connectivity", es: "Verificar la conectividad" },
    description: {
      pt: "Confirme a velocidade da internet na moradia, pesquise chips locais ou eSIM e tenha um plano B (coworking ou roteador móvel).",
      en: "Confirm internet speed where you'll stay, look into local SIM cards or eSIM and have a plan B (a coworking space or mobile hotspot).",
      es: "Confirma la velocidad de internet en el alojamiento, investiga chips locales o eSIM y ten un plan B (coworking o router móvil).",
    },
  },
  {
    id: "timezone",
    category: "work",
    priority: "medium",
    title: { pt: "Avaliar fuso horário", en: "Evaluate the time zone", es: "Evaluar el huso horario" },
    description: {
      pt: "Compare o fuso do destino com o da sua equipe ou clientes e combine horários de disponibilidade antes de viajar.",
      en: "Compare the destination's time zone with your team's or clients' and agree on availability hours before you travel.",
      es: "Compara el huso horario del destino con el de tu equipo o clientes y acuerda horarios de disponibilidad antes de viajar.",
    },
  },
  {
    id: "costs",
    category: "finance",
    priority: "high",
    title: { pt: "Planejar custos", en: "Plan your costs", es: "Planificar los costos" },
    description: {
      pt: "Liste passagens, moradia, alimentação, transporte, coworking, seguro, taxas bancárias e impostos. Some uma margem para imprevistos.",
      en: "List flights, housing, food, transport, coworking, insurance, bank fees and taxes. Add a margin for the unexpected.",
      es: "Enumera pasajes, alojamiento, comida, transporte, coworking, seguro, comisiones bancarias e impuestos. Suma un margen para imprevistos.",
    },
  },
  {
    id: "visa",
    category: "documents",
    priority: "high",
    sensitive: true,
    title: { pt: "Pesquisar questões de visto", en: "Research visa requirements", es: "Investigar cuestiones de visado" },
    description: {
      pt: "Verifique nos canais oficiais do país de destino as regras de entrada para o seu passaporte, tempo de permanência e se há visto específico para trabalho remoto.",
      en: "Check the destination country's official channels for entry rules for your passport, length of stay and whether there is a specific remote-work visa.",
      es: "Consulta en los canales oficiales del país de destino las reglas de entrada para tu pasaporte, tiempo de permanencia y si existe una visa específica para trabajo remoto.",
    },
  },
  {
    id: "health",
    category: "health",
    priority: "high",
    sensitive: true,
    title: { pt: "Organizar seguro e saúde", en: "Arrange insurance and health care", es: "Organizar seguro y salud" },
    description: {
      pt: "Contrate seguro com cobertura adequada ao destino, verifique vacinas recomendadas e leve receitas de medicamentos de uso contínuo.",
      en: "Get insurance with adequate coverage for the destination, check recommended vaccines and bring prescriptions for ongoing medication.",
      es: "Contrata un seguro con cobertura adecuada al destino, verifica las vacunas recomendadas y lleva recetas de medicamentos de uso continuo.",
    },
  },
  {
    id: "equipment",
    category: "equipment",
    priority: "medium",
    title: { pt: "Preparar equipamentos de trabalho", en: "Prepare your work equipment", es: "Preparar el equipo de trabajo" },
    description: {
      pt: "Notebook revisado, adaptadores de tomada, backup em nuvem, gerenciador de senhas e autenticação em dois fatores ativada.",
      en: "A serviced laptop, plug adapters, cloud backup, a password manager and two-factor authentication turned on.",
      es: "Portátil revisado, adaptadores de enchufe, copia de seguridad en la nube, gestor de contraseñas y autenticación en dos pasos activada.",
    },
  },
  {
    id: "emergency",
    category: "safety",
    priority: "high",
    title: { pt: "Criar plano de retorno ou emergência", en: "Create a return or emergency plan", es: "Crear un plan de regreso o emergencia" },
    description: {
      pt: "Defina contatos de emergência, endereço do consulado, reserva para uma passagem de volta e critérios para decidir voltar antes do previsto.",
      en: "Set emergency contacts, the consulate's address, money for a return ticket and criteria for deciding to come back earlier than planned.",
      es: "Define contactos de emergencia, la dirección del consulado, un fondo para un pasaje de regreso y criterios para decidir volver antes de lo previsto.",
    },
  },
];

export function defaultPlanner(): PlannerTask[] {
  return plannerTemplates.map((t) => ({
    id: t.id,
    templateId: t.id,
    category: t.category,
    priority: t.priority,
    done: false,
    notes: "",
    custom: false,
  }));
}

export function getTemplate(id?: string) {
  return plannerTemplates.find((t) => t.id === id);
}
