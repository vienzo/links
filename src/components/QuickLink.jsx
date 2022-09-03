import { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../SearchContext";
import { SettingsContext } from "../SettingsContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  font-size: 1.3rem;
  border: 1px solid transparent;

  :hover {
    background: #f7f7f7;
    border: 1px solid #8080801f;
  }
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 2px;
`;

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.6rem;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  opacity: ${({ dim }) => (dim ? `.15` : "1")};
`;

const Title = styled.span`
  text-align: center;
  margin: 0.4rem 0.6rem;
`;

const Subtitle = styled.span`
  margin: 0rem 0.6rem;
  font-size: 1.1rem;
  line-height: 1.2rem;
  color: gray;
  max-width: 450px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Counter = styled.span`
  background: #d3d3d3;
  padding: 2px 4px;
  font-size: 0.7rem;
  border-radius: 2px;
  border: 1px solid gray;
  margin: 0.6rem;
`;
const TextBlocks = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.6rem;
  align-items: flex-start;
`;

const hasMatch = (url, title, term) => {
  const t = term.toLowerCase();
  return (
    (url || "").toLowerCase().indexOf(t) >= 0 ||
    (title || "").toLowerCase().indexOf(t) >= 0
  );
};

export const QuickLink = ({ id, title, url, clicks, onClick }) => {
  const { enabled, term } = useContext(SearchContext);
  const { showUrl, showClicks } = useContext(SettingsContext);

  const searchMatch = enabled && hasMatch(url, title, term);
  return (
    <Link
      onClick={async (e) => {
        const newTab = e.ctrlKey;
        console.log(e.ctrlKey, e.altKey, e.shiftKey);
        e.preventDefault();
        await onClick(id);
        if (newTab) {
          window.open(url, "_blank");
        } else {
          window.location = url;
        }
      }}
      href={url}
      dim={enabled && !searchMatch}
      highlight={enabled && searchMatch}
    >
      <Container>
        {showClicks && <Counter>{clicks}</Counter>}
        <IconContainer>
          <Icon src={`https://icon.horse/icon/${getBaseUrl(url)}?size=small`} />
        </IconContainer>
        <TextBlocks>
          <Title>{title}</Title>
          {showUrl && <Subtitle>{url}</Subtitle>}
        </TextBlocks>
      </Container>
    </Link>
  );
};

const getBaseUrl = (url) => {
  const parts = url.split("/");

  if (parts[0] === "https:") {
    return parts[2];
  }
  return parts[0];
};
