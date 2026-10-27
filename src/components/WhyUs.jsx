import {
  CheckCircle2,
  CreditCard,
  Headphones,
  Star,
  Truck,
  ThumbsUp,
} from 'lucide-react';

import { useInView } from '../hooks/useInView';
import { useLanguage } from '../useLanguage';

const icons = [
  CheckCircle2,
  CreditCard,
  Truck,
  Headphones,
  Star,
  ThumbsUp,
];

export default function WhyUs() {
  const [ref, isInView] = useInView();
  const { t } = useLanguage();

  // Split the title into normal and highlighted parts.
  // The Arabic highlight should include the letter "و".
  const titleParts = t.why.title.split(t.why.highlight);

  return (
    <section
      id="why-us"
      className="section-anchor relative overflow-hidden bg-sizzler-gray-dark py-16 sm:py-20 lg:py-24"
    >
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto mb-11 max-w-3xl text-center sm:mb-14 ${
            isInView ? 'animate-fadeInUp' : 'opacity-0'
          }`}
        >
          <span className="section-eyebrow section-eyebrow-dark">
            {t.why.eyebrow}
          </span>

          <h2 className="section-title !text-white">
            {titleParts[0]}

            <span className="text-sizzler-red-light">
              {t.why.highlight}
            </span>

            {titleParts.slice(1).join(t.why.highlight)}
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg">
            {t.why.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {t.why.reasons.map(([title, description], index) => {
            const Icon = icons[index];

            return (
              <article
                key={title}
                data-spot className={`why-card ${
                  isInView ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${(index + 1) * 0.08}s`,
                }}
              >
                <div className="why-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}