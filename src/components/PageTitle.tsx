import { ReactNode } from "react";

interface PageTitleProps {
  // ReactNode позволяет передавать и обычный текст,
  // и текст вместе с динамическими значениями.
  children: ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  return <h1 className="page-title">{children}</h1>;
}

export default PageTitle;