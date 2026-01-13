import { ArticleCard } from "@/components/article-card";
import { FunctionComponent } from "react";

export const Recommended: FunctionComponent = () => {
  return (
    <div className="container px-6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-tight md:leading-normal px-2 py-2 border-b border-tertiary">
        Recommended for You
      </h2>
      <div className="grid px-0 xl:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};
