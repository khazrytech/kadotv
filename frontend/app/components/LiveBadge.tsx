export default function LiveBadge({ pulse = true }: { pulse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_0_14px_rgba(239,68,68,0.8)]">
      {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />}
      Live: Champions League Final — Live Now
    </span>
  );
}
