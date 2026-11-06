export default function sitemap() {
  // Festes Datum der letzten inhaltlichen Änderung (bei Textänderungen nachziehen),
  // statt bei jedem Abruf „jetzt“
  const stand = new Date('2026-10-28');
  const langs = {
    de: 'https://www.neo-heidelberg.de/',
    en: 'https://www.neo-heidelberg.de/en',
    'x-default': 'https://www.neo-heidelberg.de/',
  };
  return [
    {
      url: 'https://www.neo-heidelberg.de/',
      lastModified: stand,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: langs },
    },
    {
      url: 'https://www.neo-heidelberg.de/en',
      lastModified: stand,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: langs },
    },
    {
      url: 'https://www.neo-heidelberg.de/speisekarte',
      lastModified: stand,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.neo-heidelberg.de/hochzeit',
      lastModified: stand,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Anlass-Seiten für die Heidelberger Event-Suchen (seit 17.10.2026)
    ...['/eventlocation-heidelberg', '/firmenfeier', '/weihnachtsfeier'].map((pfad) => ({
      url: 'https://www.neo-heidelberg.de' + pfad,
      lastModified: stand,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    // Silvester 2026 (seit 06.11.2026), deutsch und englisch als Sprachpaar
    ...['/silvester', '/en/new-years-eve'].map((pfad) => ({
      url: 'https://www.neo-heidelberg.de' + pfad,
      lastModified: new Date('2026-11-06'),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          de: 'https://www.neo-heidelberg.de/silvester',
          en: 'https://www.neo-heidelberg.de/en/new-years-eve',
          'x-default': 'https://www.neo-heidelberg.de/silvester',
        },
      },
    })),
    {
      url: 'https://www.neo-heidelberg.de/menu',
      lastModified: stand,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
