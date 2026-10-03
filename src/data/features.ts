export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  { id: 'login', title: 'Login com Google', description: 'Entre com sua conta Google de forma simples.' },
  { id: 'glucose', title: 'Registro de glicemia', description: 'Registre valores manualmente ou por foto do glicosímetro, com o contexto da medição (jejum, pós-refeição, antes de dormir ou aleatório).' },
  { id: 'ranges', title: 'Classificação por faixas', description: 'Seus registros de glicemia são classificados automaticamente em faixas, ajudando a visualizar o que está fora do esperado.' },
  { id: 'food', title: 'Registro de refeições', description: 'Descreva ou fotografe suas refeições para manter um histórico do que foi comido.' },
  { id: 'medication', title: 'Registro de medicamentos', description: 'Registre nome, dose e unidade de cada medicamento, com leitura por foto.' },
  { id: 'prescription', title: 'Leitura de receitas médicas', description: 'Fotografe a receita e deixe a IA identificar os medicamentos prescritos.' },
  { id: 'chat', title: 'Assistente de IA', description: 'Converse com um assistente sobre seus próprios registros para entender melhor seu histórico.' },
  { id: 'history', title: 'Histórico de registros', description: 'Veja seus registros recentes na tela inicial, com opção de editar ou apagar.' },
  { id: 'reports', title: 'Relatórios por período', description: 'Filtre seus registros por período e por tipo, e salve como PDF.' },
];

export interface AIItem {
  id: string;
  title: string;
  description: string;
  accent: 'glucose' | 'food' | 'medication' | 'prescription' | 'cross';
}

export const aiItems: AIItem[] = [
  { id: 'glucose', title: 'Glicemia', description: 'A IA lê o valor mostrado no visor do glicosímetro a partir de uma foto, ajudando a preencher o registro mais rápido.', accent: 'glucose' },
  { id: 'food', title: 'Refeição', description: 'A IA identifica os alimentos na foto da refeição. Os carboidratos podem ser informados por você.', accent: 'food' },
  { id: 'medication', title: 'Medicamento', description: 'A IA lê o nome e os dados do remédio a partir de uma foto da embalagem ou da cartela.', accent: 'medication' },
  { id: 'prescription', title: 'Receita', description: 'A IA lê os medicamentos prescritos numa foto da receita médica.', accent: 'prescription' },
  { id: 'cross', title: 'Cruzamento', description: 'Os medicamentos da receita são comparados com os medicamentos que você registrou, de forma automática e determinística — sem uso de IA nessa etapa —, ajudando a identificar diferenças.', accent: 'cross' },
];
