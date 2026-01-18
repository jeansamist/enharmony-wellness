"use client";
import { createCategoryAction } from "@/actions/post.actions";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const CreateCategoryForm: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createCategoryAction(formData);
      if (response?.error) {
        setError(response.error);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="space-y-6" action={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input name="name" placeholder="Enter the category name" />
      </div>
      <Button type="submit" className="w-full" loading={isLoading}>
        Create the new category
      </Button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  );
};
