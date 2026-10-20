/** @type {import('next').NextConfig} */
// Menü-Baukasten (eigenes Vercel-Projekt neo-baukasten, basePath /menue-baukasten) als Unterseite
// www.neo-heidelberg.de/menue-baukasten (Sven 20.10.2026). Live: Produktion des Baukastens; Vorschauen: seine Winter-Vorschau.
const BAUKASTEN =
  process.env.VERCEL_ENV === 'production'
    ? 'https://neo-baukasten.vercel.app'
    : 'https://neo-baukasten-git-winter-sven-boops-projects.vercel.app';

const nextConfig = {
  async rewrites() {
    return [
      { source: '/menue-baukasten', destination: `${BAUKASTEN}/menue-baukasten` },
      { source: '/menue-baukasten/:pfad*', destination: `${BAUKASTEN}/menue-baukasten/:pfad*` },
    ];
  },
  async redirects() {
    return [
      // Doppelte Adresse: die vercel.app-Adresse des Projekts auf die Hauptdomain
      // (neo-heidelberg-xgr1.vercel.app ist ein eigenes, altes Projekt und bleibt unberührt)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'neo-heidelberg.vercel.app' }],
        destination: 'https://www.neo-heidelberg.de/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
