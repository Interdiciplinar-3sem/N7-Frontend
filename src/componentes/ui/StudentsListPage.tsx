import type { ReactNode, RefObject } from "react";
import { Loader2 } from "lucide-react";

type StudentsListPageProps<T> = {
  setOpenFollowersList?: (open: boolean) => void;
  setOpenFollowingList?: (open: boolean) => void;
  isOpen?: boolean;
  title: string;
  description: string;
  backLabel: string;
  items?: T[];
  isPending?: boolean;
  pendingLabel?: string;
  emptyMessage: string;
  renderItem: (item: T) => ReactNode;
  sentinelRef?: RefObject<HTMLDivElement | null>;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
};

export function StudentsListPage<T>({
  setOpenFollowersList,
  setOpenFollowingList,
  isOpen,
  title,
  description,
  backLabel,
  items,
  isPending,
  pendingLabel = "Carregando...",
  emptyMessage,
  renderItem,
  sentinelRef,
  isFetchingNextPage,
  hasNextPage,
}: StudentsListPageProps<T>) {

  if (!isOpen) {
    return null;
  }

  const handdleClose = () => {
    if (setOpenFollowersList) setOpenFollowersList(false);
    if (setOpenFollowingList) setOpenFollowingList(false);
  }

  return (
    <main className="fixed top-0 left-1/2 -translate-x-1/2 min-h-screen z-100 w-full">
      <section className="font-sans min-h-dvh bg-zinc-100/95 flex flex-col pt-10">
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl bg-[#F8FAFC] p-6 shadow-md">
          <header className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
              <p className="text-sm text-zinc-500">{description}</p>
            </div>
            <button
              onClick={() => handdleClose()}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              {backLabel}
            </button>
          </header>

          {isPending ? (
            <div className="flex min-h-40 items-center justify-center text-zinc-500">
              {pendingLabel}
            </div>
          ) : items?.length ? (
            <>
              <div className="grid gap-3">{items.map(renderItem)}</div>

              {sentinelRef && (
                <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                </div>
              )}

              {!hasNextPage && !isFetchingNextPage && (
                <p className="text-center text-xs text-zinc-400">
                  Todos os usuários foram carregados.
                </p>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-10 text-center text-zinc-500">
              {emptyMessage}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
