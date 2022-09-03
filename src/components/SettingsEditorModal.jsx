import { useContext, useRef } from "react";
import { SettingsContext } from "../SettingsContext";
import { Modal } from "./Modal";
import { db } from "../db";
import styled from "styled-components";
import { importDB, exportDB } from "dexie-export-import";
import { Spacer } from "./Spacer";

const Row = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0.6rem 1rem;
  }

  > button {
    margin-bottom: 1rem;
    padding: 0.3rem 0.6rem;
    font-size: 1rem;
  }
`;

export const SettingsEditorModal = ({ onClose = () => {} }) => {
  const { showUrl, showClicks } = useContext(SettingsContext);
  const uploadRef = useRef();
  const saveValue = async (key, value) => {
    await db.settings.put({ value, setting: key }, key);
  };

  const downloadFile = async () => {
    const fileName = "export";
    const blob = await exportDB(db);
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  const importData = async (file) => {
    await importDB(file, { overwriteValues: true });
  };

  return (
    <Modal onClose={() => onClose(false)} title="Settings">
      <Row>
        <input
          type="checkbox"
          checked={showUrl}
          onChange={(e) => saveValue("showUrl", e.target.checked)}
        />{" "}
        Show Url
      </Row>
      <Row>
        <input
          type="checkbox"
          checked={showClicks}
          onChange={(e) => saveValue("showClicks", e.target.checked)}
        />{" "}
        Show clicks
      </Row>
      <Spacer />
      <Row>
        <button onClick={() => downloadFile()}>export</button>
        <button onClick={() => uploadFile()}>import</button>
        <input
          ref={uploadRef}
          type="file"
          placeholder="import"
          style={{ display: "none" }}
          onChange={(e) => importData(e.target.files[0])}
        />
      </Row>
    </Modal>
  );
};
