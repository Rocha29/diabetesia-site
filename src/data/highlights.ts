import type { ScreenId } from './screens';

export type Tone = 'brand' | 'glucose' | 'food' | 'med' | 'pressure';

export interface Highlight {
  id: string;
  title: string;
  text: string;
  tone: Tone;
  /** Captura mostrada dentro do cartão (recorte do topo). */
  screen?: ScreenId;
  /** Deslocamento do recorte, em % da largura da imagem (margin-top negativa). */
  crop?: number;
  size?: 'wide' | 'tall' | 'normal';
  bullets?: string[];
}

// Novidades da nova versão (V2), todas presentes no app em teste. Sem alegações médicas.
export const highlights: Highlight[] = [
  {
    id: 'home',
    title: 'Nova tela inicial',
    text: 'O que importa agora aparece num carrossel — última glicemia, alimentação do dia e dicas — e o Registro rápido abre glicose, refeição, remédio ou pressão com um toque.',
    bullets: ['Barra inferior com 4 abas com nome: Início, Histórico, Assistente e Mais'],
    tone: 'brand',
    screen: 'home',
    crop: 50,
    size: 'wide',
  },
  {
    id: 'assistant',
    title: 'Assistente com ações na hora',
    text: 'Crie um lembrete de remédio, cadastre uma consulta ou tire dúvidas sobre o app num passo a passo, sem depender de IA. Nada é salvo antes de você confirmar.',
    tone: 'med',
    screen: 'assistant',
    crop: 70,
    size: 'tall',
  },
  {
    id: 'sharing',
    title: 'Quem me acompanha',
    text: 'Família e cuidadores veem seus registros só para leitura, por convite com código de uso único. Você remove quando quiser.',
    tone: 'brand',
    screen: 'sharing',
    crop: 28,
  },
  {
    id: 'nutrition',
    title: 'Carboidratos e calorias',
    text: 'Uma faixa estimada pela tabela TACO/IBGE, depois que você confere as porções. Os números vêm da tabela, nunca da IA.',
    tone: 'food',
    screen: 'food',
    crop: 62,
  },
  {
    id: 'pressure',
    title: 'Pressão arterial',
    text: 'Digite ou fotografe o aparelho e acompanhe o gráfico da semana, do mês ou do ano.',
    tone: 'pressure',
    screen: 'pressure',
    crop: 0,
  },
  {
    id: 'journey',
    title: 'Minha jornada',
    text: 'Quantos dias do ano você manteve o acompanhamento, com uma meta pessoal e um calendário. Conta dias, não medições.',
    tone: 'food',
    screen: 'journey',
    crop: 10,
  },
  {
    id: 'report',
    title: 'Relatório para a consulta',
    text: 'Escolha o período, filtre por tipo e salve em PDF para levar ao seu médico.',
    tone: 'brand',
    screen: 'report',
    crop: 0,
  },
  {
    id: 'photo',
    title: 'Leitura por foto, com conferência',
    text: 'Glicosímetro, embalagem do remédio ou receita: a IA lê, você confere e só então salva.',
    tone: 'glucose',
    screen: 'glucose',
    crop: 110,
    size: 'wide',
  },
  {
    id: 'a11y',
    title: 'Feito para ler bem',
    text: 'Fonte Atkinson Hyperlegible Next, texto em três tamanhos e situação da glicemia com forma, palavra e cor.',
    tone: 'brand',
  },
];
