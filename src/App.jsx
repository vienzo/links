import { useState } from "react";
import { data } from "./data";
import styled, { createGlobalStyle } from "styled-components";
import { QuickLink } from "./components/QuickLink";
import { SearchContext } from "./SearchContext";

const Reset = createGlobalStyle`
  html {
    font-size: 10px;
  }
  * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: unset;
    text-decoration: none;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 1024px;
`;

const LinkGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  max-height: 300px;
`;

const Header = styled.h1`
  margin: 2rem 1rem 1rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 300;
`;

export const App = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Reset />
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <SearchContext.Provider
        value={{ enabled: searchText.length > 0, term: searchText }}
      >
        <Layout>
          <Header>Quicklinks</Header>
          <LinkGrid>
            {data.links.map((link, i) => (
              <QuickLink key={i} {...link} />
            ))}
          </LinkGrid>
          <Header>Snippets</Header>
          <Header>Readme</Header>
        </Layout>
      </SearchContext.Provider>
    </>
  );
};
