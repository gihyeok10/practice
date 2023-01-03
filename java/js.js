function findSmall(arr){
  if(arr.length == 0){
    return 0
  }
  let result = arr[0]
  for(let i = 1; i<arr.length; i++){
    if(result>arr[i]){
      result = arr[i]
    }
  }
  return result
}
console.log(findSmall([100,200,40,50]))