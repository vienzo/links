import { createContext } from "react";

export const SearchContext = createContext({
  enabled: false,
  term: "",
});
