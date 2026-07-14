import { sections, sharing } from './menuData';

export const metadata = {
  title: 'Menu (English) — NEO Bar & Restaurant Heidelberg',
  description:
    'The NEO menu in English. Dry-aged steaks, Californian sushi, signature rolls, bowls and desserts — Zollhofgarten 2, Heidelberg.',
};

function Item({ item }) {
  return (
    <div className={item.img ? 'item' : 'item no-image'}>
      {item.img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="item-img" src={item.img} alt={item.name} loading="lazy" />
      )}
      <div className="item-text">
        <div className="item-head">
          <div className="item-name">{item.name}</div>
          {item.price && <div className="item-price">{item.price}</div>}
        </div>
        {item.sub && <div className="item-sub">{item.sub}</div>}
        {item.desc && <div className="item-desc">{item.desc}</div>}
      </div>
    </div>
  );
}

export default function MenuEnglishPage() {
  return (
    <main className="menu-en">
      <header className="menu-en-hero">
        <a href="/" className="legal-back">← Back to neo-heidelberg.de</a>
        <div className="eyebrow">Menu · English</div>
        <h1>
          Feed your <em>soul.</em>
        </h1>
        <p>
          Dry-aged steaks from our humidor, Californian sushi, signature rolls and
          desserts. Kitchen open from 5:30 pm, Sundays from 4 pm. Please let us know about
          any allergies or intolerances — our team is happy to help.
        </p>
      </header>

      <section className="sharing" id="sharing">
        <div className="sharing-inner">
          <div className="eyebrow">{sharing.eyebrow}</div>
          <h2>
            {sharing.h2[0]}
            <em>{sharing.h2[1]}</em>
          </h2>
          <p className="lead">{sharing.lead}</p>
          <div className="courses">
            {sharing.courses.map((c) => (
              <div className="course" key={c.num}>
                <div className="course-num">{c.num}</div>
                <div className="course-name">{c.name}</div>
                <div className="course-desc">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="sharing-price">
            <span className="label">{sharing.priceLabel}</span>
            <span className="price">
              {sharing.price}
              <small>{sharing.priceUnit}</small>
            </span>
          </div>
          <a
            href="https://reservation.gastronaut.ai/neo-heidelberg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Book a table
          </a>
        </div>
      </section>

      {sections.map((sec) => (
        <section className="section" key={sec.eyebrow}>
          <div className="section-head">
            <div>
              <div className="eyebrow">{sec.eyebrow}</div>
              <h2>
                {sec.h2[0]}
                <em>{sec.h2[1]}</em>
              </h2>
            </div>
            <p>{sec.intro}</p>
          </div>
          {sec.groups.map((g) => (
            <div key={g.subcat}>
              <div className="subcat">{g.subcat}</div>
              <div className="items">
                {g.items.map((item) => (
                  <Item item={item} key={item.name} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <section className="reserve">
        <div className="reserve-inner">
          <div className="eyebrow">Reservation</div>
          <h3>
            There you are. We’ve <em>been waiting.</em>
          </h3>
          <p className="sub">
            Zollhofgarten 2 · 69115 Heidelberg · Mon–Sat from 5:30 pm · Sun from 4 pm
          </p>
          <div className="btn-row">
            <a
              href="https://reservation.gastronaut.ai/neo-heidelberg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary"
            >
              Book a table
            </a>
            <a href="mailto:info@neo-heidelberg.de" className="btn">
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
