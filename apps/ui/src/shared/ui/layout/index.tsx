import { type ReactNode } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

interface Props {
  headerSlot?: ReactNode;
  sidebarSlot?: ReactNode;
}

export function Layout({ headerSlot, sidebarSlot }: Props) {
  return (
    <main>
      {headerSlot && <header>{headerSlot}</header>}

      <section>
        <div>
          <Outlet />
        </div>
        {sidebarSlot && <aside>{sidebarSlot}</aside>}
      </section>

      <ScrollRestoration />
    </main>
  );
}
