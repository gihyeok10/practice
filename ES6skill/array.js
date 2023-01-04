const names = ["a","b","c","d","e","f","g","h","i","p"];

function printName (item) {
    console.log(item)
}
//위랑 같음
names.forEach((item,index)=> {console.log(item,index)});  //모든 함수를 매개변수를로 받음 item을 넣어줌.. 

//foreach는 반환값 없음, map은 array를 리턴한다..
const data = names.map((item)=>{
    return item
})

console.log(data);

const ceoList =[ 
   {name: "ki" ,age: 23, ceo:true},
   {name: "si" ,age: 21, ceo:false},
   {name: "gi" ,age: 25, ceo:true},

]

const dataa = ceoList.filter((item)=>{
    return item.age == 23
}) //원하는 값만 필터링 해줌.



console.log(dataa);

const data2 = ceoList.some((item)=>{
    return item.name.startsWith("g");
})
//g로 시작하는 이름이 있나?
console.log(data2);


const data3 = ceoList.find((item)=>{
    return item.name.startsWith("s")
})

console.log(data3)