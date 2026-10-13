import type { CSSProperties } from 'react';
import styles from './PhoneFrame.module.css';
import type { Screen } from '../../data/screens';
import { Shot } from '../Shot/Shot';

interface PhoneFrameProps {
  screen: Screen;
  eager?: boolean;
  /** Largura do aparelho em px (o CSS limita em telas pequenas). */
  width?: number;
  decorative?: boolean;
  className?: string;
}

/** Moldura de celular desenhada em CSS em volta de uma captura real do app. */
export function PhoneFrame({ screen, eager = false, width = 280, decorative = false, className }: PhoneFrameProps) {
  return (
    <div className={`${styles.phone} ${className ?? ''}`} style={{ '--w': `${width}px` } as CSSProperties}>
      <div className={styles.screen}>
        <Shot screen={screen} eager={eager} decorative={decorative} />
      </div>
    </div>
  );
}
