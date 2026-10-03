import styles from './PhoneFrame.module.css';
import type { Screen } from '../../data/screens';

interface PhoneFrameProps {
  screen: Screen;
  eager?: boolean;
  size?: 'sm' | 'md' | 'lg';
  caption?: boolean;
}

export function PhoneFrame({ screen, eager = false, size = 'md', caption = true }: PhoneFrameProps) {
  return (
    <figure className={styles.wrapper}>
      <div className={`${styles.phone} ${styles[size]}`}>
        <div className={styles.notch} aria-hidden="true" />
        <div className={styles.screen}>
          <picture>
            {screen.webp && <source srcSet={screen.webp} type="image/webp" />}
            <img
              src={screen.png || screen.webp}
              width={390}
              height={844}
              alt={screen.alt}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={eager ? 'high' : undefined}
            />
          </picture>
        </div>
      </div>
      {caption && <figcaption className={styles.caption}>Telas reais do app com dados de demonstração</figcaption>}
    </figure>
  );
}
