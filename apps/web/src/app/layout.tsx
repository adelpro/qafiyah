import { Footer } from '@/components/footer';
import { MobileMenu } from '@/components/nav/mobile-menu';
import { Nav } from '@/components/nav/nav';
import {
  GITHUB_REPO_URL,
  isDev,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  TWITTER_ID,
  TWITTER_URL,
} from '@/constants/GLOBALS';
import { htmlHeadMetadata } from '@/constants/SITE_METADATA';
import { Providers } from '@/providers/react-query';
import { cn } from '@/utils/conversions/cn';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type React from 'react';
import { ibmPlexSansArabic } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: htmlHeadMetadata.title,
  description: htmlHeadMetadata.description,
  keywords: htmlHeadMetadata.keywords,
  authors: [{ name: htmlHeadMetadata.author }],
  creator: htmlHeadMetadata.poetName,
  category: 'Poetry',
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      ar: '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      notranslate: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ar_AR',
    url: SITE_URL,
    title: htmlHeadMetadata.title,
    description: htmlHeadMetadata.description,
    images: [
      {
        url: htmlHeadMetadata.openGraphUrl,
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: htmlHeadMetadata.title,
    description: htmlHeadMetadata.description,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    creatorId: TWITTER_ID,
    images: {
      url: htmlHeadMetadata.twitterSummaryCardImageUrl,
      height: 480,
      width: 480,
      alt: htmlHeadMetadata.description,
    },
  },
  other: {
    'apple-mobile-web-app-title': SITE_NAME,
    'application-name': SITE_NAME,
    copyright: htmlHeadMetadata.author,
    abstract: htmlHeadMetadata.description,
    google: 'notranslate',
    'priority-hints': 'on',
  },
};

export const viewport: Viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cn(
        'bg-zinc-50 text-zinc-950 font-sans',
        'overflow-x-hidden overflow-y-scroll',
        ibmPlexSansArabic.variable,
        {
          'debug-screens': isDev,
        }
      )}
    >
      <body
        className={cn(
          'relative overflow-x-hidden',
          'min-h-svh w-full',
          'grid grid-rows-[auto_1fr_auto]',
          'bg-zinc-50 text-zinc-950 font-sans',
          'px-4 md:px-20 lg:px-40 xl:px-60 2xl:px-80'
        )}
      >
        <Providers>
          <NuqsAdapter>
            <Nav />
            <MobileMenu />
            <main className={cn('flex-1 w-full', 'flex justify-start items-start')}>
              {children}
            </main>
            <Footer />
          </NuqsAdapter>
        </Providers>
        <Script
          id="cloudflare-analytics"
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a707ff647c644bf69a7661040471963d"}'
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: htmlHeadMetadata.title,
              url: SITE_URL,
              description: htmlHeadMetadata.description,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}/logo.png`,
                  width: '112',
                  height: '112',
                },
                sameAs: [TWITTER_URL, GITHUB_REPO_URL],
              },
              inLanguage: 'ar',
            }),
          }}
        />
      </body>
    </html>
  );
}
