import { useInView } from '../hooks/useInView';
import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../useLanguage';
import { contactCards, contactDetails } from '../data/siteData';

const contactIcons = { phone: Phone, mail: Mail, map: MapPin, clock: Clock3 };

export default function Contact() {
  const [ref, isInView] = useInView();
  const { t } = useLanguage();
  const contactInfo = contactCards.map((card) => ({
    ...card,
    icon: contactIcons[card.icon],
    title: t.contact[card.titleKey],
    value: t.contact[card.valueKey],
    href: card.hrefKey ? contactDetails[card.hrefKey] : null,
  }));

  return (
    <section id="contact" className="section-anchor relative overflow-hidden bg-sizzler-bg py-16 sm:py-20 lg:py-24">
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto mb-10 max-w-3xl text-center sm:mb-12 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <span className="section-eyebrow">{t.contact.eyebrow}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="mt-4 text-base leading-7 text-sizzler-gray-light sm:text-lg">{t.contact.description}</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {contactInfo.map(({ icon: Icon, title, value, valueDirection, href, color }) => {
              const displayValue = valueDirection ? <bdi dir={valueDirection}>{value}</bdi> : value;
              const card = <><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${color} text-white shadow-md`}><Icon size={21} /></span><span className="min-w-0"><span className="block text-xs font-semibold text-sizzler-gray-light">{title}</span><span className="mt-1 block break-words text-sm font-extrabold leading-6 text-sizzler-gray-dark">{displayValue}</span></span></>;
              return href ? <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="contact-info-card">{card}</a> : <div key={title} className="contact-info-card">{card}</div>;
            })}
            <a href={contactDetails.whatsappHref} target="_blank" rel="noreferrer" className="whatsapp-cta sm:col-span-2"><MessageCircle size={20} />{t.contact.whatsapp}</a>
          </div>
        </div>

        <div className={`mt-7 overflow-hidden rounded-3xl bg-white shadow-lg ${isInView ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
          <iframe className="contact-map" src={contactDetails.mapEmbedUrl} width="100%" height="340" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t.contact.mapTitle} />
        </div>
      </div>
    </section>
  );
}
