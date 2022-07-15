import { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../SearchContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;

  font-size: 1.3rem;
  :hover {
    background: #8080805f;
  }
`;

const Icon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  margin: 5px;
  opacity: ${({ dim }) => (dim ? `.15` : "1")};
`;

const Title = styled.span`
  text-align: center;
  margin: 1rem;
`;

export const QuickLink = ({ title, url }) => {
  const { enabled, term } = useContext(SearchContext);

  const searchMatch =
    enabled && (url.indexOf(term) >= 0 || title.indexOf(term) >= 0);
  return (
    <Link
      href={url}
      dim={enabled && !searchMatch}
      highlight={enabled && searchMatch}
    >
      <Container>
        <IconContainer>
          <Icon src={`https://icon.horse/icon/${getBaseUrl(url)}?size=small`} />
        </IconContainer>
        <Title>{title}</Title>
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
