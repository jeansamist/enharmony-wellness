"use client";

import { triggerWeeklyNewsletter } from "@/actions/newsletter.actions";
import { Button } from "@/components/ui/button";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function TriggerNewsletterButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!confirm("Are you sure you want to send the weekly newsletter now?")) {
      return;
    }

    setLoading(true);
    try {
      const result = await triggerWeeklyNewsletter();
      if (result.success) {
        alert(result.message);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={loading} className="flex gap-2 items-center">
      <PaperPlaneRightIcon size={20} />
      {loading ? "Sending..." : "Send Weekly Newsletter"}
    </Button>
  );
}
