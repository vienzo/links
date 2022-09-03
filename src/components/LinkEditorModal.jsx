import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { Spacer } from "./Spacer";

export const LinkEditorModal = ({
  onClose = () => {},
  onSave = async () => {},
  link,
}) => {
  const [id, setId] = useState(link?.id);
  const [title, setTitle] = useState(link?.title || "");
  const [url, setURL] = useState(link?.url || "");
  const [group, setGroup] = useState();
  const [newGroupName, setNewGroup] = useState();
  const [groups, setGroups] = useState([]);
  const [values, setValues] = useState(1);
  const urlRef = useRef();

  const addGroup = (selection) => {
    setGroups([...groups, selection]);
  };
  useEffect(() => {
    const listener = (e) => {
      if (urlRef.current === e.target.activeElement) {
        const selection = document.getSelection();
        const txt = selection.toString();
        txt && setGroup(txt);
      }
    };
    document.addEventListener("selectionchange", listener);
    return () => {
      document.removeEventListener("selectionchange", listener);
    };
  }, [urlRef.current]);
  const submit = async () => {
    await onSave({ id, title, url });
    setId(undefined);
    setTitle("");
    setURL("");
  };
  return (
    <Modal onClose={() => onClose(false)} title="Link Editor">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        ref={urlRef}
        type="text"
        placeholder="url"
        value={url}
        onChange={(e) => setURL(e.target.value)}
      />
      {group && (
        <button onClick={() => addGroup(group)}>
          convert "{group}" to a group
        </button>
      )}
      {groups.length && (
        <>
          Group Name:{" "}
          <input
            type="text"
            value={newGroupName || group}
            onChange={(e) => setNewGroup(e.target.value)}
          />
        </>
      )}
      {groups.length &&
        groups.map((g) => (
          <div>
            {Array.from({ length: values }).map((v) => (
              <div key={v}>
                <input defaultValue={""} />
                <input defaultValue={g} />
                <button onClick={() => setValues(values + 1)}>+ value</button>
              </div>
            ))}
          </div>
        ))}
      <Spacer />
      <button onClick={() => submit()}>save</button>
    </Modal>
  );
};

const GroupRender = ({ name, values, alias }) => {};
