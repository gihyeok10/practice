
const getLatestNews = ()=> {
    const url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=2`);              //URL을 쓰기 위한 클래스
    console.log(url);

    const header = new Headers({'x-api-key':'pwMxbU6gOMBez-pDRnY5nC_hbygPm2_1TTPyBFxPepI'})

    const response = fetch(url,{headers:header})

}

async function request() {
    const response = await fetch(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=2`,
    {headers:{'x-api-key':'pwMxbU6gOMBez-pDRnY5nC_hbygPm2_1TTPyBFxPepI'}})
    const data = await response.json();
    console.log(data)
  }
  request();
