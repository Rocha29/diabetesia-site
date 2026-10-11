export interface Screen {
  id: string;
  label: string;
  alt: string;
  webp: string;
  png: string;
}

// Telas reais da V2 (390x844), no novo visual, com dados de demonstração
// fictícios. Geradas por tools/screenshots (npm run shots).
import loginWebp from '../assets/screens/login.webp';
import loginPng from '../assets/screens/login.png';
import homeWebp from '../assets/screens/home.webp';
import homePng from '../assets/screens/home.png';
import nutritionWebp from '../assets/screens/nutrition.webp';
import nutritionPng from '../assets/screens/nutrition.png';
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
import reportWebp from '../assets/screens/report.webp';
import reportPng from '../assets/screens/report.png';
import trackingWebp from '../assets/screens/tracking.webp';
import trackingPng from '../assets/screens/tracking.png';
import journeyWebp from '../assets/screens/journey.webp';
import journeyPng from '../assets/screens/journey.png';
import profileWebp from '../assets/screens/profile.webp';
import profilePng from '../assets/screens/profile.png';

export const screens: Screen[] = [
  { id: 'home', label: 'Início', alt: 'Tela inicial do DiabetesIA com Minha jornada, alimentação do dia e atalhos de registro', webp: homeWebp, png: homePng },
  { id: 'nutrition', label: 'Alimentação de hoje', alt: 'Cartão com as calorias do dia em relação à meta e os carboidratos de cada refeição', webp: nutritionWebp, png: nutritionPng },
  { id: 'glucose', label: 'Glicemia', alt: 'Tela de registro de glicemia com dicas para fotografar o glicosímetro', webp: glucoseWebp, png: glucosePng },
  { id: 'food', label: 'Refeição', alt: 'Tela "Conferir porções" com a estimativa de carboidratos e calorias a partir de uma tabela de alimentos', webp: foodWebp, png: foodPng },
  { id: 'pressure', label: 'Pressão', alt: 'Tela de pressão arterial com a última medição e o gráfico da semana', webp: pressureWebp, png: pressurePng },
  { id: 'medication', label: 'Remédios', alt: 'Tela de registro de medicamento com leitura por foto da embalagem', webp: medicationWebp, png: medicationPng },
  { id: 'prescription', label: 'Receita', alt: 'Tela de leitura de receita médica e comparação com medicamentos registrados', webp: prescriptionWebp, png: prescriptionPng },
  { id: 'chat', label: 'Chat', alt: 'Tela do assistente de IA com perguntas prontas para começar a conversa', webp: chatWebp, png: chatPng },
  { id: 'report', label: 'Relatórios', alt: 'Tela de relatórios com filtro por tipo e período e exportação em PDF', webp: reportWebp, png: reportPng },
  { id: 'tracking', label: 'Acompanhamento', alt: 'Tela de acompanhamento da semana com a faixa alvo da glicemia e a situação de cada medição por forma e cor', webp: trackingWebp, png: trackingPng },
  { id: 'journey', label: 'Minha jornada', alt: 'Tela Minha jornada com os dias acompanhados no ano, a sequência e o calendário', webp: journeyWebp, png: journeyPng },
  { id: 'profile', label: 'Perfil', alt: 'Tela de perfil com metas de calorias e carboidratos e opções de aparência', webp: profileWebp, png: profilePng },
  { id: 'login', label: 'Login', alt: 'Tela de login com conta Google', webp: loginWebp, png: loginPng },
];
