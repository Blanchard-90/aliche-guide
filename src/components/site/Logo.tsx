import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-9 w-9 rounded-2xl gradient-primary shadow-soft grid place-items-center text-primary-foreground font-display font-extrabold">
        <span className="text-base">A</span>
        <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-tight text-lg ${light ? "text-white" : "text-foreground"}`}>
          ALITCHÉ
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">orientation</span>
      </div>
    </Link>
  );
}
