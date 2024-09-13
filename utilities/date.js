export function getCurrentDateTime() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  let hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";

  hour = hour % 12;
  hour = hour ? hour : 12; // Handle midnight (0 hours)

  const formattedDateTime = `${month} ${day}, ${year} ${hour}:${
    minute < 10 ? "0" + minute : minute
  }${ampm}`;

  return formattedDateTime;
}
