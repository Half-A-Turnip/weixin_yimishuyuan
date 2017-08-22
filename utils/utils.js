export function objToString(obj=[]){
  let str ='';
  for(let n in obj){
    str += `${n}=${obj[n]}&`
  }
  return str
}