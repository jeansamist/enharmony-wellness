"use client";
import { createUserAction } from "@/actions/user.actions";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select } from "../ui/select";

export const CreateUserForm: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const response = await createUserAction(formData);
    if (response?.error) {
      setError(response.error);
      return;
    }
  };
  return (
    <form className="space-y-6" action={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input name="full_name" placeholder="Enter the full name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" placeholder="Enter the email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          name="role"
          options={[
            { value: "reviewer", label: "Reviewer" },
            { value: "writer", label: "Writer" },
          ]}
        />
      </div>
      <Button type="submit" className="w-full">
        Continue
      </Button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  );
};
