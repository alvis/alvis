import { notFound } from 'next/navigation';

import { Header } from '#components';
import { essays } from '#content';

import { Manuscript } from './components/Manuscript';

import type { Metadata } from 'next';
import type { FC } from 'react';

type EssayPageProps = {
  params: Promise<{ slug: string }>;
};

const MAX_DESCRIPTION_LENGTH = 160;
const DESCRIPTION_BODY_LENGTH = 159;

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

  const description =
    essay.summary.length > MAX_DESCRIPTION_LENGTH
      ? `${essay.summary.slice(0, essay.summary.slice(0, DESCRIPTION_BODY_LENGTH).lastIndexOf(' '))}…`
      : essay.summary;

  return {
    title: `${essay.title} - Alvis Tang`,
    description,
  };
};

/**
 * individual essay page rendered with the Codex (`Manuscript`) layout. the
 * page wraps the article in a hero-style `<header>` carrying the watercolor
 * wash + math-lines decoration so the splash paints across the top of the
 * viewport behind the nav (matching the `/` home layout), then renders the
 * article below. typography is driven by the codex CSS token contract.
 * @param props component props
 * @param props.params route params
 * @returns essay page or `notFound` redirect when the slug is unknown
 */
export default (async function EssayPage({ params }) {
  const { slug } = await params;
  const essay = essays.find((item) => item.slug === slug);

  if (!essay) {
    notFound();
  }

  return (
    <>
      <header className="relative isolate overflow-visible bg-(--color-paper) text-(--color-ink)">
        <div className="watercolor-paper absolute top-0 right-0 bottom-[-12rem] left-0 -z-30" />
        <div
          aria-hidden="true"
          className="math-lines absolute top-0 right-0 bottom-[-12rem] left-0 -z-10"
        />

        <Header />
      </header>

      <main className="relative isolate" id="main-content" tabIndex={-1}>
        <Manuscript essay={essay} />
      </main>
    </>
  );
} satisfies FC<EssayPageProps>);
