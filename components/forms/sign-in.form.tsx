"use client";
import { signInAction } from "@/actions/auth.actions";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const SignInForm: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signInAction(formData);
      if (response?.error) {
        setError(response.error);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="space-y-4" action={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input name="email" placeholder="Enter your email" />
      </div>
      <Button type="submit" disabled={isLoading} loading={isLoading} className="w-full">
        Continue
      </Button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      {success && (
        <div className="text-green-500 text-sm text-center">
          Sign-in email sent! Please check your inbox.
        </div>
      )}
    </form>
  );
};
