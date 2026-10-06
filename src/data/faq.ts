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
  { id: 'ai', question: 'Como a inteligência artificial é usada no app?', answer: 'A IA ajuda a ler fotos do glicosímetro, das refeições, dos medicamentos e das receitas, facilitando o registro. Ela não diagnostica nem prescreve.' },
  { id: 'safety', question: 'Meus dados ficam seguros?', answer: 'Seus dados ficam numa área do Firebase acessível só pela sua conta, e as chaves de IA ficam apenas no nosso servidor. Veja mais detalhes na nossa Política de Privacidade.' },
  { id: 'web', question: 'Posso usar o DiabetesIA pelo computador?', answer: 'A versão web (V2) ainda está em desenvolvimento e não está publicada. Ela está recebendo o acompanhamento por período, lembretes, consultas e relatórios, que aparecem na seção "O que vem na nova versão".' },
  { id: 'chat', question: 'O chat de IA guarda o que eu converso?', answer: 'Não. O histórico do chat não é salvo.' },
  { id: 'delete', question: 'Posso apagar meus dados?', answer: 'Sim, você pode editar e apagar seus registros. Na versão web (V2), em desenvolvimento, também estão previstos ver e exportar seus dados e excluir a conta.' },
  { id: 'reminders', question: 'O DiabetesIA tem lembretes e agenda de consultas?', answer: 'Estão em desenvolvimento na versão web (V2), ainda não publicada: lembretes de medicamento, refeição e glicemia, e uma agenda de consultas com avisos.' },
  { id: 'devices', question: 'O DiabetesIA se conecta a relógios e sensores, como o Garmin?', answer: 'Ainda não. A conexão com dispositivos, como Garmin e Google Health Connect, é um plano futuro. Hoje não existe integração com nenhum dispositivo.' },
  { id: 'insights', question: 'O que são os insights?', answer: 'São padrões observados nos seus registros, mostrados com o nível de confiança e as limitações. Eles não indicam causa, não são diagnóstico e não substituem a orientação de um profissional de saúde. Estão em desenvolvimento na versão web.' },
];
