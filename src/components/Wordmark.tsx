type Props = { className?: string; sub?: boolean };

/**
 * The event's own wordmark treatment. No TED logo or TED conference imagery
 * is used anywhere on this site, per TED brand rules — this is set in type.
 */
export default function Wordmark({ className = "", sub = true }: Props) {
  return (
    <span className={`inline-flex items-baseline leading-none ${className}`}>
      <span className="tracking-[-0.03em]">TED</span>
      <span className="text-tedred tracking-[-0.03em]">x</span>
      {sub && (
        <span className="ml-[0.35em] tracking-[-0.01em] font-normal">The&nbsp;Orbis&nbsp;School</span>
      )}
    </span>
  );
}
