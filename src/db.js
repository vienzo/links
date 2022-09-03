import Dexie from "dexie";

export const db = new Dexie("home");
db.version(4).stores({
  links: "++id, title, url",
  clicks: "++id, link_id, timestamp",
  settings: "setting, value",
});
