import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { QuickLink } from "./components/QuickLink";
import { SearchContext } from "./SearchContext";
import { LinkEditorModal } from "./components/LinkEditorModal";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import { SettingsContext } from "./SettingsContext";
import { Settings } from "./icons/Settings";
import { Modal } from "./components/Modal";
import { SettingsEditorModal } from "./components/SettingsEditorModal";

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

  input[type="text"] {
    padding: 2px;
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
  gap: 3px 24px;
`;

const Spacer = styled.span`
  flex: 1;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  margin: 4rem 0.6rem;
`;

const StyledSettings = styled(Settings)`
  cursor: pointer;
  transition: stroke-width 0.3s ease;
  &:hover {
    stroke-width: 2px;
  }
`;

export const App = () => {
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const links = useLiveQuery(() => db.links.toArray());
  const clicks = useLiveQuery(() => db.clicks.toArray());
  const settings = useLiveQuery(() => db.settings.toArray());

  const saveLink = async (link) => {
    console.log(link);
    if (link.id) {
      await db.links.update(link.id, link);
    } else {
      await db.links.add(link);
    }
    setCurrentLink(undefined);
  };

  const saveClick = async (id) => {
    await db.clicks.add({ timestamp: new Date().getTime(), link_id: id });
  };

  const deleteLink = async (id) => {
    await db.links.delete(id);
  };

  const startEdit = (link) => {
    setCurrentLink(link);
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
    setCurrentLink(null);
  };

  const s = (settings || []).reduce(
    (curr, next) => ({ ...curr, [next.setting]: next.value }),
    {}
  );

  return (
    <>
      <Reset />
      <SettingsContext.Provider value={s}>
        <Layout>
          <TopBar>
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <Spacer />
            <input
              type="checkbox"
              onChange={(e) => setEditEnabled(e.target.checked)}
              value={editEnabled}
            />

            <StyledSettings onClick={() => setShowSettings(true)} />
          </TopBar>
          <SearchContext.Provider
            value={{ enabled: searchText.length > 0, term: searchText }}
          >
            {modalOpen && (
              <LinkEditorModal
                onClose={onClose}
                onSave={(link) => saveLink(link)}
                link={currentLink}
              />
            )}
            {showSettings && (
              <SettingsEditorModal onClose={() => setShowSettings(false)} />
            )}
            {editEnabled && (
              <button onClick={() => setModalOpen(true)}>add</button>
            )}
            <LinkGrid>
              {links?.map((link, i) => (
                <React.Fragment key={i}>
                  <QuickLink
                    {...link}
                    clicks={
                      (clicks || []).filter((c) => c.link_id === link.id).length
                    }
                    onClick={saveClick}
                  />
                  {editEnabled && (
                    <>
                      <button onClick={() => startEdit(link)}>edit</button>
                      <button onClick={() => deleteLink(link.id)}>
                        delete
                      </button>
                    </>
                  )}
                </React.Fragment>
              ))}
            </LinkGrid>
            {/* <Header>Snippets</Header>
          List of copy-pasteable snippets
          <Header>Readme</Header>
          List of links to read */}
          </SearchContext.Provider>
        </Layout>
      </SettingsContext.Provider>
    </>
  );
};
