interface NewsletterEmailTemplateProps {
  postTitle: string;
  postDescription: string;
  readMoreLink: string;
  unsubscribeLink: string;
  trackingPixelUrl?: string;
}

export function NewsletterEmailTemplate({
  postTitle,
  postDescription,
  readMoreLink,
  unsubscribeLink,
  trackingPixelUrl,
}: NewsletterEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>{postTitle}</h1>
      <p style={{ fontSize: "16px", color: "#555" }}>{postDescription}</p>
      <div style={{ margin: "20px 0" }}>
        <a
          href={readMoreLink}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          Read More
        </a>
      </div>
      <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #eee" }} />
      <p style={{ fontSize: "12px", color: "#999" }}>
        You received this email because you subscribed to our newsletter.
        <br />
        <a href={unsubscribeLink} style={{ color: "#999", textDecoration: "underline" }}>
          Unsubscribe
        </a>
      </p>
      {trackingPixelUrl && (
        <img
          src={trackingPixelUrl}
          alt=""
          width="1"
          height="1"
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}
