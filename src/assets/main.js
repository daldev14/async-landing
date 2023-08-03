const channelId = "UCfAXqC6YWzigHLJuoYEracQ";
const maxResults = 12;
const API = `https://youtube-v31.p.rapidapi.com/search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=${maxResults}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c589b707eemshb192b661987bc64p1fc7f1jsneea2b60db0d0",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const content = null || document.querySelector("#content");

async function fetchData(urlApi) {
  try {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
        ${videos.items
          .map((video) => {
            return `
            <div class="group relative">
              <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
                <div
                  class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
                  >
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                  <h3 class="text-sm font-bold text-gray-700 group-hover:text-green-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                  </h3>
                </div>
              </a>
            </div>
            `;
          })
          .join("")}
    `;

    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
