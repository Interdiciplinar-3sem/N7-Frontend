import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type StudentsListPageProps<T> = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  items?: T[];
  isPending?: boolean;
  pendingLabel?: string;
  emptyMessage: string;
  renderItem: (item: T) => ReactNode;
};

export function StudentsListPage<T>({
  title,
  description,
  backHref,
  backLabel,
  items,
  isPending,
  pendingLabel = "Carregando...",
  emptyMessage,
  renderItem,
}: StudentsListPageProps<T>) {
  return (
    <main className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl bg-[#F8FAFC] p-6 shadow-md">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
            <p className="text-sm text-zinc-500">{description}</p>
          </div>

          <Link
            to={backHref}
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            {backLabel}
          </Link>
        </header>

        {isPending ? (
          <div className="flex min-h-40 items-center justify-center text-zinc-500">
            {pendingLabel}
          </div>
        ) : items?.length ? (
          <div className="grid gap-3">{items.map(renderItem)}</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-10 text-center text-zinc-500">
            {emptyMessage}
          </div>
        )}
      </section>
    </main>
  );
}