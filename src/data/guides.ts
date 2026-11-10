import type { ContractType, Localized } from "./types";

/** Guia educativo sobre formas de trabalho. Não é aconselhamento jurídico. */
export interface WorkModelGuide {
  id: "clt" | "pj" | "freelancer" | "autonomous" | "international";
  contract: ContractType;
  title: Localized;
  summary: Localized;
  whatIs: Localized;
  pros: Localized[];
  cons: Localized[];
  forNomads: Localized;
  stability: "low" | "medium" | "high";
  autonomy: "low" | "medium" | "high";
  bureaucracy: "low" | "medium" | "high";
}

export const workGuides: WorkModelGuide[] = [
  {
    id: "clt",
    contract: "clt",
    title: { pt: "CLT", en: "CLT (Brazilian formal employment)", es: "CLT (empleo formal brasileño)" },
    summary: {
      pt: "Emprego formal regido pela Consolidação das Leis do Trabalho.",
      en: "Formal employment governed by Brazil's Consolidation of Labor Laws.",
      es: "Empleo formal regido por la Consolidación de las Leyes del Trabajo de Brasil.",
    },
    whatIs: {
      pt: "Vínculo empregatício com carteira assinada, salário fixo e direitos como férias, 13º salário, FGTS e contribuição previdenciária. O teletrabalho pode estar previsto em contrato.",
      en: "An employment relationship with a signed work card, fixed salary and rights such as paid vacation, a 13th-month salary, the FGTS severance fund and social security contributions. Remote work may be set out in the contract.",
      es: "Relación laboral formal con salario fijo y derechos como vacaciones, aguinaldo (13.º salario), fondo FGTS y aportes jubilatorios. El teletrabajo puede estar previsto en el contrato.",
    },
    pros: [
      { pt: "Previsibilidade de renda e benefícios", en: "Predictable income and benefits", es: "Ingresos previsibles y beneficios" },
      { pt: "Proteção trabalhista e previdenciária", en: "Labor and social security protection", es: "Protección laboral y previsional" },
    ],
    cons: [
      { pt: "Trabalhar do exterior depende de acordo com a empresa", en: "Working from abroad depends on your employer's agreement", es: "Trabajar desde el exterior depende de un acuerdo con la empresa" },
      { pt: "Pode haver restrições de fuso, segurança de dados e jurisdição", en: "There may be time-zone, data security and jurisdiction restrictions", es: "Puede haber restricciones de huso horario, seguridad de datos y jurisdicción" },
    ],
    forNomads: {
      pt: "Converse com o RH antes de viajar e registre por escrito as condições acordadas: período, local, horários e equipamentos.",
      en: "Talk to HR before traveling and put the agreed conditions in writing: period, location, hours and equipment.",
      es: "Habla con Recursos Humanos antes de viajar y deja por escrito las condiciones acordadas: período, lugar, horarios y equipos.",
    },
    stability: "high",
    autonomy: "low",
    bureaucracy: "low",
  },
  {
    id: "pj",
    contract: "pj",
    title: { pt: "Pessoa Jurídica (PJ)", en: "Legal entity contractor (PJ)", es: "Persona jurídica (PJ)" },
    summary: {
      pt: "Prestação de serviços por meio de uma empresa aberta em seu nome.",
      en: "Providing services through a company registered in your name.",
      es: "Prestación de servicios a través de una empresa registrada a tu nombre.",
    },
    whatIs: {
      pt: "Você abre um CNPJ (como MEI, ME ou outra modalidade) e emite notas fiscais para quem contrata seus serviços. Não há vínculo empregatício nem os benefícios da CLT.",
      en: "You register a company (CNPJ, such as MEI or ME) and issue invoices to those who hire your services. There is no employment relationship or CLT benefits.",
      es: "Registras una empresa (CNPJ, como MEI o ME) y emites facturas a quienes contratan tus servicios. No hay relación laboral ni beneficios de la CLT.",
    },
    pros: [
      { pt: "Mais flexibilidade de local e de clientes", en: "More flexibility in location and clients", es: "Más flexibilidad de lugar y de clientes" },
      { pt: "Valores brutos geralmente maiores", en: "Gross amounts are usually higher", es: "Montos brutos generalmente mayores" },
    ],
    cons: [
      { pt: "Você é responsável por impostos, contabilidade e previdência", en: "You are responsible for taxes, accounting and social security", es: "Eres responsable de impuestos, contabilidad y previsión" },
      { pt: "Sem férias remuneradas ou FGTS", en: "No paid vacation or FGTS", es: "Sin vacaciones pagas ni FGTS" },
    ],
    forNomads: {
      pt: "Mantenha uma reserva para meses sem contrato e consulte um contador sobre obrigações enquanto estiver fora do país.",
      en: "Keep a reserve for months without contracts and consult an accountant about your obligations while abroad.",
      es: "Mantén una reserva para los meses sin contrato y consulta a un contador sobre tus obligaciones mientras estés fuera del país.",
    },
    stability: "medium",
    autonomy: "medium",
    bureaucracy: "medium",
  },
  {
    id: "freelancer",
    contract: "freelancer",
    title: { pt: "Freelancer", en: "Freelancer", es: "Freelancer" },
    summary: {
      pt: "Trabalho por projeto ou demanda, para diferentes clientes.",
      en: "Project-based or on-demand work for different clients.",
      es: "Trabajo por proyecto o por demanda, para distintos clientes.",
    },
    whatIs: {
      pt: "Forma de atuação baseada em projetos com começo, meio e fim. Pode ser formalizada como PJ ou autônomo, dependendo do volume e do país.",
      en: "A way of working based on projects with a clear start and end. It can be formalized as a company or as self-employment, depending on volume and country.",
      es: "Forma de trabajo basada en proyectos con inicio y fin. Puede formalizarse como empresa o como trabajo independiente, según el volumen y el país.",
    },
    pros: [
      { pt: "Alta autonomia sobre agenda e local", en: "High autonomy over schedule and location", es: "Alta autonomía sobre agenda y lugar" },
      { pt: "Possibilidade de diversificar clientes", en: "Ability to diversify clients", es: "Posibilidad de diversificar clientes" },
    ],
    cons: [
      { pt: "Renda variável e busca constante por projetos", en: "Variable income and a constant search for projects", es: "Ingresos variables y búsqueda constante de proyectos" },
      { pt: "Contratos mal definidos podem gerar conflitos", en: "Poorly defined contracts can lead to disputes", es: "Contratos mal definidos pueden generar conflictos" },
    ],
    forNomads: {
      pt: "Formalize escopo, prazos e pagamento por escrito. Evite começar a viagem dependendo de um único cliente.",
      en: "Formalize scope, deadlines and payment in writing. Avoid starting your trip dependent on a single client.",
      es: "Formaliza alcance, plazos y pago por escrito. Evita comenzar el viaje dependiendo de un solo cliente.",
    },
    stability: "low",
    autonomy: "high",
    bureaucracy: "medium",
  },
  {
    id: "autonomous",
    contract: "autonomous",
    title: { pt: "Trabalho autônomo", en: "Self-employment", es: "Trabajo autónomo" },
    summary: {
      pt: "Atuação como profissional independente, sem empresa aberta.",
      en: "Working as an independent professional without a registered company.",
      es: "Actuación como profesional independiente, sin empresa registrada.",
    },
    whatIs: {
      pt: "A pessoa presta serviços em nome próprio, recolhendo impostos como pessoa física (por exemplo, com recibo de pagamento a autônomo). Comum em aulas, consultorias e serviços pontuais.",
      en: "You provide services in your own name and pay taxes as an individual (for example, with a self-employment receipt). Common for teaching, consulting and one-off services.",
      es: "La persona presta servicios a su nombre y paga impuestos como persona física (por ejemplo, con recibo de trabajador autónomo). Común en clases, consultorías y servicios puntuales.",
    },
    pros: [
      { pt: "Início simples, sem abrir empresa", en: "Simple to start, no company needed", es: "Inicio simple, sin abrir empresa" },
      { pt: "Flexibilidade de horários", en: "Flexible hours", es: "Flexibilidad de horarios" },
    ],
    cons: [
      { pt: "Carga tributária pode ser maior", en: "The tax burden may be higher", es: "La carga tributaria puede ser mayor" },
      { pt: "Menos proteção em caso de doença ou pausa", en: "Less protection in case of illness or breaks", es: "Menos protección en caso de enfermedad o pausa" },
    ],
    forNomads: {
      pt: "Organize recibos, comprovantes e contribuições previdenciárias. Confirme com um profissional como declarar a renda enquanto estiver fora.",
      en: "Keep receipts, records and social security contributions organized. Check with a professional how to declare income while abroad.",
      es: "Organiza recibos, comprobantes y aportes previsionales. Confirma con un profesional cómo declarar ingresos mientras estés fuera.",
    },
    stability: "low",
    autonomy: "high",
    bureaucracy: "low",
  },
  {
    id: "international",
    contract: "international",
    title: { pt: "Contrato internacional", en: "International contract", es: "Contrato internacional" },
    summary: {
      pt: "Prestação de serviços para empresa sediada em outro país.",
      en: "Providing services to a company based in another country.",
      es: "Prestación de servicios para una empresa con sede en otro país.",
    },
    whatIs: {
      pt: "A empresa estrangeira contrata você como prestador (contractor), diretamente ou por meio de plataformas de contratação global. O pagamento costuma ser em moeda estrangeira.",
      en: "A foreign company hires you as a contractor, directly or through global hiring platforms. Payment is usually in foreign currency.",
      es: "La empresa extranjera te contrata como proveedor (contractor), directamente o a través de plataformas de contratación global. El pago suele ser en moneda extranjera.",
    },
    pros: [
      { pt: "Acesso a oportunidades globais", en: "Access to global opportunities", es: "Acceso a oportunidades globales" },
      { pt: "Remuneração em moeda forte", en: "Pay in strong currencies", es: "Remuneración en moneda fuerte" },
    ],
    cons: [
      { pt: "Exige atenção a câmbio, tributação e envio de recursos", en: "Requires attention to exchange rates, taxes and money transfers", es: "Exige atención al tipo de cambio, impuestos y envío de dinero" },
      { pt: "Contratos regidos por leis de outro país", en: "Contracts governed by another country's laws", es: "Contratos regidos por leyes de otro país" },
    ],
    forNomads: {
      pt: "Leia com atenção cláusulas sobre local de trabalho permitido. Algumas empresas restringem países por questões fiscais ou de segurança.",
      en: "Read clauses about permitted work locations carefully. Some companies restrict countries for tax or security reasons.",
      es: "Lee con atención las cláusulas sobre el lugar de trabajo permitido. Algunas empresas restringen países por motivos fiscales o de seguridad.",
    },
    stability: "medium",
    autonomy: "medium",
    bureaucracy: "high",
  },
];
