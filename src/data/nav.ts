export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'recursos', label: 'Recursos' },
  { id: 'ia', label: 'IA' },
  { id: 'aplicativo', label: 'Aplicativo' },
  { id: 'faq', label: 'FAQ' },
];

export const DISCLAIMER =
  'O DiabetesIA é uma ferramenta de apoio e acompanhamento. Ele não substitui o acompanhamento de profissionais de saúde.';
