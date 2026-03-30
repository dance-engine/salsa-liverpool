import Link, { type LinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    className?: string;
  };

function mergeClassNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const FilledButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function FilledButtonLink({ className, children, ...props }, ref) {
    return (
      <Link
        ref={ref}
        {...props}
        className={mergeClassNames(
          "salsa-button rounded-2xl px-4 py-2 font-semibold",
          className
        )}
      >
        {children}
      </Link>
    );
  }
);

export const OutlinedButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function OutlinedButtonLink({ className, children, ...props }, ref) {
    return (
      <Link
        ref={ref}
        {...props}
        className={mergeClassNames(
          "skeuo-chip rounded-2xl px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15",
          className
        )}
      >
        {children}
      </Link>
    );
  }
);
