export default function sitemap() {
  // Festes Datum der letzten inhaltlichen Änderung (bei Textänderungen nachziehen),
  // statt bei jedem Abruf „jetzt“
  const stand = new Date('2026-10-17');
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
    {
      url: 'https://www.neo-heidelberg.de/menu',
      lastModified: stand,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
