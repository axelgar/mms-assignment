import { Input } from "@/atoms";
import { useUrlUpdater } from "@/hooks";
import { FormEvent, useState } from "react";
import { S } from "./styled";

type Props = {
  keyword: string;
};

export const Search = (props: Props) => {
  const { keyword } = props;
  const [searchTerm, setSearchTerm] = useState(keyword);
  const { updateKeyword } = useUrlUpdater();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateKeyword(searchTerm || "");
  };

  return (
    <S.Form onSubmit={handleSearch}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search issues..."
      />

      <S.Button type="submit">Search</S.Button>
    </S.Form>
  );
};
