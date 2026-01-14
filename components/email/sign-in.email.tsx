interface SignInEmailTemplateProps {
  link: string;
}

export function SignInEmailTemplate({ link }: SignInEmailTemplateProps) {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Click the link below to sign in:</p>
      <a href={link}>Sign In</a>
    </div>
  );
}
