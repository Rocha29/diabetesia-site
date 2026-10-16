// Página pública do relatório para o médico (issue V2 #15).
// Sem analytics, sem anúncios, sem login. O token fica no fragmento (#).
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/tokens.css';
import './relatorio.css';
import { ReportViewer } from './ReportViewer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReportViewer />
  </React.StrictMode>,
);
