import { SignInForm } from "@/components/forms/sign-in.form";

export default function Page() {
  return (
    <div className="min-h-screen py-12 flex justify-center items-center">
      <div className="max-w-md w-full bg-secondary p-6 rounded-3xl border border-tertiary/15 space-y-6">
        <div>
          <h2 className="text-3xl leading-normal font-bold">Sign In</h2>
          <p className="leading-normal opacity-70">
            Welcome back, just fill the form below to sign in
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
