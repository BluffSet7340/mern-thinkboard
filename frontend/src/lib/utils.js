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

// utility function
export const createDate = (date) => {
    const tempDate = date.slice(0,10).split("-");
    const month = parseInt(tempDate[1]);
    const newDate = `${months[month-1]} ${tempDate[2]}, ${tempDate[0]}`
    return newDate;
}
