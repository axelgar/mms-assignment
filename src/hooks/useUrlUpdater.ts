import { Filter } from "@/types";
import { useRouter } from "next/navigation";

const KEYS = {
  keyword: "keyword",
  before: "before",
  after: "after",
};

export const useUrlUpdater = () => {
  const router = useRouter();

  const getUrl = () => new URL(window.location.href);

  const updateKeyword = (value: string) => {
    const url = getUrl();

    url.searchParams.set("keyword", value);
    url.searchParams.delete(KEYS.before);
    url.searchParams.delete(KEYS.after);

    router.push(`/${url.search}`);
  };

  const updateFilter = (filter: Filter) => {
    const url = getUrl();
    const current = url.searchParams.get("filter");

    if (current === filter) {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", filter);
    }

    router.push(`/${url.search}`);
  };

  return {
    updateKeyword,
    updateFilter,
  };
};
