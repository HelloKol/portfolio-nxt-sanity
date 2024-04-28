import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './styles.module.scss';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (isTouchDevice || !cursor) {
      return;
    }

    const handleMouseMove = (e: { target: any; clientX: any; clientY: any }) => {
      const { target, clientX: x, clientY: y } = e;
      const isTargetLinkOrBtn = target?.closest('a') || target?.closest('button');
      gsap.to(cursor, {
        x: x + 3,
        y: y + 3,
        duration: 0.7,
        ease: 'power4',
        opacity: isTargetLinkOrBtn ? 0.6 : 1,
        transform: `scale(${isTargetLinkOrBtn ? 3.5 : 1})`
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        duration: 0.7,
        opacity: 0
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice]);

  return <div ref={cursorRef} className={styles.cursor} />;
}
