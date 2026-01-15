import { CreateUserForm } from "@/components/forms/create-user.form";

export default async function page() {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 pt-6">
      <div className="container mx-auto ">
        <div className="p-8 bg-secondary/30 border-tertiary/15 border rounded-3xl max-w-md w-full space-y-6 mx-auto">
          <h2 className="text-3xl leading-normal font-bold">
            Create a new user
          </h2>
          <div className="">
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
  );
}
