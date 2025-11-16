import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kclabs.app';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Klaus Chamberlain Portfolio',
    short_name: 'KC Portfolio',
    description: 'Full-stack developer portfolio specializing in React, Next.js, and TypeScript',
    start_url: '/',
    display: 'standalone',
    background_color: '#000510',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}



