interface ReviewNotificationEmailTemplateProps {
  postTitle: string;
  link: string;
}

export function ReviewNotificationEmailTemplate({
  postTitle,
  link,
}: ReviewNotificationEmailTemplateProps) {
  return (
    <div>
      <h1>New Post for Review</h1>
      <p>
        A new post titled &quot;<strong>{postTitle}</strong>&quot; has been
        assigned to you for review.
      </p>
      <p>Click the link below to view it:</p>
      <a href={link}>View Post</a>
    </div>
  );
}
