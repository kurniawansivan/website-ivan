import type { Dictionary } from "@/content/dictionary";
import { blockHash } from "@/lib/hash";
import { Section } from "@/components/ui/section";
import { ChainTimeline, type ChainItem } from "./chain-timeline";

const GENESIS_PARENT = "0".repeat(8);

export function Experience({ dict }: { dict: Dictionary["experience"] }) {
  const total = dict.items.length;
  // Hashes are derived from locale-neutral fields so both languages show the same chain.
  const hashes = dict.items.map((item, index) => blockHash(`experience:${total - index}:${item.org}`, 8));

  const items: ChainItem[] = dict.items.map((item, index) => ({
    ...item,
    number: String(total - index).padStart(3, "0"),
    hash: hashes[index],
    parent: hashes[index + 1] ?? GENESIS_PARENT,
  }));

  return (
    <Section id="experience" eyebrow={dict.eyebrow} title={dict.title} intro={dict.intro}>
      <ChainTimeline items={items} labels={{ block: dict.blockLabel, parent: dict.parentLabel }} />
    </Section>
  );
}
