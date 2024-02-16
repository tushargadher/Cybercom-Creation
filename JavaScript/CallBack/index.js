const makeTea = (Tea) => {
  console.log("Adding Water");
  setTimeout(() => {
    console.log("Boil Water");
    Tea(milk);
  }, 5000);
};
let Tea = (milk) => {
  console.log("Adding Tea leaves");
  setTimeout(() => {
    console.log("Added Tea Leaves");
    milk();
  }, 2000);
};
let milk = () => {
  console.log("Add Milk");
};

makeTea(Tea);
