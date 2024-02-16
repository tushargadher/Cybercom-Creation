const delayFunction = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Show me functoin after 2 second");
    resolve("Promise Resolved");
  }, 2000);
  //   reject("I am reject");
});

const myFunction = (delayFunction) => {
  console.log("This is main function");
  console.log(delayFunction);
  delayFunction
    .then((resolve) => {
      console.log(resolve);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("After show me function");
};

myFunction(delayFunction);
