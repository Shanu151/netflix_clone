export const formatDateDiff = (dateString: string) => {
  const inputDate: any = new Date(dateString);
  const currentDate: any = new Date();
  const diffInMilliseconds = currentDate - inputDate;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} mins ago`;
  } else if (diffInHours < 24) {
    return `${Math.round(diffInHours)} hours ago`;
  } else {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = inputDate.getDate();
    const monthIndex = inputDate.getMonth();
    const year = inputDate.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
  }
};

export const formatDateDDMMYY = (inputDate: string) => {
  const date = new Date(inputDate);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear().toString()}`;
  return formattedDate;
};

export const formatAMPM = (dateStr: any) => {
  let date = new Date(dateStr);
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const timeDifference = (isoDate: string) => {
  const date1 = new Date(isoDate);
  const date2 = new Date(); // Current time

  const diffInSeconds = Math.floor((date2.getTime() - date1.getTime()) / 1000);
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30.44; // Average days in month
  const year = day * 365.25;

  if (diffInSeconds < minute) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < hour) {
    return `${Math.floor(diffInSeconds / minute)}m`;
  } else if (diffInSeconds < day) {
    return `${Math.floor(diffInSeconds / hour)}h`;
  } else if (diffInSeconds < week) {
    return `${Math.floor(diffInSeconds / day)}d`;
  } else if (diffInSeconds < month) {
    return `${Math.floor(diffInSeconds / week)}w`;
  } else if (diffInSeconds < year) {
    return `${Math.floor(diffInSeconds / month)}mo`;
  } else {
    return `${Math.floor(diffInSeconds / year)}y`;
  }
};
