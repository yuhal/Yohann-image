function array_column(arr,key){
  var res = []
  for (var index in arr) {
    res[index] = arr[index][key]
  }
  return res
}

module.exports = {
  array_column: array_column,
  
}