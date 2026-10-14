export type ScreenId =
  | 'home'
  | 'nutrition'
  | 'more'
  | 'glucose'
  | 'food'
  | 'medication'
  | 'pressure'
  | 'prescription'
  | 'report'
  | 'tracking'
  | 'journey'
  | 'chat'
  | 'assistant'
  | 'sharing'
  | 'following'
  | 'acompanhamento'
  | 'profile'
  | 'checkin'
  | 'login';

export interface Screen {
  id: ScreenId;
  /** Nome curto da tela, usado como legenda. */
  label: string;
  /** Uma frase sobre o que a tela faz (legenda da galeria). */
  caption: string;
  /** Texto alternativo: descreve o que a imagem mostra. */
  alt: string;
  webp: string;
  png: string;
}

// Telas reais do app (V2, novo visual), 390x844 @2x, com dados de demonstração
// fictícios. Geradas por tools/screenshots (npm run shots). Não editar as imagens à mão.
import loginWebp from '../assets/screens/login.webp';
import loginPng from '../assets/screens/login.png';
import homeWebp from '../assets/screens/home.webp';
import homePng from '../assets/screens/home.png';
import nutritionWebp from '../assets/screens/nutrition.webp';
import nutritionPng from '../assets/screens/nutrition.png';
import moreWebp from '../assets/screens/more.webp';
import morePng from '../assets/screens/more.png';
import glucoseWebp from '../assets/screens/glucose.webp';
import glucosePng from '../assets/screens/glucose.png';
import foodWebp from '../assets/screens/food.webp';
import foodPng from '../assets/screens/food.png';
import pressureWebp from '../assets/screens/pressure.webp';
import pressurePng from '../assets/screens/pressure.png';
import medicationWebp from '../assets/screens/medication.webp';
import medicationPng from '../assets/screens/medication.png';
import prescriptionWebp from '../assets/screens/prescription.webp';
import prescriptionPng from '../assets/screens/prescription.png';
import chatWebp from '../assets/screens/chat.webp';
import chatPng from '../assets/screens/chat.png';
import assistantWebp from '../assets/screens/assistant.webp';
import assistantPng from '../assets/screens/assistant.png';
import sharingWebp from '../assets/screens/sharing.webp';
import sharingPng from '../assets/screens/sharing.png';
import acompanhamentoWebp from '../assets/screens/acompanhamento.webp';
import acompanhamentoPng from '../assets/screens/acompanhamento.png';
import followingWebp from '../assets/screens/following.webp';
import followingPng from '../assets/screens/following.png';
import reportWebp from '../assets/screens/report.webp';
import reportPng from '../assets/screens/report.png';
import trackingWebp from '../assets/screens/tracking.webp';
import trackingPng from '../assets/screens/tracking.png';
import journeyWebp from '../assets/screens/journey.webp';
import journeyPng from '../assets/screens/journey.png';
import profileWebp from '../assets/screens/profile.webp';
import profilePng from '../assets/screens/profile.png';
import checkinWebp from '../assets/screens/checkin.webp';
import checkinPng from '../assets/screens/checkin.png';

export const screens: Screen[] = [
  {
    id: 'home',
    label: 'Início',
    caption: 'O que importa agora num carrossel e o Registro rápido a um toque.',
    alt: 'Tela Início do app: saudação "Boa noite, Ana!", carrossel "Para você agora" com a última glicemia, 108 mg/dL, marcada com um círculo e a palavra "Na faixa geral", botões de Registro rápido para glicose, refeição, remédios e pressão, e a barra inferior com as abas Início, Histórico, Assistente e Mais.',
    webp: homeWebp,
    png: homePng,
  },
  {
    id: 'nutrition',
    label: 'Alimentação de hoje',
    caption: 'Calorias do dia em relação à sua meta, estimadas pela tabela TACO/IBGE.',
    alt: 'Tela Início com o cartão "Alimentação de hoje" no carrossel: 990 de 1.800 kcal com barra de progresso, 2 refeições, 1 acima da meta de carboidratos, e a nota "Estimativa pela tabela de alimentos (TACO/IBGE)".',
    webp: nutritionWebp,
    png: nutritionPng,
  },
  {
    id: 'more',
    label: 'Mais',
    caption: 'Perfil, quem acompanha você, lembretes, consultas, receitas e privacidade.',
    alt: 'Aba Mais: cartão do perfil de Ana Souza, contadores "2 Me acompanham" e "1 Eu acompanho" e a lista Quem me acompanha, Lembretes, Minhas consultas, Receitas, Premium, Privacidade, Avaliar o app, Reportar um problema e Sobre.',
    webp: moreWebp,
    png: morePng,
  },
  {
    id: 'glucose',
    label: 'Registrar glicose',
    caption: 'Digite o valor ou use a foto do glicosímetro, com dicas para a foto sair boa.',
    alt: 'Formulário Registrar Glicose com o valor 142 mg/dL, data e hora, momento "Em jejum", campo de observação, dicas para fotografar o aparelho e os botões Tirar foto, Escolher da galeria, Analisar com IA e Salvar.',
    webp: glucoseWebp,
    png: glucosePng,
  },
  {
    id: 'food',
    label: 'Conferir porções',
    caption: 'Você ajusta as porções e o app estima carboidratos e calorias pela tabela.',
    alt: 'Tela Registrar Alimentação conferindo a porção de um alimento em xícaras, com a estimativa "cerca de 50 a 80 g" de carboidratos e "cerca de 310 a 490 kcal", o aviso para não usar o valor para calcular insulina e a fonte: tabela IBGE e TACO.',
    webp: foodWebp,
    png: foodPng,
  },
  {
    id: 'medication',
    label: 'Registrar remédio',
    caption: 'Nome, dose e unidade, digitando ou pela foto da embalagem.',
    alt: 'Formulário Registrar Medicamentos com Metformina, dose 500 mg, dicas para fotografar a caixa do remédio e os botões Tirar foto, Escolher da galeria, Analisar com IA e Salvar.',
    webp: medicationWebp,
    png: medicationPng,
  },
  {
    id: 'pressure',
    label: 'Pressão arterial',
    caption: 'Última medição e gráfico da semana, do mês ou do ano.',
    alt: 'Tela Pressão arterial com a última medição, 123 por 79 mmHg e frequência cardíaca 68, marcada "Manhã, antes do remédio", botão Registrar pressão e gráfico da semana com linha contínua para o número de cima e tracejada para o número de baixo.',
    webp: pressureWebp,
    png: pressurePng,
  },
  {
    id: 'prescription',
    label: 'Receitas',
    caption: 'Suas receitas guardadas, com leitura por foto.',
    alt: 'Tela Receitas Médicas com uma receita fictícia de 12/09/2026 listando os remédios prescritos e o botão Adicionar Receita.',
    webp: prescriptionWebp,
    png: prescriptionPng,
  },
  {
    id: 'report',
    label: 'Histórico',
    caption: 'Todos os registros por período e por tipo.',
    alt: 'Aba Histórico, tela Relatórios: filtros Todos, Glicose, Pressão, Refeição e Remédios, período de 01/10 a 12/10, e a lista de hoje com almoço, Metformina 500 mg, glicemia 108 mg/dL "Na faixa geral" e pressão 123 por 79.',
    webp: reportWebp,
    png: reportPng,
  },
  {
    id: 'tracking',
    label: 'Acompanhamento',
    caption: 'Resumo do dia, da semana, do mês e do ano, só com o que você registrou.',
    alt: 'Tela Acompanhamento da semana: aviso de que o resumo não substitui a avaliação de um profissional, medições, mínimo e máximo, "Dados insuficientes" para a média e o gráfico com a faixa alvo de 70 a 180, com legenda por forma: triângulo para baixo para baixa, círculo para na faixa e triângulo para cima para alta.',
    webp: trackingWebp,
    png: trackingPng,
  },
  {
    id: 'journey',
    label: 'Minha jornada',
    caption: 'Dias acompanhados no ano, com a sua meta e um calendário.',
    alt: 'Tela Minha jornada 2026: 10 de 200 dias, 10 dias seguidos, barra de progresso e calendário de outubro com os dias acompanhados em verde e a legenda Acompanhado e Sem registro.',
    webp: journeyWebp,
    png: journeyPng,
  },
  {
    id: 'chat',
    label: 'Assistente',
    caption: 'Ações prontas na hora e espaço para perguntas sobre diabetes.',
    alt: 'Tela Assistente DiabetesIA: mensagem explicando que lembrete, consulta, registro e dúvidas sobre o app são na hora, que perguntas sobre diabetes podem levar mais tempo e que o assistente ainda não consegue ver os registros, seguida dos botões Criar lembrete de remédio, Cadastrar consulta, Registrar glicemia, refeição ou remédio e Dúvidas sobre o app.',
    webp: chatWebp,
    png: chatPng,
  },
  {
    id: 'assistant',
    label: 'Lembrete pelo assistente',
    caption: 'Um passo de cada vez, e nada é salvo antes de você confirmar.',
    alt: 'Conversa no assistente criando um lembrete: a pessoa escolhe 20:00 e Todos os dias, o assistente diz "Confira se está tudo certo. Nada foi salvo ainda." e mostra o cartão Lembrete de remédio com Losartana 50 mg, 1 comprimido, 20:00, todos os dias, e os botões Salvar lembrete, Começar de novo e Cancelar.',
    webp: assistantWebp,
    png: assistantPng,
  },
  {
    id: 'sharing',
    label: 'Quem me acompanha',
    caption: 'Convide por código, veja quem acompanha e remova quando quiser.',
    alt: 'Tela Quem me acompanha: aviso "Só quem você convidar — essas pessoas veem seus registros, mas não conseguem mudar nada", a Mãe e uma médica com o botão Remover, um convite enviado ao irmão que expira em 31 horas com código ainda não usado, e o botão Convidar alguém, 3 de 5 pessoas.',
    webp: sharingWebp,
    png: sharingPng,
  },
  {
    id: 'acompanhamento',
    label: 'Acompanhamento na tela Início',
    caption: 'Na tela Início, os números de quem você acompanha e de quem acompanha você. Só aparece um nome quando alguém precisa de atenção.',
    alt: 'Cartão Acompanhamento na tela Início: ilustração de uma pessoa segurando um coração, os contadores "3 Eu acompanho" e "2 Me acompanham", uma linha destacada em vermelho com a Vó Lúcia, 64, glicemia baixa há 2 horas, e o botão Ver quem eu acompanho.',
    webp: acompanhamentoWebp,
    png: acompanhamentoPng,
  },
  {
    id: 'following',
    label: 'Acompanhando o Pai',
    caption: 'Quem acompanha vê os registros em modo somente leitura.',
    alt: 'Tela com a faixa "Você está vendo os dados de Pai, somente leitura", filtros Hoje, 7 dias e 30 dias, a última glicemia de hoje, 142 mg/dL, "Na faixa geral", média, medições na faixa, remédios registrados e a lista de registros do dia.',
    webp: followingWebp,
    png: followingPng,
  },
  {
    id: 'profile',
    label: 'Metas e aparência',
    caption: 'Metas opcionais e tamanho do texto: Normal, Grande ou Extra grande.',
    alt: 'Tela Perfil com Minhas metas opcionais, 1800 kcal por dia e 60 g de carboidratos por refeição, e Aparência com a escolha entre Novo visual e Visual atual e o tamanho do texto Normal, Grande ou Extra grande.',
    webp: profileWebp,
    png: profilePng,
  },
  {
    id: 'checkin',
    label: 'Check-in mensal',
    caption: 'Peso, tabagismo e atividade física, comparados com o mês anterior.',
    alt: 'Tela Check-in de outubro 2026 com peso, tabagismo, atividade física 3 dias por semana, comparação com o mês anterior e a nota "Estas informações não substituem avaliação médica".',
    webp: checkinWebp,
    png: checkinPng,
  },
  {
    id: 'login',
    label: 'Entrar',
    caption: 'Entrada com a sua conta Google.',
    alt: 'Tela de entrada do DiabetesIA com o ícone de escudo e o botão Entrar com Google.',
    webp: loginWebp,
    png: loginPng,
  },
];

export const screenById = Object.fromEntries(screens.map((s) => [s.id, s])) as Record<ScreenId, Screen>;

export interface ScreenGroup {
  id: string;
  label: string;
  screens: ScreenId[];
}

export const screenGroups: ScreenGroup[] = [
  { id: 'inicio', label: 'Início', screens: ['home', 'nutrition', 'more'] },
  { id: 'registrar', label: 'Registrar', screens: ['glucose', 'food', 'medication', 'pressure', 'prescription'] },
  { id: 'acompanhar', label: 'Acompanhar', screens: ['report', 'tracking', 'journey'] },
  { id: 'assistente', label: 'Assistente', screens: ['chat', 'assistant'] },
  { id: 'familia', label: 'Família', screens: ['acompanhamento', 'sharing', 'following'] },
  { id: 'perfil', label: 'Perfil', screens: ['profile', 'checkin', 'login'] },
];
