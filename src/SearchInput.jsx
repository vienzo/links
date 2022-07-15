import { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "./SearchContext";

const Input = styled.input`
  background: red;
`;
export const SearchInput = () => {
  const { enabled, term } = useContext(SearchContext);
  const [text, setText] = useState(term);

  return <input type="text" />;
};
