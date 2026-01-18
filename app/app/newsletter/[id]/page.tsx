import { getCampaignStats } from "@/services/campaign.services";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default async function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stats = await getCampaignStats(Number(id));

  if (!stats) {
    notFound();
  }

  const { campaign, totalSent, opens, clicks } = stats;

  const openRate = totalSent > 0 ? ((opens / totalSent) * 100).toFixed(1) : "0";
  const clickRate = totalSent > 0 ? ((clicks / totalSent) * 100).toFixed(1) : "0";

  return (
    <div className="p-8 space-y-8">
      <Link href="/app/newsletter" className="flex items-center text-gray-500 hover:text-gray-900 mb-4">
        <ArrowLeftIcon className="mr-2" /> Back to Campaigns
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.name}</h1>
        <p className="text-gray-500 text-lg">Subject: <span className="text-gray-900 font-medium">{campaign.subject}</span></p>
        <p className="text-gray-500 text-sm mt-4">Sent on {new Date(campaign.sent_at).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Sent</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalSent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Opens</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{opens}</p>
          <p className="text-sm text-gray-400 mt-1">{openRate}% rate</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Clicks</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{clicks}</p>
          <p className="text-sm text-gray-400 mt-1">{clickRate}% rate</p>
        </div>
      </div>
    </div>
  );
}
