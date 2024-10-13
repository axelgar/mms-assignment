import { Filter } from "@/types";
import { useRouter } from "next/navigation";

const KEYS = {
  keyword: "keyword",
  filter: "filter",
  before: "before",
  after: "after",
};

export const useUrlUpdater = () => {
  const router = useRouter();

  const getUrl = () => new URL(window.location.href);

  const updateKeyword = (value: string) => {
    const url = getUrl();

    url.searchParams.set(KEYS.keyword, value);
    url.searchParams.delete(KEYS.before);
    url.searchParams.delete(KEYS.after);

    router.push(`/${url.search}`);
  };

  const updateFilter = (filter: Filter) => {
    const url = getUrl();
    const current = url.searchParams.get(KEYS.filter);

    if (current === filter) {
      url.searchParams.delete(KEYS.filter);
    } else {
      url.searchParams.set(KEYS.filter, filter);
    }

    router.push(`/${url.search}`);
  };

  const updateAfterCursor = (value: string) => {
    const url = getUrl();

    url.searchParams.delete(KEYS.before);
    url.searchParams.set(KEYS.after, value);

    router.push(`/${url.search}`);
  };

  const updateBeforeCursor = (value: string) => {
    const url = getUrl();

    url.searchParams.delete(KEYS.after);
    url.searchParams.set(KEYS.before, value);

    router.push(`/${url.search}`);
  };

  return {
    updateKeyword,
    updateFilter,
    updateAfterCursor,
    updateBeforeCursor,
  };
};
