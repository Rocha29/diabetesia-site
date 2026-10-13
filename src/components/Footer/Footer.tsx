import styles from './Footer.module.css';
import { navItems, DISCLAIMER, TESTER_GUIDE_HREF } from '../../data/nav';
import { LogoMark } from '../Icons';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>
            <LogoMark />
            DiabetesIA
          </p>
          <p className={styles.tagline}>Organização e apoio para o seu dia a dia com o diabetes.</p>
          <p className={styles.notice}>{DISCLAIMER}</p>
        </div>

        <nav aria-labelledby="rodape-site">
          <h2 id="rodape-site" className={styles.heading}>Site</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-legal">
          <h2 id="rodape-legal" className={styles.heading}>Documentos</h2>
          <ul>
            <li><a href={TESTER_GUIDE_HREF}>Guia do testador</a></li>
            <li><a href="privacidade/">Política de Privacidade</a></li>
            <li><a href="termos/">Termos de Uso</a></li>
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>© 2026 DiabetesIA. Todos os direitos reservados.</p>
        <p>As telas mostradas usam dados de demonstração.</p>
      </div>
    </footer>
  );
}
