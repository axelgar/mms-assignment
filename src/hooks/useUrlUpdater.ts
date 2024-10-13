import { useRouter } from "next/router";

const KEYS = {
  keyword: "keyword",
  before: "before",
  after: "keyword",
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

  return {
    updateKeyword,
  };
};
