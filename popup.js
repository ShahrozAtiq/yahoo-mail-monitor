// // async function display() {
// //   let data = await chrome.storage.local.get("tvShowsHistroy");
// //   console.log(data);
// //   data.tvShowsHistroy.forEach((item) => {
// //     const para = document.createElement("p");
// //     const node = document.createTextNode("This is new.");
// //     para.appendChild(node);
// //     console.log(item.name);
// //   });
// // }

// // display();

// document.addEventListener("DOMContentLoaded", async function () {
//   async function getData() {
//     return await chrome.storage.local.get("tvShowsHistroy");
//   }
//   let data = await getData();
//   // console.log(data);

//   if (!("tvShowsHistroy" in data)) {
//     return;
//   }

//   const tvShowsHistoryArray = data.tvShowsHistroy;
//   let tvShowsContainer = document.getElementById("tvShowsContainer");

//   tvShowsHistoryArray.forEach(function (tvShow) {
//     let showItem = document.createElement("div");
//     showItem.className = "show-item";

//     let posterImg = document.createElement("img");
//     posterImg.src = tvShow.poster;
//     showItem.appendChild(posterImg);

//     let showName = document.createElement("span");
//     showName.textContent = tvShow.name;
//     showItem.appendChild(showName);

//     let showEpisodes = document.createElement("div");
//     showEpisodes.className = "show-episods";

//     let episodeList = document.createElement("ul");
//     episodeList.className = "episode-list";

//     tvShow.episodes.forEach(function (episode) {
//       let episodeItem = document.createElement("li");
//       episodeItem.className = "episode-item";

//       let episodeLink = document.createElement("a");
//       episodeLink.href = episode.episodeLink;
//       episodeLink.textContent = episode.episodeName;
//       episodeLink.setAttribute("target", "_blank");

//       episodeItem.appendChild(episodeLink);
//       episodeList.appendChild(episodeItem);
//     });

//     showItem.addEventListener("click", function () {
//       episodeList.style.display =
//         episodeList.style.display === "none" ? "block" : "none";
//     });

//     showEpisodes.appendChild(episodeList);
//     tvShowsContainer.appendChild(showItem);
//     tvShowsContainer.appendChild(showEpisodes);
//   });
// });
