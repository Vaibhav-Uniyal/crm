export function Section({ label, title, subtitle, children, className = "", id }) {
  return (
    <section id={id} className={`pres-section ${className}`}>
      <div className="pres-container">
        {label && <div className="pres-label">{label}</div>}
        {title && <h2 className="pres-title">{title}</h2>}
        {subtitle && <p className="pres-subtitle mb-8">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
