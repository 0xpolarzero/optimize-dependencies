import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import type { PageSlug } from '@/lib/types/site';

import NavBar from '@/components/common/nav-bar';
import SeoBase, { type SeoBaseProps } from '@/components/templates/seo-base';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BaseLayoutProps = SeoBaseProps & {
  pageSlug?: PageSlug;
  children?: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BaseLayout: FC<BaseLayoutProps> = ({ title, subtitle, pageSlug, children }) => {
  return (
    <>
      <SeoBase title={title} subtitle={subtitle} />
      <NavBar selected={pageSlug} />
      <main className="relative flex grow flex-col">{children}</main>
      <footer className="bottom-0 w-full border-t border-gray-4">
        <div className=" py-2 text-center text-[0.8rem] text-gray-11">
          by{' '}
          <Link
            className="font-medium underline"
            href="https://twitter.com/0xpolarzero"
            target="_blank"
            rel="noreferrer noopener"
          >
            polarzero
          </Link>
          , design forked from{' '}
          <Link
            className="font-medium underline"
            href="https://fiveoutofnine.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            5/9
          </Link>
        </div>
      </footer>
    </>
  );
};

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
