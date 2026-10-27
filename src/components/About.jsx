
import { useEffect, useState } from 'react';
import { Award, HeartHandshake, ShieldCheck, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../useLanguage';

const icons = [ShieldCheck, Zap, Award, HeartHandshake];

function AnimatedStat({ value, label, start }) {
  const original = String(value);

  const match = original.match(/^([+]?)([\d٠-٩,٬]+(?:\.\d+)?)(.*)$/);

  const toEnglishDigits = (text) =>
    text
      .replace(/[٠-٩]/g, (digit) =>
        String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
      )
      .replace(/٬/g, ',');

  const numberText = match
    ? toEnglishDigits(match[2]).replace(/,/g, '')
    : '';

  const target = Number(numberText);
  const prefix = match ? match[1] : '';
  const suffix = match ? match[3] : '';

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || !match || !Number.isFinite(target)) return;

    let frameId;
    let startTime = null;
    let cancelled = false;

    const duration = 1800;

    setCount(0);

    const animate = (timestamp) => {
      if (cancelled) return;

      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(
        progress === 1 ? target : target * easedProgress
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [start, target, original]);

  const formattedCount = Math.floor(count).toLocaleString('en-US');

  return (
    <div className="text-center">
      <div
        className="text-3xl font-black text-sizzler-red sm:text-4xl"
        dir="ltr"
      >
        {match
          ? `${prefix}${formattedCount}${suffix}`
          : original}
      </div>

      <div className="mt-1 text-sm font-semibold text-sizzler-gray-light sm:text-base">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const [ref, isInView] = useInView();
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="section-anchor relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto mb-12 max-w-3xl text-center sm:mb-14 ${
            isInView ? 'animate-fadeInUp' : 'opacity-0'
          }`}
        >
          <span className="section-eyebrow">{t.about.eyebrow}</span>

          <h2 className="section-title">
            {t.about.title.split(t.about.highlight)[0]}
            <span className="text-sizzler-red">
              {t.about.highlight}
            </span>
            {t.about.title.split(t.about.highlight)[1]}
          </h2>

          <p className="mt-5 text-base leading-8 text-sizzler-gray-light sm:text-lg">
            {t.about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {t.about.features.map(([title, description], index) => {
            const Icon = icons[index];

            return (
              <article
                key={title}
                data-spot className={`feature-card ${
                  isInView ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${(index + 1) * 0.1}s`,
                }}
              >
                <div className="feature-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <h3 className="text-lg font-extrabold text-sizzler-gray-dark">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-sizzler-gray-light">
                  {description}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className={`mt-12 grid grid-cols-2 gap-4 rounded-3xl bg-sizzler-bg px-5 py-7 sm:mt-14 sm:grid-cols-4 sm:gap-6 sm:px-8 ${
            isInView ? 'animate-fadeInUp delay-300' : 'opacity-0'
          }`}
        >
          {t.about.stats.map(([number, label]) => (
            <AnimatedStat
              key={label}
              value={number}
              label={label}
              start={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
