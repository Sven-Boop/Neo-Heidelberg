/** @type {import('next').NextConfig} */
const nextConfig = {
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
