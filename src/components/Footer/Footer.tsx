import styles from './Footer.module.css';
import { navItems } from '../../data/nav';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.logo}>DiabetesIA</p>
          <p className={styles.tagline}>Organização e apoio para o seu dia a dia com o diabetes.</p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h3 className={styles.heading}>Navegação</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h3 className={styles.heading}>Legal</h3>
          <ul>
            <li><a href="privacidade/">Política de Privacidade</a></li>
            <li><a href="termos/">Termos de Uso</a></li>
          </ul>
        </nav>

        <div>
          <h3 className={styles.heading}>Aviso</h3>
          <p className={styles.notice}>
            O DiabetesIA é uma ferramenta de apoio e acompanhamento. Ele não substitui o
            acompanhamento de profissionais de saúde.
          </p>
        </div>
      </div>
      <p className={styles.rights}>© 2026 DiabetesIA. Todos os direitos reservados.</p>
    </footer>
  );
}
