function monitorYahooMail() {
  const emailElements = document.querySelectorAll(".bj_a0xJ8");

  emailElements.forEach((emailElement) => {
    const ariaLabel = emailElement.getAttribute("aria-label");
    const hasAttachment = ariaLabel.includes("attachment");

    if (hasAttachment) {
      const emailURL =
        "https://mail.yahoo.com" + emailElement.getAttribute("href");

      // handleNewEmailWithAttachment(emailURL);
      chrome.runtime.sendMessage({
        action: "extractAttachment",
        emailURL: emailURL,
      });
    }
  });
}
if (window.location.href.includes("mail.yahoo.com")) {
  monitorYahooMail();
}
