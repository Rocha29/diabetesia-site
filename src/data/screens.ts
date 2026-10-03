export interface Screen {
  id: string;
  label: string;
  alt: string;
  webp: string;
  png: string;
}

// Screenshots reais da V2 (390x844). Os arquivos ainda estão sendo gerados;
// os placeholders em src/assets/screens/*.{webp,png} serão substituídos pelo orquestrador.
import loginWebp from '../assets/screens/login.webp';
import loginPng from '../assets/screens/login.png';
import homeWebp from '../assets/screens/home.webp';
import homePng from '../assets/screens/home.png';
import glucoseWebp from '../assets/screens/glucose.webp';
import glucosePng from '../assets/screens/glucose.png';
import foodWebp from '../assets/screens/food.webp';
import foodPng from '../assets/screens/food.png';
import prescriptionWebp from '../assets/screens/prescription.webp';
import prescriptionPng from '../assets/screens/prescription.png';
import chatWebp from '../assets/screens/chat.webp';
import chatPng from '../assets/screens/chat.png';
import reportWebp from '../assets/screens/report.webp';
import reportPng from '../assets/screens/report.png';
import trackingWebp from '../assets/screens/tracking.webp';
import trackingPng from '../assets/screens/tracking.png';
import profileWebp from '../assets/screens/profile.webp';
import profilePng from '../assets/screens/profile.png';

export const screens: Screen[] = [
  { id: 'home', label: 'Home', alt: 'Tela Home do DiabetesIA com visão geral dos registros recentes', webp: homeWebp, png: homePng },
  { id: 'glucose', label: 'Glicemia', alt: 'Tela de registro de glicemia com leitura por foto do glicosímetro', webp: glucoseWebp, png: glucosePng },
  { id: 'food', label: 'Refeição', alt: 'Tela de registro de refeição por foto', webp: foodWebp, png: foodPng },
  { id: 'prescription', label: 'Receita', alt: 'Tela de leitura de receita médica e comparação com medicamentos registrados', webp: prescriptionWebp, png: prescriptionPng },
  { id: 'chat', label: 'Chat', alt: 'Tela do assistente de IA para conversar sobre os registros', webp: chatWebp, png: chatPng },
  { id: 'report', label: 'Relatórios', alt: 'Tela de relatórios com filtro por período e exportação em PDF', webp: reportWebp, png: reportPng },
  { id: 'tracking', label: 'Acompanhamento', alt: 'Tela de acompanhamento semanal, em desenvolvimento', webp: trackingWebp, png: trackingPng },
  { id: 'profile', label: 'Perfil', alt: 'Tela de perfil do usuário', webp: profileWebp, png: profilePng },
  { id: 'login', label: 'Login', alt: 'Tela de login com conta Google', webp: loginWebp, png: loginPng },
];
