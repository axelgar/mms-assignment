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

  return {
    updateKeyword,
  };
};
