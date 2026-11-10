import type { GuideSection, Localized } from "./types";

export const safetySections: GuideSection[] = [
  {
    id: "vagas-suspeitas",
    title: { pt: "Como identificar vagas suspeitas", en: "How to spot suspicious job offers", es: "Cómo identificar vacantes sospechosas" },
    intro: {
      pt: "Golpes com falsas vagas remotas são comuns. Alguns sinais merecem atenção redobrada.",
      en: "Scams with fake remote jobs are common. Some signs deserve extra attention.",
      es: "Las estafas con falsas vacantes remotas son comunes. Algunas señales merecen atención especial.",
    },
    items: [
      { pt: "Pedido de pagamento para participar do processo seletivo, treinamento ou compra de equipamento.", en: "Requests for payment to join the hiring process, for training or to buy equipment.", es: "Pedidos de pago para participar del proceso de selección, capacitación o compra de equipos." },
      { pt: "Salário muito acima do mercado para pouca experiência ou poucas horas.", en: "Pay far above market rates for little experience or few hours.", es: "Salario muy por encima del mercado para poca experiencia o pocas horas." },
      { pt: "Contato apenas por aplicativos de mensagem, sem e-mail corporativo ou site verificável.", en: "Contact only through messaging apps, with no company email or verifiable website.", es: "Contacto solo por apps de mensajería, sin correo corporativo ni sitio verificable." },
      { pt: "Pressa para decidir e pedido de documentos ou dados bancários antes de uma entrevista.", en: "Pressure to decide quickly and requests for documents or bank details before an interview.", es: "Prisa para decidir y pedido de documentos o datos bancarios antes de una entrevista." },
      { pt: "Descrição vaga da função e da empresa. Pesquise o nome da empresa e de quem recruta.", en: "Vague role and company descriptions. Search the company's and recruiter's names.", es: "Descripción vaga del puesto y de la empresa. Busca el nombre de la empresa y de quien recluta." },
    ],
  },
  {
    id: "moradia",
    title: { pt: "Como avaliar informações de moradia", en: "How to evaluate housing information", es: "Cómo evaluar información de vivienda" },
    intro: {
      pt: "Anúncios falsos e expectativas irreais podem comprometer o orçamento e a segurança.",
      en: "Fake listings and unrealistic expectations can compromise your budget and safety.",
      es: "Los anuncios falsos y las expectativas irreales pueden comprometer el presupuesto y la seguridad.",
    },
    items: [
      { pt: "Prefira plataformas com avaliações e proteção ao pagamento. Evite transferências diretas para desconhecidos.", en: "Prefer platforms with reviews and payment protection. Avoid direct transfers to strangers.", es: "Prefiere plataformas con reseñas y protección de pago. Evita transferencias directas a desconocidos." },
      { pt: "Peça uma chamada de vídeo mostrando o imóvel e teste a internet no local, se possível.", en: "Ask for a video call showing the place and test the internet there, if possible.", es: "Pide una videollamada mostrando el lugar y prueba el internet allí, si es posible." },
      { pt: "Confira o bairro em diferentes horários e fontes, não apenas nas fotos do anúncio.", en: "Check the neighborhood at different times and from different sources, not just the listing photos.", es: "Revisa el barrio en distintos horarios y fuentes, no solo en las fotos del anuncio." },
      { pt: "Leia as regras de cancelamento, caução e o que está incluso no valor.", en: "Read the cancellation and deposit rules and what the price includes.", es: "Lee las reglas de cancelación, depósito y lo que incluye el precio." },
    ],
  },
  {
    id: "dados-pessoais",
    title: { pt: "Como proteger seus dados pessoais", en: "How to protect your personal data", es: "Cómo proteger tus datos personales" },
    intro: {
      pt: "Trabalhar de redes públicas e lidar com documentos em viagem exige cuidados digitais.",
      en: "Working on public networks and handling documents while traveling requires digital care.",
      es: "Trabajar desde redes públicas y manejar documentos de viaje exige cuidados digitales.",
    },
    items: [
      { pt: "Ative autenticação em dois fatores e use um gerenciador de senhas.", en: "Turn on two-factor authentication and use a password manager.", es: "Activa la autenticación en dos pasos y usa un gestor de contraseñas." },
      { pt: "Evite acessar contas bancárias em redes Wi-Fi públicas sem proteção.", en: "Avoid accessing bank accounts on unprotected public Wi-Fi.", es: "Evita acceder a cuentas bancarias en redes Wi-Fi públicas sin protección." },
      { pt: "Não publique fotos de passaporte, cartões de embarque ou endereço onde está hospedado.", en: "Don't post photos of your passport, boarding passes or where you're staying.", es: "No publiques fotos del pasaporte, tarjetas de embarque o la dirección donde te alojas." },
      { pt: "Mantenha cópias criptografadas de documentos importantes.", en: "Keep encrypted copies of important documents.", es: "Guarda copias cifradas de documentos importantes." },
    ],
  },
  {
    id: "negociacoes",
    title: { pt: "Cuidados em negociações entre usuários", en: "Care when dealing with other users", es: "Cuidados en negociaciones entre usuarios" },
    intro: {
      pt: "A plataforma conecta pessoas, mas não intermedeia pagamentos, aluguéis ou contratos.",
      en: "The platform connects people but does not mediate payments, rentals or contracts.",
      es: "La plataforma conecta personas, pero no intermedia pagos, alquileres ni contratos.",
    },
    items: [
      { pt: "Nunca envie dinheiro, códigos de verificação ou senhas para outras pessoas usuárias.", en: "Never send money, verification codes or passwords to other users.", es: "Nunca envíes dinero, códigos de verificación ni contraseñas a otras personas usuarias." },
      { pt: "Desconfie de ofertas de moradia ou trabalho feitas por mensagem privada sem referências.", en: "Be wary of housing or job offers made by private message without references.", es: "Desconfía de ofertas de vivienda o trabajo hechas por mensaje privado sin referencias." },
      { pt: "Em encontros presenciais, escolha locais públicos e avise alguém de confiança.", en: "For in-person meetups, choose public places and let someone you trust know.", es: "En encuentros presenciales, elige lugares públicos y avisa a alguien de confianza." },
      { pt: "Registre acordos por escrito e use canais com proteção ao consumidor.", en: "Put agreements in writing and use channels with consumer protection.", es: "Registra acuerdos por escrito y usa canales con protección al consumidor." },
    ],
  },
  {
    id: "regras",
    title: { pt: "Regras de convivência da comunidade", en: "Community guidelines", es: "Reglas de convivencia de la comunidad" },
    intro: {
      pt: "Queremos um espaço acolhedor para pessoas de diferentes origens, corpos, idiomas e realidades.",
      en: "We want a welcoming space for people of different backgrounds, bodies, languages and realities.",
      es: "Queremos un espacio acogedor para personas de distintos orígenes, cuerpos, idiomas y realidades.",
    },
    items: [
      { pt: "Respeite todas as pessoas. Discriminação, assédio e discurso de ódio resultam em remoção.", en: "Respect everyone. Discrimination, harassment and hate speech lead to removal.", es: "Respeta a todas las personas. La discriminación, el acoso y el discurso de odio implican expulsión." },
      { pt: "Compartilhe experiências, não promessas. Evite vender o nomadismo como solução fácil.", en: "Share experiences, not promises. Avoid selling nomadism as an easy fix.", es: "Comparte experiencias, no promesas. Evita vender el nomadismo como una solución fácil." },
      { pt: "Indique fontes quando falar de vistos, impostos ou saúde.", en: "Cite sources when talking about visas, taxes or health.", es: "Indica fuentes cuando hables de visados, impuestos o salud." },
      { pt: "Considere o impacto da sua presença nas comunidades locais.", en: "Consider the impact of your presence on local communities.", es: "Considera el impacto de tu presencia en las comunidades locales." },
      { pt: "Publicidade e links de afiliados passam por revisão da moderação.", en: "Advertising and affiliate links are reviewed by moderators.", es: "La publicidad y los enlaces de afiliados pasan por revisión de moderación." },
    ],
  },
];

export const transparencyItems: { title: Localized; text: Localized }[] = [
  {
    title: { pt: "Conteúdo curado, não definitivo", en: "Curated, not definitive, content", es: "Contenido curado, no definitivo" },
    text: {
      pt: "Organizamos informações para orientar a pesquisa, mas elas não substituem fontes oficiais nem profissionais especializados.",
      en: "We organize information to guide your research, but it doesn't replace official sources or specialized professionals.",
      es: "Organizamos información para orientar la búsqueda, pero no reemplaza fuentes oficiales ni profesionales especializados.",
    },
  },
  {
    title: { pt: "Selo de fonte verificada", en: "Verified source badge", es: "Sello de fuente verificada" },
    text: {
      pt: "Nesta versão, o selo indica apenas vagas de demonstração previamente definidas como curadas. Não há verificação de empresas reais.",
      en: "In this version, the badge only marks demo jobs previously defined as curated. No real companies are verified.",
      es: "En esta versión, el sello indica solo vacantes de demostración definidas previamente como curadas. No se verifican empresas reales.",
    },
  },
  {
    title: { pt: "Sem coleta automática de dados", en: "No automated data collection", es: "Sin recolección automática de datos" },
    text: {
      pt: "Não fazemos scraping de vagas, hospedagens ou perfis de outros sites. Todo conteúdo de exemplo foi escrito para a demonstração.",
      en: "We don't scrape jobs, listings or profiles from other sites. All sample content was written for the demo.",
      es: "No hacemos scraping de vacantes, alojamientos ni perfiles de otros sitios. Todo el contenido de ejemplo fue escrito para la demostración.",
    },
  },
  {
    title: { pt: "Seus dados ficam com você", en: "Your data stays with you", es: "Tus datos se quedan contigo" },
    text: {
      pt: "Perfil, planejamento e mensagens ficam salvos no seu navegador. Você pode exportar ou apagar tudo no perfil.",
      en: "Your profile, planning and messages are stored in your browser. You can export or delete everything from your profile.",
      es: "Tu perfil, planificación y mensajes se guardan en tu navegador. Puedes exportar o borrar todo desde el perfil.",
    },
  },
];

export interface LegalDoc {
  id: "termos" | "privacidade";
  updatedAt: string;
  sections: { title: Localized; paragraphs: Localized[] }[];
}

export const legalDocs: Record<"terms" | "privacy", LegalDoc> = {
  terms: {
    id: "termos",
    updatedAt: "2026-11-01",
    sections: [
      {
        title: { pt: "1. Sobre a plataforma", en: "1. About the platform", es: "1. Sobre la plataforma" },
        paragraphs: [
          {
            pt: "O Conectados pelo Mundo é um espaço de informação, planejamento e comunidade para pessoas interessadas no trabalho remoto e no nomadismo digital.",
            en: "Conectados pelo Mundo is a space for information, planning and community for people interested in remote work and digital nomadism.",
            es: "Conectados pelo Mundo es un espacio de información, planificación y comunidad para personas interesadas en el trabajo remoto y el nomadismo digital.",
          },
          {
            pt: "Esta versão é uma demonstração: vagas, destinos, perfis e conversas são fictícios.",
            en: "This version is a demo: jobs, destinations, profiles and conversations are fictional.",
            es: "Esta versión es una demostración: vacantes, destinos, perfiles y conversaciones son ficticios.",
          },
        ],
      },
      {
        title: { pt: "2. Responsabilidades de quem usa", en: "2. User responsibilities", es: "2. Responsabilidades de quien usa" },
        paragraphs: [
          {
            pt: "Você é responsável pelas informações que publica e pelas decisões que toma com base no conteúdo da plataforma.",
            en: "You are responsible for the information you post and the decisions you make based on the platform's content.",
            es: "Eres responsable de la información que publicas y de las decisiones que tomas con base en el contenido de la plataforma.",
          },
          {
            pt: "Questões jurídicas, fiscais, migratórias e de saúde devem ser confirmadas com fontes oficiais e profissionais habilitados.",
            en: "Legal, tax, immigration and health matters must be confirmed with official sources and licensed professionals.",
            es: "Las cuestiones jurídicas, fiscales, migratorias y de salud deben confirmarse con fuentes oficiales y profesionales habilitados.",
          },
        ],
      },
      {
        title: { pt: "3. Conteúdo da comunidade", en: "3. Community content", es: "3. Contenido de la comunidad" },
        paragraphs: [
          {
            pt: "Publicações devem seguir as regras de convivência. Conteúdos com links externos, contatos ou pedidos de pagamento podem passar por revisão.",
            en: "Posts must follow the community guidelines. Content with external links, contacts or payment requests may be reviewed.",
            es: "Las publicaciones deben seguir las reglas de convivencia. Los contenidos con enlaces externos, contactos o pedidos de pago pueden ser revisados.",
          },
        ],
      },
      {
        title: { pt: "4. Limitações", en: "4. Limitations", es: "4. Limitaciones" },
        paragraphs: [
          {
            pt: "A plataforma não intermedeia contratos de trabalho, aluguéis ou pagamentos entre pessoas usuárias.",
            en: "The platform does not mediate employment contracts, rentals or payments between users.",
            es: "La plataforma no intermedia contratos de trabajo, alquileres ni pagos entre personas usuarias.",
          },
        ],
      },
    ],
  },
  privacy: {
    id: "privacidade",
    updatedAt: "2026-11-01",
    sections: [
      {
        title: { pt: "1. Quais dados usamos", en: "1. What data we use", es: "1. Qué datos usamos" },
        paragraphs: [
          {
            pt: "Nesta versão, os dados de perfil, planejamento, itens salvos, publicações e mensagens ficam armazenados apenas no seu navegador (localStorage).",
            en: "In this version, profile, planning, saved items, posts and messages are stored only in your browser (localStorage).",
            es: "En esta versión, los datos de perfil, planificación, guardados, publicaciones y mensajes se almacenan solo en tu navegador (localStorage).",
          },
        ],
      },
      {
        title: { pt: "2. Para que usamos", en: "2. Why we use it", es: "2. Para qué los usamos" },
        paragraphs: [
          {
            pt: "As respostas do onboarding servem para personalizar sugestões, próximos passos e oportunidades exibidas no painel.",
            en: "Onboarding answers are used to personalize suggestions, next steps and opportunities shown on your dashboard.",
            es: "Las respuestas del onboarding sirven para personalizar sugerencias, próximos pasos y oportunidades del panel.",
          },
        ],
      },
      {
        title: { pt: "3. Seus direitos e controles", en: "3. Your rights and controls", es: "3. Tus derechos y controles" },
        paragraphs: [
          {
            pt: "Você pode exportar seus dados em JSON ou apagá-los a qualquer momento na página de perfil. Também pode definir quem vê seu perfil e se aceita mensagens.",
            en: "You can export your data as JSON or delete it at any time on the profile page. You can also choose who sees your profile and whether you accept messages.",
            es: "Puedes exportar tus datos en JSON o borrarlos en cualquier momento desde el perfil. También puedes definir quién ve tu perfil y si aceptas mensajes.",
          },
        ],
      },
      {
        title: { pt: "4. Integrações futuras", en: "4. Future integrations", es: "4. Integraciones futuras" },
        paragraphs: [
          {
            pt: "Caso a plataforma passe a usar servidores, tradução automática ou login, esta política será atualizada antes da coleta de qualquer novo dado, em conformidade com a LGPD.",
            en: "If the platform starts using servers, automatic translation or login, this policy will be updated before any new data is collected, in line with Brazil's LGPD.",
            es: "Si la plataforma pasa a usar servidores, traducción automática o inicio de sesión, esta política se actualizará antes de recopilar nuevos datos, de acuerdo con la LGPD brasileña.",
          },
        ],
      },
    ],
  },
};
