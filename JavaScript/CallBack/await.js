const loadData = async () => {
  // return new Promise((resolve, reject) => {
  //   reject("Data not available");
  //   setTimeout(() => {
  //     resolve(344);
  //   }, 5000);
  // });
  let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  let result = await data.json();
  
  return result;
};
const main = async () => {
  console.log("Hello Welcome to await example");
  console.log("initializing");
  console.log("loading data...");
  let result = await loadData();
  console.log("Data are below");
  console.log(result);
  console.log("Program completed");
};
main();
