export default function SectionHeading({
  number,
  title,
  kicker,
  description,
}: {
  number: string;
  title: string;
  kicker: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span className="blue">{number}</span> / {kicker}
        </p>
        <h2>
          {title}
          <span className="blue">.</span>
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
