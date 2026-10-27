import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../useLanguage';
import { siteAssets } from '../data/siteData';

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* شاشة تحميل بتظهر مرة واحدة في كل جلسة، وبعدها بتبدأ أنيميشن الهيرو */
export function Preloader() {
  const [phase, setPhase] = useState(() => {
    try { return sessionStorage.getItem('sz-intro') || reduce() ? 'done' : 'show'; } catch { return 'show'; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (phase === 'done') { root.classList.add('app-ready'); document.body.classList.remove('modal-open'); return undefined; }
    document.body.classList.add('modal-open');
    const timers = [
      setTimeout(() => setPhase('out'), 1500),
      setTimeout(() => root.classList.add('app-ready'), 1750),
      setTimeout(() => { try { sessionStorage.setItem('sz-intro', '1'); } catch { /* ignore */ } setPhase('done'); }, 2500),
    ];
    return () => { timers.forEach(clearTimeout); document.body.classList.remove('modal-open'); };
  }, [phase === 'done']); // eslint-disable-line react-hooks/exhaustive-deps
  if (phase === 'done') return null;
  return (
    <div className={`preloader ${phase === 'out' ? 'out' : ''}`} aria-hidden="true">
      <div className="preloader-inner">
        <img src={siteAssets.logo} alt="" className="preloader-logo" />
        <div className="preloader-bar"><i /></div>
      </div>
    </div>
  );
}

/* شريط تقدم السكرول + يحدّث --p لاستخدامه في زر الرجوع للأعلى */
export function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

/* توهج أحمر ناعم بيتبع الماوس (ديسكتوب فقط) */
export function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    if (!fine() || reduce()) return undefined;
    const el = ref.current;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e) => { x = e.clientX; y = e.clientY; el.style.opacity = 1; };
    const tick = () => {
      cx += (x - cx) * 0.12; cy += (y - cy) * 0.12;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    tick();
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/* مستمع واحد للصفحة: [data-spot] إضاءة تتبع الماوس، [data-tilt] ميلان 3D */
export function PointerFx() {
  useEffect(() => {
    if (!fine()) return undefined;
    let tilted = null;
    const reset = () => {
      if (!tilted) return;
      tilted.classList.remove('tilting');
      tilted.style.setProperty('--rx', '0deg');
      tilted.style.setProperty('--ry', '0deg');
      tilted = null;
    };
    const move = (e) => {
      const spot = e.target.closest?.('[data-spot]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const tilt = e.target.closest?.('[data-tilt]');
      if (tilt !== tilted) reset();
      if (tilt && !reduce()) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.classList.add('tilting');
        tilt.style.setProperty('--ry', `${px * 12}deg`);
        tilt.style.setProperty('--rx', `${-py * 12}deg`);
        tilted = tilt;
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); };
  }, []);
  return null;
}

/* شريط متحرك بين الهيرو والأقسام */
export function Marquee() {
  const { language } = useLanguage();
  const items = language === 'ar'
    ? ['كفالة معتمدة', 'توفير في الطاقة', 'توصيل سريع', 'أجهزة أقوى وأوفر', 'خدمة ما بعد البيع', 'جودة عالية']
    : ['Official Warranty', 'Energy Saving', 'Fast Delivery', 'Stronger & Bigger Savings', 'After-Sales Service', 'Premium Quality'];
  const set = (k) => (
    <div className="marquee-set" key={k}>
      {[0, 1].flatMap((n) => items.map((text) => <span key={`${n}-${text}`} className="marquee-item"><i />{text}</span>))}
    </div>
  );
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{set('a')}{set('b')}</div></div>;
}

/* جزيئات حمراء طايرة في خلفية الهيرو */
export function Particles({ count = 16 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = (n) => ((i * 9301 + n * 49297) % 233280) / 233280;
        return <span key={i} className="particle" style={{ '--x': `${r(1) * 100}%`, '--s': `${3 + r(2) * 5}px`, '--t': `${9 + r(3) * 10}s`, '--dx': `${(r(4) - 0.5) * 120}px`, animationDelay: `${-r(5) * 14}s` }} />;
      })}
    </div>
  );
}

/* زر الرجوع للأعلى مع حلقة تقدم */
export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <button type="button" aria-label="Scroll to top" className={`scroll-top-btn ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg viewBox="0 0 48 48" className="ring" aria-hidden="true"><circle className="t" cx="24" cy="24" r="22" /><circle className="v" cx="24" cy="24" r="22" /></svg>
      <ArrowUp size={20} />
    </button>
  );
}
