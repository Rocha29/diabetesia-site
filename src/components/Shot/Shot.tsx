import type { Screen } from '../../data/screens';

interface ShotProps {
  screen: Screen;
  eager?: boolean;
  className?: string;
  /** Use alt="" quando a imagem é decorativa (o mesmo conteúdo já está no texto ao lado). */
  decorative?: boolean;
}

/** Captura real do app: WebP com PNG de reserva, dimensões fixas para não deslocar o layout. */
export function Shot({ screen, eager = false, className, decorative = false }: ShotProps) {
  return (
    <picture className={className}>
      <source srcSet={screen.webp} type="image/webp" />
      <img
        src={screen.png}
        width={390}
        height={844}
        alt={decorative ? '' : screen.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </picture>
  );
}
