export default function TagPill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
      {children}
    </span>
  );
}
