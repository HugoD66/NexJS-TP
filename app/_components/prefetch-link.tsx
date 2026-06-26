"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function PrefetchLink({ href, className, children }: Props) {
  const router = useRouter();

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      onMouseEnter={() => router.prefetch(href)}
    >
      {children}
    </Link>
  );
}
