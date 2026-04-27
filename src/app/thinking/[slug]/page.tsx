import { notFound } from 'next/navigation';

import { Header } from '#components';
import {
  BlogReader,
  BlogVariantProvider,
  BlogVariantSelector,
} from '#components/blog';
import { essays } from '#content';

import type { Metadata } from 'next';
import type { FC } from 'react';

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = (): Array<{ slug: string }> =>
  essays.map((essay) => ({ slug: essay.slug }));

export const generateMetadata = async ({
  params,
}: EssayPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const essay = essays.find((item) => item.slug === slug);

  if (!essay) {
    return { title: 'Essay not found - Alvis Tang' };
  }

  return {
    title: `${essay.title} - Alvis Tang`,
    description: essay.summary,
  };
};

/**
 * individual essay page; wraps the article in a blog variant provider so the
 * floating `BlogVariantSelector` can swap between presentation layouts on the
 * fly. the selector is only mounted inside this `[slug]` route, so it never
 * appears on `/` or `/thinking`.
 * @param props component props
 * @param props.params route params
 */
export default (async function EssayPage({ params }) {
  const { slug } = await params;
  const essay = essays.find((item) => item.slug === slug);

  if (!essay) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden" id="main-content">
        <div aria-hidden="true" className="section-wash section-wash-left" />
        <BlogVariantProvider>
          <BlogReader essay={essay} />
          <BlogVariantSelector />
        </BlogVariantProvider>
      </main>
    </>
  );
} satisfies FC<EssayPageProps>);
