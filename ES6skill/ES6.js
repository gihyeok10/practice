//변수의 이름을 가지고 객체 키 값을 자동으로 만듬..

let nick = "기혁"
let age = 25;

let person = {nick,age}

console.log(person);


// 쉽게 분리하기 
let bts = {
    name: "방탄소년단",
    num: 7
}

// let name = bts.name
// let num = bts.num
//이걸 

let {name,num} = bts
//키 값은 똑같이 해야함
console.log(name,num);

// `${name}`

//배열도 마찬가지
let array = [1,2,3]
let a = array[0]
let b = array[1]
let c = array[2]
console.log(a,b,c);
let [d,f,g] = array
console.log(d,f,g)
let [k,...rest] = array
console.log(rest);

let personal = {
    nam: "기혁",
    num:26,
    man:"ok",
}
let {nam,...restInfo} = personal
console.log(restInfo);

let aa = [1,2]
let bb = [3,4]
let cc = [5,6]

let result = [...aa,...bb,...cc]  //배열 붙여쓰기
console.log(result)

const foo = () => {
    console.log("hello")
}

const fooo = () => "hi"

foo();

console.log(fooo());

//this per안에 score를 말함. =>함수는 생성 X
let score = 17;
let per = {
    name:"gg",
    score: 26,
    getInfo: function(){
        console.log(this.score)
    }
}

per.getInfo();
