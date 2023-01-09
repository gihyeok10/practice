//0
let news = [];
let page =1;
let total_pages = 0;
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
        let header = new Headers({'x-api-key':'l8rAwZmm9Wm6XCGB6N7CSPE1LHoyztGHSl6tnsxDsQ0'})
        url.searchParams.set("page", page) // &page = ${page} url뒤에 페이지 붙이기.
        let response =  await fetch(url,{headers:header});
        let data = await response.json()
        if (response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색된 결과값이 없습니다!")
            }
            news = data.articles
            total_pages = data.total_pages;
            page = data.page;
            console.log(news)
            render();
            pagination();
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

const pagination = () => {
    let paginationHTML = ` <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-1})">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>`
    //총 페이지
    // 내가 보고있는 페이지
    //그룹
    //첫번째, 마지막페이지 
    //totla page가 3개 이하로 있다면..?
    
    let pageGroup = Math.ceil(page/5)
    let last =pageGroup * 5
    let first = last-4
    
    for(let i= first; i<=last; i++){
        
        paginationHTML += `<li class="page-item" ${page == i? "active" : "null"}><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`

    }

    paginationHTML += `  <li class="page-item">
    <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">
      <span aria-hidden="true">&gt;</span>
    </a>
  </li>`

    document.querySelector(".pagination").innerHTML=paginationHTML;

}

//페이지 기준으로 내가 몇번째 기준인지
//그 그룹의 처번째와 마지막 페이지를 안다. (그룹숫자 * 5)
//첫번째 페이지 (마지막 - 4)
//그려주기 for

const moveToPage = (pageNumber) => {
    page = pageNumber;
    console.log(page);
    //이동하고 싶은 페이지 알기
    //이동하고 싶은 페이지를 가지고 api를 다시 호출 해주자.




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
