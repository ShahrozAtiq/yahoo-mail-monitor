function handleNewEmailWithAttachment() {
  const messageDate = document.querySelector(
    'div[data-test-id="message-date"] span'
  );
  const timestamp = getDate(messageDate.textContent);
  console.log("Time : " + timestamp);

  const attachmentElement = document.querySelector(
    'a[data-test-id="attachment-download"]'
  );
  const attachmentUrl = attachmentElement.href;
  chrome.runtime.sendMessage({
    action: "downloadAttachment",
    url: attachmentUrl,
    timestamp: timestamp,
  });
}

function getDate(dateString) {
  // Split the string by spaces
  const parts = dateString.split(" ");

  // Extract the day, month, date, time, and period
  const day = parts[0].slice(0, -1);
  const month = parts[1];
  const date = parseInt(parts[2]);
  const time = parts[4];
  const period = parts[5];

  // Extract the hour and minute from the time
  const [hour, minute] = time.split(":").map((part) => parseInt(part));

  // Convert hour to 24-hour format if necessary
  let hour24 = hour;
  if (period === "PM" && hour !== 12) {
    hour24 = hour + 12;
  } else if (period === "AM" && hour === 12) {
    hour24 = 0;
  }

  // Get the current year
  const currentYear = new Date().getFullYear();
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

  // Create a new Date object
  const dateObject = new Date(
    currentYear,
    monthNames.indexOf(month),
    date,
    hour24,
    minute
  );

  return dateObject;
}

handleNewEmailWithAttachment();
