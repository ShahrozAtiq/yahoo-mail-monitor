chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.action === "extractAttachment") {
    const newTab = await chrome.tabs.create({ url: message.emailURL });
    chrome.scripting.executeScript(
      {
        target: { tabId: newTab.id },
        files: ["extractAttachScript.js"],
      },
      () => {
        console.log("done");
      }
    );
  }
  if (message.action === "downloadAttachment") {
    var attachmentUrl = message.url;
    var timestamp = message.timestamp;

    // Convert the timestamp to a valid JavaScript Date object
    var dateObj = new Date(timestamp);
    var timestampMs = dateObj.getTime();

    // Create the options object for the download
    var options = {
      url: attachmentUrl,
      saveAs: false,
    };

    // Initiate the download
    chrome.downloads.download(options, function (downloadId) {
      if (downloadId) {
        // Download initiated successfully
        console.log("Attachment download initiated");

        // Add listener for the onDeterminingFilename event to modify the file's timestamp
        chrome.downloads.onDeterminingFilename.addListener(function (
          item,
          suggest
        ) {
          // Get the downloaded file entry
          chrome.downloads.getFileIcon(item.id, function (fileEntry) {
            if (fileEntry) {
              console.log(fileEntry);
              // Use the File System API to modify the file's timestamp
              fileEntry.file(function (file) {
                file.lastModified = timestampMs; // Set the modified timestamp

                // Create a new Blob with the modified File object
                var blob = new Blob([file], { type: file.type });

                // Create a new File object with the modified Blob
                var modifiedFile = new File([blob], file.name, {
                  lastModified: timestampMs,
                });

                // Create a FileWriter to write the modified file
                var writer = new FileWriter(fileEntry);

                // Write the modified file content
                writer.write(modifiedFile);

                writer.onwriteend = function () {
                  // suggest({ filename: item.filename }); // Suggest the same filename to keep it unchanged
                };
              });
            }
          });
        });
      } else {
        // Download failed
        console.log("Failed to initiate attachment download");
      }
    });
  }
});
