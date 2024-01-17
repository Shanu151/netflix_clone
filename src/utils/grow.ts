export function getVideoId(link: string) {
  try {
    if (link.indexOf("www.youtube.com") > -1) return link.split("?v=")[1];
    else if (link.indexOf("youtu.be") > -1) return link.split(".be/")[1];
    return null;
  } catch (e) {
    return null;
  }
}
