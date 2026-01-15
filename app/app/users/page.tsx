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
import { getUsers } from "@/services/user.services";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { formatDate } from "date-fns";
import Link from "next/link";

export default async function page() {
  const users = await getUsers();
  console.log(users);

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 pt-6">
      <div className="container mx-auto space-y-6">
        <h2 className="text-3xl leading-normal font-bold flex items-center gap-6 justify-between">
          Users<Button href="/app/users/create">Add user</Button>
        </h2>
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Full name</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell className="flex gap-4 items-center h-full">
                  {user.full_name}
                </TableCell>
                <TableCell>
                  <Link
                    href={`mailto:${user.email}`}
                    className="underline text-primary"
                  >
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {formatDate(user.created_at, "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    href={`/app/users/${user.id}`}
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
