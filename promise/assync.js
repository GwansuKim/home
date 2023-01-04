function greet() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 3000);
  });
}

async function callgreet() {
  var result = await greet();
  console.log(result);
  console.log(result.length);
}
callgreet();
console.log("end");
