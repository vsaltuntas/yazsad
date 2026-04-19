import { init } from "@paralleldrive/cuid2";

const cuid = init({ length: 18 });

export function newId(prefix: string): string {
  return `${prefix}_${cuid()}`;
}

export const id = {
  user: () => newId("usr"),
  artist: () => newId("art"),
  track: () => newId("trk"),
  album: () => newId("alb"),
  order: () => newId("ord"),
  orderItem: () => newId("oit"),
  license: () => newId("lic"),
  playlist: () => newId("ply"),
  comment: () => newId("cmt"),
  topic: () => newId("tpc"),
  post: () => newId("pst"),
  category: () => newId("cat"),
  contest: () => newId("ctst"),
  entry: () => newId("ent"),
  news: () => newId("nws"),
  notification: () => newId("ntf"),
  feedback: () => newId("fbk"),
  audit: () => newId("aud"),
  membership: () => newId("mem"),
  playEvent: () => newId("ply"),
  prompt: () => newId("prm"),
};
