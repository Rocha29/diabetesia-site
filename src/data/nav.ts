export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'novidades', label: 'Novidades' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'assistente', label: 'Assistente' },
  { id: 'familia', label: 'Família' },
  { id: 'telas', label: 'Telas' },
  { id: 'privacidade', label: 'Privacidade' },
  { id: 'faq', label: 'Dúvidas' },
];

/** Caminho relativo (funciona com qualquer base do Vite, inclusive /diabetesia-site/). */
export const TESTER_GUIDE_HREF = 'testador/';

export const DISCLAIMER =
  'O DiabetesIA é uma ferramenta de apoio e acompanhamento. Ele não substitui o acompanhamento de profissionais de saúde, não faz diagnóstico e não indica dose de remédio.';
