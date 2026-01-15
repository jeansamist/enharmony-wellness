import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/services/post.services";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "date-fns";
export default async function page() {
  const categories = await getCategories();
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 pt-6">
      <div className="container mx-auto space-y-6">
        <h2 className="text-3xl leading-normal font-bold flex items-center gap-6 justify-between">
          Categories
          <Button href="/app/settings/categories/create">Add category</Button>
        </h2>
        <Table>
          <TableCaption>A list of categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell className="flex gap-4 items-center h-full">
                  {category.name}
                </TableCell>
                <TableCell>
                  {formatDate(category.created_at, "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    href={`/app/settings/categories/${category.id}`}
                    size="icon-sm"
                    variant="ghost"
                  >
                    <ArrowUpRightIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
