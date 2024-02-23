export function formatDate(unformattedDate: string) {
  let date = new Date(unformattedDate);

  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JS
  let year = date.getFullYear();
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);

  let formattedDate = `${day}/${month}/${year} às ${hours}:${minutes}`;

  return formattedDate;
}
