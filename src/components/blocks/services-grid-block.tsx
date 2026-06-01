import { ServicesGrid } from "@/components/marketing/services-grid";
import type { ServiceData } from "@/components/marketing/service-modal";
import { AnimationPreset } from "@prisma/client";
import { type BlockContent } from "@/lib/cms/blocks";

export function ServicesGridBlock({
  content,
  services,
  preset,
}: {
  content: BlockContent;
  services: ServiceData[];
  preset: AnimationPreset;
}) {
  return (
    <ServicesGrid
      services={services}
      title={(content.title as string) ?? "Our Services"}
      subtitle={content.subtitle as string | undefined}
    />
  );
}
