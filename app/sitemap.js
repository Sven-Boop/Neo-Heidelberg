export default function sitemap() {
  const now = new Date();
  const langs = {
    de: 'https://www.neo-heidelberg.de/',
    en: 'https://www.neo-heidelberg.de/en',
  };
  return [
    {
      url: 'https://www.neo-heidelberg.de/',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: langs },
    },
    {
      url: 'https://www.neo-heidelberg.de/en',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: langs },
    },
    {
      url: 'https://www.neo-heidelberg.de/menu',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
