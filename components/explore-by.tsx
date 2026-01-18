import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const ExploreBy: FunctionComponent = () => {
  return (
    <div className="container px-6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-tight md:leading-normal px-2 py-2 border-b border-tertiary">
        Explore by
      </h2>
      <div className="grid px-0 xl:px-12 grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-12">
        <Link
          href={"/categories/wellness"}
          className="flex flex-col gap-2 items-center group"
        >
          <Image src="/wellness.png" width={96} height={96} alt="wellness" />
          <div className="font-bold text-lg lg:text-2xl leading-normal text-center">
            Wellness
          </div>
        </Link>
        <Link
          href={"/categories/holistic-care"}
          className="flex flex-col gap-2 items-center group"
        >
          <Image
            src="/holistic-care.png"
            width={96}
            height={96}
            alt="holistic care"
          />
          <div className="font-bold text-lg lg:text-2xl leading-normal text-center">
            Holistic Care
          </div>
        </Link>
        <Link
          href={"/categories/sefl-and-growth"}
          className="flex flex-col gap-2 items-center group"
        >
          <Image src="/self.png" width={96} height={96} alt="self" />
          <div className="font-bold text-lg lg:text-2xl leading-normal text-center">
            Self & Growth
          </div>
        </Link>
        <Link
          href={"/categories/nutrition-and-nature"}
          className="flex flex-col gap-2 items-center group"
        >
          <Image src="/nutrition.png" width={96} height={96} alt="nutrition" />
          <div className="font-bold text-lg lg:text-2xl leading-normal text-center">
            Nutrition & Nature
          </div>
        </Link>
      </div>
    </div>
  );
};
