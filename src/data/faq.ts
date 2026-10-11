export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  { id: 'android', question: 'O DiabetesIA está disponível para Android?', answer: 'Sim, em versão de teste. A publicação na Play Store está prevista para em breve.' },
  { id: 'iphone', question: 'O DiabetesIA está disponível para iPhone?', answer: 'Ainda não disponível.' },
  { id: 'price', question: 'O DiabetesIA é gratuito?', answer: 'O modelo comercial do DiabetesIA está em definição.' },
  { id: 'doctor', question: 'O DiabetesIA substitui o médico?', answer: 'Não. O DiabetesIA é uma ferramenta de apoio e acompanhamento. Ele não substitui o acompanhamento de profissionais de saúde.' },
  { id: 'ai', question: 'Como a inteligência artificial é usada no app?', answer: 'A IA ajuda a ler fotos do glicosímetro, das refeições, dos medicamentos e das receitas, facilitando o registro. Você sempre confere o que ela leu antes de salvar. Ela não diagnostica nem prescreve.' },
  { id: 'safety', question: 'Meus dados ficam seguros?', answer: 'Seus dados ficam numa área do Firebase acessível só pela sua conta, e as chaves de IA ficam apenas no nosso servidor. Veja mais detalhes na nossa Política de Privacidade.' },
  { id: 'web', question: 'Posso usar o DiabetesIA pelo computador?', answer: 'A versão web (V2) ainda está em desenvolvimento e não está publicada. Ela está recebendo o acompanhamento por período, a "Minha jornada", lembretes, consultas e relatórios, que aparecem na seção "O que vem na nova versão".' },
  { id: 'chat', question: 'O chat de IA guarda o que eu converso?', answer: 'Não. O histórico do chat não é salvo.' },
  { id: 'delete', question: 'Posso apagar meus dados?', answer: 'Sim, você pode editar e apagar seus registros. Na versão web (V2), em desenvolvimento, também estão previstos ver e exportar seus dados e excluir a conta.' },
  { id: 'reminders', question: 'O DiabetesIA tem lembretes e agenda de consultas?', answer: 'Estão em desenvolvimento na versão web (V2), ainda não publicada: lembretes de medicamento, refeição e glicemia, e uma agenda de consultas com avisos.' },
  { id: 'journey', question: 'O que é a "Minha jornada"?', answer: 'Uma forma de ver quantos dias do ano você manteve seu acompanhamento, com uma meta pessoal que você escolhe. Um dia conta quando tem pelo menos um registro de glicemia, então medir mais vezes não muda a contagem. Não é recomendação médica nem competição. Está em desenvolvimento na versão web.' },
  { id: 'nutrition', question: 'O DiabetesIA calcula carboidratos e calorias?', answer: 'Na versão web (V2), em desenvolvimento, sim, como estimativa. A IA identifica os alimentos e as porções, você confere, e o app calcula uma faixa usando a tabela oficial do IBGE, baseada na TACO (NEPA/UNICAMP). A IA nunca inventa esses números. A estimativa não deve ser usada para calcular dose de insulina.' },
  { id: 'accessibility', question: 'O app é fácil de ler para quem tem baixa visão ou daltonismo?', answer: 'O novo visual da versão web (V2), em desenvolvimento, foi feito para isso: letras maiores, mais contraste, tamanho de texto ajustável e cores que continuam diferentes para quem tem daltonismo. A situação da glicemia sempre aparece com forma e palavra, além da cor.' },
  { id: 'pressure', question: 'Dá para registrar a pressão arterial?', answer: 'Sim, na versão web (V2), em desenvolvimento: digitando ou por foto do aparelho, com histórico e gráfico. O app mostra só os números que você registrou e não classifica a pressão.' },
  { id: 'devices', question: 'O DiabetesIA se conecta a relógios e sensores, como o Garmin?', answer: 'Ainda não. A conexão com dispositivos, como Garmin e Google Health Connect, é um plano futuro. Hoje não existe integração com nenhum dispositivo.' },
  { id: 'insights', question: 'O que são os insights?', answer: 'São padrões observados nos seus registros, mostrados com o nível de confiança e as limitações. Eles não indicam causa, não são diagnóstico e não substituem a orientação de um profissional de saúde. Estão em desenvolvimento na versão web.' },
];
