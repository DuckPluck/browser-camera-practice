import type { Metadata } from 'next';
import React from 'react';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Tesonero Next.js Template',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<Props>) {
  return (
    <html className="page" lang="en">
      <body className="page__body">{children}</body>
    </html>
  );
}
