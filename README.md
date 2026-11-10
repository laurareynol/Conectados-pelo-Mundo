# Conectados pelo Mundo

Plataforma web para apoiar pessoas na transição para o nomadismo digital — especialmente quem já trabalha remotamente e quer fazer o primeiro deslocamento, ou quem trabalha presencialmente e quer se preparar para essa transição. Reúne **planejamento**, **oportunidades de trabalho remoto**, **moradia e infraestrutura** e **comunidade** em um só lugar, comunicando de forma honesta os custos, riscos e desigualdades envolvidos.

> Esta versão funciona inteiramente no navegador, com **dados de demonstração fictícios** e persistência em `localStorage`. Não depende de chaves de API nem de backend.

---

## Requisitos

- Node.js **18.18 ou superior** (testado com Node 22)
- npm 9+

## Instalação e execução

```bash
npm install          # instala as dependências
npm run dev          # ambiente de desenvolvimento em http://localhost:3000
```

Versão de produção:

```bash
npm run build        # gera a build otimizada
npm run start        # serve a build em http://localhost:3000
```

Verificação de tipos:

```bash
npm run typecheck
```

As fontes (Inter e Plus Jakarta Sans) são instaladas via npm (`@fontsource-variable`), então a aplicação roda **sem acesso à internet** depois do `npm install`.

---

## Funcionalidades

| Área | Rota | O que faz |
|---|---|---|
| Página inicial | `/` | Proposta, o que é nomadismo digital, pilares da plataforma, seção “não é uma vida perfeita”, como funciona, público, histórias fictícias e CTAs |
| Onboarding | `/onboarding` | 7 etapas com validação: nome, momento, área, forma de trabalho, destino/regiões, prazo e preocupações. Gera a área inicial personalizada |
| Painel | `/painel` | Saudação, progresso, checklist por área, próximas tarefas, sugestões por preocupação, vagas sugeridas, conteúdos recomendados e salvos |
| Planejador | `/planejador` | 12 tarefas padrão + tarefas personalizadas, concluir/reabrir, prioridade, anotações com salvamento automático, filtros, exclusão, restauração e aviso jurídico |
| Trabalho | `/trabalho`, `/trabalho/[id]` | 14 vagas fictícias com 7 filtros + palavra-chave, ordenação, selo “fonte verificada” apenas em vagas curadas da demonstração, detalhe com link de exemplo |
| Guia de contratação | `/trabalho/guia` | CLT, PJ, freelancer, autônomo e contrato internacional com prós, pontos de atenção, comparativo e aviso de que não é aconselhamento jurídico |
| Moradia | `/moradia`, `/moradia/[id]` | 9 tópicos (coliving, coworking, internet, segurança, custo…) e 8 destinos fictícios com filtros, custo estimado, índice ilustrativo de conectividade, coworkings, comentários e “adicionar ao planejador” |
| Comunidade | `/comunidade`, `/pessoas/[id]` | Feed de perguntas e relatos, 7 categorias, filtros por idioma/categoria/destino, curtidas, comentários, salvos, denúncia, nova publicação com moderação simulada e perfis fictícios |
| Conversas | `/conversas` | Lista e conversa individual, envio de mensagens, idioma de cada pessoa e botão “Traduzir mensagem” com demonstração transparente |
| Perfil | `/perfil` | Foto (redimensionada e salva localmente) ou avatar, idiomas, área, forma de trabalho, experiência, destinos de interesse, disponibilidade para iniciantes, privacidade, progresso, salvos, exportação e exclusão de dados |
| Salvos | `/salvos` | Vagas, destinos, publicações e guias salvos, com abas por tipo |
| Segurança | `/seguranca` | Vagas suspeitas, moradia, dados pessoais, negociações, regras de convivência, transparência e canal de denúncia simulado com protocolo |
| Termos e privacidade | `/termos`, `/privacidade` | Documentos fictícios estruturados com sumário |
| Busca global | `Ctrl/⌘ + K` e `/busca` | Busca em páginas, vagas, destinos, publicações, guias e tarefas |

Recursos transversais: **pt/en/es** com seletor funcional, **tema claro/escuro** (respeita a preferência do sistema e é salvo), toasts de feedback, estados de carregamento/erro/vazio/sucesso, banner de demonstração dispensável, layout mobile-first com navegação inferior no celular.

---

## Arquitetura

```
src/
├── app/                    # Rotas (Next.js App Router)
│   ├── layout.tsx          # Layout raiz: providers, cabeçalho, rodapé, navegação mobile
│   ├── page.tsx            # Página inicial
│   ├── onboarding/ painel/ planejador/ trabalho/ moradia/ comunidade/
│   ├── conversas/ perfil/ salvos/ busca/ seguranca/ termos/ privacidade/ pessoas/
│   ├── not-found.tsx · error.tsx
├── components/
│   ├── ui/                 # Sistema visual: Button, Card, Badge, Field, Chip, Modal, Toast,
│   │                       # Notice, Progress, States (vazio/erro/skeleton), SaveButton…
│   ├── layout/             # Header, MobileNav, Footer, busca global, idioma, tema, banner
│   └── features/           # JobCard, DestinationCard, PostCard, SavedList, LegalDocument…
├── data/                   # Dados de demonstração e tipos (vagas, destinos, posts, conversas,
│                           # usuários, guias, segurança, planejador, conteúdos)
├── i18n/
│   ├── config.ts           # Idiomas disponíveis e metadados
│   ├── dictionaries/       # pt.ts (base), en.ts, es.ts — tipados pela mesma estrutura
│   └── I18nProvider.tsx    # Contexto: t, l (conteúdo localizado), formatação Intl
├── lib/                    # storage (localStorage), busca, recomendações, comunidade, utilidades
├── services/               # Camada de dados (interfaces + implementação local) e tradução
└── store/                  # Estado global persistido (perfil, planejador, salvos, posts…)
```

### Camada de dados e integração futura (Supabase ou outro backend)

- `src/services/types.ts` define os contratos (`JobsRepository`, `DestinationsRepository`, `CommunityRepository`, `ConversationsRepository`).
- `src/services/local.ts` implementa esses contratos com os dados de `src/data`, com latência simulada para exibir estados de carregamento.
- `src/services/supabase.ts` mostra como implementar a mesma interface com Supabase.
- `src/services/index.ts` escolhe a fonte com `NEXT_PUBLIC_DATA_SOURCE` (veja `.env.example`). Os componentes consomem apenas `api.*`, então trocar a fonte não exige mudar telas.
- Dados do usuário (perfil, planejador, salvos, curtidas, posts, comentários, mensagens, denúncias) ficam em `src/store/AppStore.tsx`, persistidos via `src/lib/storage.ts` (chaves com namespace e versão `cpm:v1:*`). Para migrar ao backend, substitua as ações do store por chamadas à API mantendo as mesmas assinaturas.

### Tradução de mensagens

`src/services/translation.ts` define a interface `TranslationProvider`. O provedor de demonstração **não traduz automaticamente**: devolve apenas traduções escritas previamente nos dados de exemplo (`demoTranslations`) e retorna “indisponível” para mensagens novas. A interface deixa isso explícito ao usuário. A mensagem original nunca é alterada — a tradução é exibida separadamente. Para integrar uma API real (DeepL, Google Cloud Translation etc.), crie uma rota de servidor (ex.: `app/api/translate/route.ts`) que guarde a chave fora do navegador e implemente `TranslationProvider` chamando essa rota.

### Internacionalização

- Interface: dicionários em `src/i18n/dictionaries`. O tipo `Dictionary` (derivado de `pt.ts`) garante que inglês e espanhol tenham **todas** as chaves.
- Conteúdo: textos de dados usam o tipo `Localized` (`{ pt, en?, es? }`), com fallback para português.
- Publicações e mensagens da comunidade permanecem no idioma em que foram escritas, como em uma comunidade real; o idioma é indicado em cada item.

**Adicionar um idioma:** inclua o código em `src/i18n/config.ts`, crie `dictionaries/<código>.ts` tipado como `Dictionary`, registre em `dictionaries/index.ts` e, opcionalmente, adicione traduções aos campos `Localized` em `src/data`.

### Sistema visual

- Tokens de cor em CSS (`src/app/globals.css`) para tema claro e escuro, mapeados no Tailwind (`tailwind.config.ts`): petróleo (confiança, primária), terracota (conexão/calor humano, destaque) e azul (mobilidade/informação), sobre neutros quentes.
- Tipografia: Plus Jakarta Sans (títulos) e Inter (texto).
- Ilustrações de destinos são composições abstratas geradas a partir da paleta de cada cidade, evitando imagens clichê de viagem.
- Acessibilidade: HTML semântico, link “pular para o conteúdo”, foco visível, labels associados, `aria-live` para feedback, diálogos com foco preso e Esc, contraste AA nos dois temas e respeito a `prefers-reduced-motion`.

---

## Dados de demonstração

Tudo em `src/data` é **fictício** e identificado na interface (banner global, avisos por seção e selos “Demonstração”):

- Empresas das vagas trazem “(exemplo)” no nome e links apontam para `example.com`.
- Custos, índices de conectividade/segurança, coworkings e comentários de destinos são ilustrativos.
- Perfis, publicações, depoimentos e conversas são inventados.
- Nenhum dado foi obtido por scraping de sites de vagas, hospedagem ou redes sociais.

Para recomeçar do zero, use **Perfil → Apagar dados locais** (ou limpe o `localStorage` do site).

## O que é real, simulado e futuro

- **Funciona de verdade (local):** navegação, onboarding, personalização, planejador, filtros, busca, salvos, curtidas, comentários, publicações, envio de mensagens, perfil com foto, privacidade, exportação/remoção de dados, idiomas, temas.
- **Simulado:** conteúdo das vagas/destinos/perfis/conversas, selo de fonte verificada, moderação (regra local por palavras-chave e links), denúncias (protocolo gerado localmente), traduções de mensagens (pré-escritas), respostas de outras pessoas (não há respostas automáticas).
- **Depende de integração futura:** contas e login, banco de dados compartilhado entre usuários, mensagens em tempo real, tradução automática, moderação humana, curadoria e verificação de vagas reais, dados atualizados de custo de vida e conectividade.
