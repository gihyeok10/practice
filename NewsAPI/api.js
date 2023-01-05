let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));
const getLatestNews = async ()=> {
    const url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);              //URL을 쓰기 위한 클래스
    console.log(url);

    const header = new Headers({'x-api-key':'MRaYCOyGR7aj5KSkcNyGAzuaGxRsVXvMgDbLJEIiWpE'})

    const response =  await fetch(url,{headers:header});
    const data = await response.json()
    news = data.articles
    console.log(news)
    render()
}

const getNewsByTopic =async (event) => {
    console.log("클릭댐",event.target.textContent)
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10&topic=${topic}`)
    const header = new Headers({'x-api-key':'MRaYCOyGR7aj5KSkcNyGAzuaGxRsVXvMgDbLJEIiWpE'})
    const response =  await fetch(url,{headers:header});
    const data = await response.json()
    news = data.articles
    render();
};

const render = () => {
    let newsHTML = ""
   newsHTML = news.map(item => {
        return `
        <div class="row news">
        <div class="col-lg-4">
            <img class="news-img" src = "${item.media}">
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <div>
              ${item.rights} ${item.published_date}
            </div>
        </div> 
    </div>
        `
    }).join("");
    

    document.getElementById("news-board").innerHTML = newsHTML
}

getLatestNews();



// async function request() {
//     const response = await fetch(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=2`,
//     {headers:{'x-api-key':'pwMxbU6gOMBez-pDRnY5nC_hbygPm2_1TTPyBFxPepI'}})
//     const data = await response.json();
//     console.log(data)
//   }
//   request();
