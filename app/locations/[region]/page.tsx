import type { Metadata } from "next";
import { getCanadaDirectoryIndex } from "@/lib/canadaFacilities";
import { getDirectoryIndex } from "@/lib/stateFacilities";

type RegionPageProps = {
  params: Promise<{
    region: string;
  }>;
};

export async function generateStaticParams() {
  const [directory, canadaDirectory] = await Promise.all([
    getDirectoryIndex(),
    getCanadaDirectoryIndex(),
  ]);
  const staticParams: { region: string }[] = [];

  for (const state of directory) {
    if (state.stateSlug) {
      staticParams.push({ region: state.stateSlug });
    }
  }

  for (const province of canadaDirectory) {
    if (province.provinceSlug) {
      staticParams.push({ region: province.provinceSlug });
    }
  }

  return staticParams;
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { region } = await params;
  const regionCode = region.toUpperCase();

  return {
    title: `Speech therapy practices in ${regionCode}`,
    description: `Explore speech therapy practice options and services in ${regionCode} with SpeechTherapyDirectories.com.`,
    openGraph: {
      title: `Speech therapy practices in ${regionCode} | SpeechTherapyDirectories.com`,
      description: `Browse speech therapy practice options and services in ${regionCode}.`,
      url: `/locations/${region}`,
      type: "website",
    },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params;
  const regionCode = region.toUpperCase();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">
          Speech Therapy Practices by Region
        </p>
        <h1 className="text-3xl font-semibold text-navy">
          Speech therapy practice options in {regionCode}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          This is a placeholder view for{" "}
          <span className="font-semibold">{regionCode}</span>. Here you&apos;ll
          be able to browse speech therapy practice services in this state or
          province.
        </p>
        <div className="mt-6 rounded-xl border border-surface-muted bg-surface px-4 py-6 text-sm text-slate-500">
          Practice data will be loaded from your data model. This template
          ships with an empty `data/` folder (no JSON files).
          <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">
            /data
          </code>{" "}
          directory.
        </div>
      </div>
    </main>
  );
}
