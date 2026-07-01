'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

type Variant = 'up' | 'left' | 'right' | 'fade' | 'scale';

export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className = '',
  as: Tag = 'div',
  once = true,
  style,
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const baseFrom: Record<Variant, string> = {
    up: 'opacity-0 translate-y-16',
    left: 'opacity-0 -translate-x-16',
    right: 'opacity-0 translate-x-16',
    fade: 'opacity-0',
    scale: 'opacity-0 scale-90',
  };
  const to = 'opacity-100 translate-x-0 translate-y-0 scale-100';
  const T = Tag as any;
  return (
    <T
      ref={ref as any}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform ${visible ? to : baseFrom[variant]} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </T>
  );
}
