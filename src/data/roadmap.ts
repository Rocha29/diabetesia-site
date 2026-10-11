export type RoadmapStatus = 'wip' | 'planned';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
}

// Novidades da V2 (web). A V2 ainda NÃO está publicada: tudo aqui é "Em desenvolvimento"
// ou "Planejado". Não mover nada para a lista de recursos disponíveis (features.ts) sem
// confirmar a publicação. Sem alegações médicas.
export const roadmapItems: RoadmapItem[] = [
  {
    id: 'pressure',
    title: 'Pressão arterial',
    description:
      'Registre a pressão digitando ou por foto do aparelho (você confere os números antes de salvar), com histórico, gráfico da semana, do mês e do ano, e o momento em relação ao remédio. O app mostra só os números: não classifica a pressão.',
    status: 'wip',
  },
  {
    id: 'nutrition',
    title: 'Carboidratos e calorias da refeição',
    description:
      'A IA lista os alimentos e as porções em medidas caseiras (colheres, conchas, unidades). Você confere e o app calcula uma faixa de carboidratos e calorias com a tabela oficial do IBGE, baseada na TACO (NEPA/UNICAMP). É uma estimativa: não deve ser usada para calcular insulina.',
    status: 'wip',
  },
  {
    id: 'goals',
    title: 'Metas de calorias e de carboidratos',
    description:
      'Metas opcionais que você define junto com seu médico ou nutricionista: calorias por dia e carboidratos por refeição. A tela inicial mostra o total do dia, sem alarmes.',
    status: 'wip',
  },
  {
    id: 'accessibility',
    title: 'Novo visual, mais fácil de ler',
    description:
      'Letras maiores, mais contraste, botões maiores e cores fáceis de distinguir para quem tem daltonismo. A situação da glicemia aparece com forma, palavra e cor, nunca só pela cor. Dá para escolher o tamanho do texto.',
    status: 'wip',
  },
  {
    id: 'reminders',
    title: 'Lembretes',
    description:
      'Lembretes de medicamento, de refeição e de medir a glicemia, com horário no seu fuso e marcação de "realizado".',
    status: 'wip',
  },
  {
    id: 'appointments',
    title: 'Minhas consultas',
    description:
      'Uma agenda das suas consultas, com avisos antes do horário, reagendamento e espaço para anotar perguntas e o que levar.',
    status: 'wip',
  },
  {
    id: 'journey',
    title: 'Minha jornada',
    description:
      'Quantos dias do ano você manteve seu acompanhamento, com uma meta pessoal de dias, a sequência atual, um calendário e marcos. Conta dias, não medições: a frequência continua sendo a orientada pelo seu profissional de saúde.',
    status: 'wip',
  },
  {
    id: 'insights',
    title: 'Insights sobre seus registros',
    description:
      'Padrões observados nos seus registros, sempre com o nível de confiança e as limitações. Não indicam causa e não são diagnóstico.',
    status: 'wip',
  },
  {
    id: 'report',
    title: 'Relatório de acompanhamento',
    description:
      'Um relatório por semana, mês, 3 meses ou período personalizado, para levar à consulta. Exporta em PDF (pela impressão), CSV e JSON.',
    status: 'wip',
  },
  {
    id: 'privacy',
    title: 'Controles de privacidade',
    description:
      'Aceite da política de privacidade, consentimento separado para a IA na nuvem, ver e exportar seus dados e excluir a conta.',
    status: 'wip',
  },
  {
    id: 'profile',
    title: 'Perfil e check-in mensal',
    description:
      'Seus dados de perfil e um check-in mensal (peso, tabagismo e atividade física), com comparação objetiva com o mês anterior.',
    status: 'wip',
  },
  {
    id: 'devices',
    title: 'Dispositivos (Garmin e Health Connect)',
    description:
      'Trazer dados de atividade e sono de dispositivos para o acompanhamento. Ainda não existe conexão com nenhum dispositivo: a base técnica está sendo preparada.',
    status: 'planned',
  },
];
