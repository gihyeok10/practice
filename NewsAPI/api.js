//0
let news = [];
let url;
let menus = document.querySelectorAll(".menus button");
console.log("menus",menus)
let searchButton = document.getElementById("search-button");
console.log("버튼은?",searchButton);
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)));

//각 함수에서 필요한 URL을 만듬.
//호출 API함수를 부름.
//겹치는 부분 함수로 만듦.


const getNews = async() => {
    
    try{
        let header = new Headers({'x-api-key':'l8rAwZmm9Wm6XCGB6N7CSPE1LHoyztGHSl6tnsxDsQ'})
        let response =  await fetch(url,{headers:header});
        let data = await response.json()
        if (response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색된 결과값이 없습니다!")
            }
            news = data.articles
            console.log(news)
            render();
        }else{
            throw new Error(data.message)
        }
      
    }catch(error){
        console.log("에러이유:",error.message)
        errorRender(error.message);
    }

    
}
const getLatestNews = async ()=> {
     url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);              //URL을 쓰기 위한 클래스
     getNews();
};



const getNewsByTopic = async (event) => {
    console.log("클릭댐",event.target.textContent.toLowerCase());
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    getNews();
};


const getNewsByKeyWorld= async () => {
    //1.검색 키워드 읽어오기.
    //2.url에 검색 키워드 붙이기
    //3. 헤더준비
    //4. url 부르기
    //5. 데이터 가져오기
    //6. 데이터 보여주기

    let keyworld = document.getElementById("search-input").value
    console.log(keyworld);
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyworld}&page_size=10`)
    getNews();

}



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

const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert>
    ${message}</div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

getLatestNews();

searchButton.addEventListener("click",getNewsByKeyWorld);

// async function request() {
//     const response = await fetch(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=2`,
//     {headers:{'x-api-key':'pwMxbU6gOMBez-pDRnY5nC_hbygPm2_1TTPyBFxPepI'}})
//     const data = await response.json();
//     console.log(data)
//   }
//   request();
