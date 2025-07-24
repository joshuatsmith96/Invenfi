import type { ReactNode } from "react"

type ViewPageType = {
  pageTitle: string,
  children: ReactNode
}

const ViewPage = ({ pageTitle, children }: ViewPageType) => {
  return (
    <div className="flex flex-col gap-15">
      <h1 className="font-bold text-2xl">{pageTitle}</h1>
      {children}
    </div>
  );
};

export default ViewPage;
