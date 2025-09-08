import { ICategory } from "@/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface HomeCategoryListProps {
  dataCategories: ICategory[];
  isLoadingCategories: boolean;
}

const HomeCategoryList: FC<HomeCategoryListProps> = ({
  dataCategories,
  isLoadingCategories,
}) => {
  return (
    <Card className="mx-6 mb-8 p-8 lg:mx-0">
      <CardHeader className="p-0">
        <h1 className="text-2xl font-bold text-primary">Event by Category</h1>
      </CardHeader>
      <CardBody className="mt-4 p-0">
        <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto pb-4 lg:grid-cols-8 lg:pb-0">
          {!isLoadingCategories
            ? dataCategories.map((category) => (
                <Link
                  key={`categories-list-${category._id}`}
                  href={`/event?category=${category._id}`}
                  title={`${category.name}`}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all hover:scale-95"
                >
                  <Image
                    src={`${category.icon}`}
                    alt={`${category.name}`}
                    width={100}
                    height={100}
                  />
                  <p className="text-medium font-bold text-foreground-700">
                    {category.name}
                  </p>
                </Link>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={`list-categories-skeleton-${index}`}
                  className="aspect-square rounded-xl"
                />
              ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default HomeCategoryList;
