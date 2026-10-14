export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

// Só fatos verificados do app. Sem orientação médica, sem preço, sem detalhes de infraestrutura.
export const faqItems: FaqItem[] = [
  {
    id: 'android',
    question: 'Onde consigo usar o DiabetesIA?',
    answer:
      'Hoje, no Android, em teste fechado (beta) e por convite. Ainda não está na Play Store, ainda não existe versão para iPhone e não há versão web pública. Se você recebeu um convite, o guia do testador mostra o passo a passo.',
    link: { href: 'testador/', label: 'Abrir o guia do testador' },
  },
  {
    id: 'doctor',
    question: 'O DiabetesIA substitui o médico?',
    answer:
      'Não. O DiabetesIA ajuda a registrar e organizar o seu dia a dia. Ele não faz diagnóstico, não indica dose de remédio ou de insulina e não substitui o acompanhamento de profissionais de saúde.',
  },
  {
    id: 'assistant',
    question: 'O assistente vê os meus registros?',
    answer:
      'Não. Hoje o assistente não tem acesso aos seus registros. Ele resolve na hora ações do app — criar lembrete de remédio, cadastrar consulta, registrar glicemia, refeição ou remédio e tirar dúvidas sobre o app — e responde perguntas gerais sobre diabetes com IA, o que pode levar um pouco mais de tempo. Ele não dá diagnóstico nem indica dose.',
  },
  {
    id: 'ai',
    question: 'Como a inteligência artificial é usada?',
    answer:
      'A IA ajuda a ler fotos — do glicosímetro, da embalagem do remédio, da receita e da refeição — e a responder perguntas abertas no assistente. Você sempre confere o que foi lido antes de salvar. A IA não calcula carboidratos nem calorias: esses números vêm da tabela de alimentos.',
  },
  {
    id: 'limit',
    question: 'Existe limite de uso da IA?',
    answer:
      'Sim. Há um limite diário de análises com IA, e a tela inicial mostra quantas ainda restam no dia. Registrar digitando e as ações prontas do assistente não dependem da IA.',
  },
  {
    id: 'sharing',
    question: 'Como funciona o "Quem me acompanha"?',
    answer:
      'Você cria um convite com um código de uso único e envia para quem quiser — até 5 pessoas, contando os convites pendentes. Quem aceita vê seus registros em modo somente leitura e não consegue mudar nada. O convite expira se não for usado, e você remove qualquer pessoa quando quiser. Se você registrar uma glicemia baixa, quem te acompanha recebe um aviso no celular (no app Android), sem o valor no texto, e pode desligar esse aviso.',
  },
  {
    id: 'nutrition',
    question: 'Como o app estima carboidratos e calorias?',
    answer:
      'A IA lista os alimentos e as porções em medidas caseiras; você confere e ajusta. Depois o app calcula uma faixa de carboidratos e calorias com a tabela do IBGE, baseada na TACO (NEPA/UNICAMP). É uma estimativa e não deve ser usada para calcular insulina.',
  },
  {
    id: 'pressure',
    question: 'Dá para registrar a pressão arterial?',
    answer:
      'Sim, digitando ou pela foto do aparelho, com histórico e gráfico da semana, do mês e do ano. O app mostra os números que você registrou e não classifica a pressão.',
  },
  {
    id: 'reminders',
    question: 'O app tem lembretes e agenda de consultas?',
    answer:
      'Sim. Você cria lembretes de remédio e cadastra suas consultas pela aba Mais ou pelo assistente, que pede uma informação de cada vez e só salva depois que você confirma.',
  },
  {
    id: 'journey',
    question: 'O que é a "Minha jornada"?',
    answer:
      'Uma forma de ver quantos dias do ano você manteve seu acompanhamento, com uma meta pessoal de dias, a sequência atual e um calendário. Um dia conta quando tem pelo menos um registro de glicemia ou de pressão; medir mais vezes no mesmo dia não muda a contagem. Não é recomendação médica nem competição.',
  },
  {
    id: 'accessibility',
    question: 'É fácil de ler para quem tem baixa visão ou daltonismo?',
    answer:
      'Esse é um dos objetivos do novo visual: fonte Atkinson Hyperlegible Next, feita para leitura fácil, mais contraste, botões grandes e três tamanhos de texto (Normal, Grande e Extra grande). A situação da glicemia sempre aparece com forma e palavra, além da cor.',
  },
  {
    id: 'delete',
    question: 'Posso apagar meus dados?',
    answer:
      'Sim. Você pode editar e apagar seus registros e, nas opções de Privacidade do app, ver e exportar seus dados e excluir a conta.',
  },
  {
    id: 'safety',
    question: 'Quem pode ver os meus dados?',
    answer:
      'Seus registros ficam numa área ligada à sua conta, acessível só por você — e, se você quiser, pelas pessoas que convidar, apenas para leitura. Na leitura por foto, a IA recebe a imagem ou o texto da análise, sem o seu nome nem o seu e-mail. Os detalhes estão na Política de Privacidade.',
    link: { href: 'privacidade/', label: 'Ler a Política de Privacidade' },
  },
  {
    id: 'price',
    question: 'Quanto custa?',
    answer:
      'O modelo comercial ainda está em definição. Um plano Premium está previsto para em breve.',
  },
  {
    id: 'devices',
    question: 'O app se conecta a relógios e sensores, como o Garmin?',
    answer:
      'Ainda não. A conexão com dispositivos, como Garmin e Health Connect, é um plano futuro. Hoje não há integração com nenhum dispositivo.',
  },
];
