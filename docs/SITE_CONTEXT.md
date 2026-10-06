# Site oficial do DiabetesIA: contexto comum dos agentes

Workspace: `~/dev/WORKSAPCE-SDD-DIABETES`
- V1 Flutter: `diabetes-ai-flutter/DiabetesIA`
- V2 React: `diabetes-ai-react/Front/diabetesIA-v2`
- Backend: `Diabetesia-backend`

O site será um repositório NOVO e público: `Rocha29/diabetesia-site`, na pasta local `~/dev/WORKSAPCE-SDD-DIABETES/diabetesia-site`. Vai usar React, TypeScript, Vite 5 (Node 18.20 neste Mac, então NADA de Vite 6/7) e CSS (CSS Modules ou CSS organizado por componente). Será publicado no GitHub Pages via Actions. A URL esperada é `https://rocha29.github.io/diabetesia-site/`; a URL real será confirmada depois do deploy.

## Fatos verificados (o que existe de verdade)
**Já na branch principal (master/main):**
- Login com conta Google (Firebase Auth), na V1 e na V2.
- **Glicemia:** registro manual (valor, unidade, contexto: jejum, pós-refeição, antes de dormir, aleatório). **Leitura do valor do glicosímetro por foto** com IA. Análise por IA do registro. Classificação por faixas (muito baixa <54, baixa <70, na faixa 70–180, alta >180).
- **Refeições:** registro por descrição e/ou foto. A **IA identifica os alimentos na foto**. Os carboidratos podem ser informados pelo usuário. Pela foto, a IA **não** estima quantidade no fluxo atual da nuvem.
- **Medicamentos:** registro (nome, dose, unidade), **leitura do medicamento por foto** com IA.
- **Receitas médicas:** foto da receita → a IA lê os medicamentos prescritos → **comparação determinística** (sem IA) com os medicamentos registrados.
- **Assistente/chat de IA** sobre os registros. O histórico do chat não é salvo.
- **Histórico:** registros recentes na Home (últimos dias). Editar e apagar registros.
- **Relatórios:** filtro por período e abas por tipo.
  - V1: gera PDF e compartilha (WhatsApp/Drive).
  - V2: "Salvar como PDF" pela impressão do navegador.
- **Contador de uso diário da IA na nuvem.**
- **Privacidade:**
  - os dados ficam no Firebase (Google), numa área acessível só pela conta do próprio usuário (regras por usuário);
  - as chaves de IA ficam só no servidor, nunca no app;
  - os logs do servidor não guardam o conteúdo das fotos e textos;
  - na versão web, as fotos não são guardadas; no Android, ficam no próprio celular;
  - a IA na nuvem recebe só a foto e o texto da análise, sem nome nem e-mail.
- **IA:** via servidor próprio, que encaminha a um provedor de IA na nuvem (modelos de terceiros). Opcionalmente, IA local (Ollama), em testes.

**Implementado, mas em revisão (PR aberto, ainda sem merge). No site: "Em desenvolvimento" ou "Chegando em breve":**
- Perfil (sexo, data de nascimento, altura, peso) e **check-in mensal** (peso, tabagismo, atividade física), com comparação objetiva com o mês anterior.
- Política de privacidade versionada com aceite, consentimento separado para a IA na nuvem, ver/exportar meus dados (JSON) e excluir a conta.
- **Acompanhamento semanal:** resumo da semana, gráfico de 7 dias, hipoglicemias em destaque, padrões observados, "Para conversar com seu médico", observações da IA validadas (sem diagnóstico), relatório da semana.

**Já na branch principal da V2 (React) e do backend, mas a V2 web NÃO está publicada. No site: "Em desenvolvimento":**
- **Acompanhamento Hoje, Semana, Mês e Ano** (somente dados registrados; sem dados suficientes, a tela avisa) e **insights** com nível de confiança e limitações (não indicam causa, não diagnosticam).
- **Relatório de acompanhamento** por semana, mês, 3 meses ou período personalizado, com "Salvar como PDF" (impressão do navegador), CSV e JSON.
- **Lembretes** (medicamento, refeição e glicemia) e **Minhas consultas** (agenda, avisos, reagendamento e preparo), com o backend como fonte de verdade.
- **Controles de privacidade** (aceite, consentimento da IA na nuvem, ver/exportar dados em JSON, excluir conta) e **perfil + check-in mensal**.
- Backend: IA local com Ollama (em testes), servidor de desenvolvimento e feature flags. **Não vira texto do site** (é infraestrutura interna).

**Planejado (não existe):**
- Dispositivos (**Garmin** e **Google Health Connect**): a arquitetura está preparada, mas não há conexão com nenhum dispositivo. No site, "Planejado".
- Publicação nas lojas e modelo comercial. O **Premium** da V2 existe só com pagamento SIMULADO, em desenvolvimento: **não mencionar planos, preços nem pagamento no site**.

**Disponibilidade REAL:**
- **Android:** só APK de teste interno. **NÃO** está na Play Store.
- **iPhone:** não disponível.
- **Web (V2):** não publicada, roda só localmente.
- **Preço/modelo comercial:** não definido.
- Repositórios de código **privados**: não linkar o GitHub do código.
- Não há screenshots reais. Usar **ilustrações da interface em HTML/CSS** fiéis ao app (Home, Glicemia, Refeição, Receita, Chat, Relatórios, Acompanhamento), com **dados fictícios** e a legenda "Ilustração da interface com dados fictícios". Deixar a galeria orientada a dados (`src/data/screens.ts`), pronta para trocar por imagens reais.

**Identidade do app hoje** (referência, o site pode ter identidade própria e harmoniosa):
- azul primário `#2196F3`, fonte Poppins;
- ícone: coração branco sobre fundo azul;
- a V2 usa Material Icons.

## Regras rígidas
- **Não inventar nada:** usuários, downloads, depoimentos, parceiros, certificações, estudos, percentuais, lojas, preços.
- **Não fazer claims médicos.** Usar a linguagem de "apoio, organização, acompanhamento e contexto". A IA não diagnostica, não prescreve e não substitui profissionais.
- **Aviso fixo:** "O DiabetesIA é uma ferramenta de apoio e acompanhamento. Ele não substitui o acompanhamento de profissionais de saúde."
- **Nunca escrever:** "100% seguro", "segurança bancária", "dados totalmente protegidos".
- **Sem serviços externos com credenciais.** O analytics fica só preparado (stub).
- **Sem chaves e sem dados reais de usuários.**
- O código de V1, V2 e backend NÃO é alterado. Só os READMEs, numa etapa posterior feita pelo orquestrador.
