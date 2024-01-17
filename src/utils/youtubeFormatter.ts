export function formatYouTubeViews(viewCount: number) {
  if (isNaN(viewCount)) return "Invalid view count";

  const units = ["", "k", "M", "B", "T"];
  const unitSize = 1000;

  if (typeof viewCount === "number") {
    viewCount = parseFloat(viewCount.toFixed(2));
  }

  for (let i = units.length - 1; i >= 0; i--) {
    if (viewCount >= unitSize ** i) {
      const formattedViewCount = (viewCount / unitSize ** i).toFixed(
        i === 0 ? 0 : 1
      );
      return `${formattedViewCount}${units[i]}`;
    }
  }

  return `${viewCount}`;
}

export function formatYoutubeTime(publishedAt: string) {
  const currentDate: any = new Date();
  const publishedDate: any = new Date(publishedAt);

  if (!publishedDate) return "Invalid published date";

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = currentDate - publishedDate;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else if (elapsed >= msPerYear) {
    return Math.round(elapsed / msPerYear) + " years ago";
  } else {
    return "";
  }
}
