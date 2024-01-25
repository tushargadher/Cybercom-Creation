function calculateBMI() {
  //   e.preventDefault();

  let form = document.getElementById("form");
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let Result = document.getElementById("bmtResult");
  let bmiCategory = document.getElementById("bmiCategory");
  let height_status = false;
  let weight_status = false;

  if (height === "" || isNaN(height) || height <= 0) {
    document.getElementById("height_error").innerHTML =
      "Please Enter Vaild Height";
  } else {
    document.getElementById("height_error").innerHTML = "";
    height_status = true;
  }
  if (weight === "" || isNaN(weight) || weight <= 0) {
    document.getElementById("weight_error").innerHTML =
      "Please Enter Vaild Weight";
  } else {
    document.getElementById("weight_error").innerHTML = "";
    weight_status = true;
  }

  //   if both height and weight are vaild value then calcalute BMI
  if (height_status && weight_status) {
    let BMI = weight / (height * height).toFixed(2);

    if (BMI < 18.6) {
      bmiCategory.innerHTML = `Underweight`;
      Result.innerHTML = `${BMI} kg/m<sup>2</sup>`;
      Result.style.color = "red";
      bmiCategory.style.color = "red";
      form.style["boxShadow"] = "0 0 40px red";
    } else if (BMI >= 18.6 && BMI < 24.9) {
      bmiCategory.innerHTML = `Normal Weight `;
      Result.innerHTML = `${BMI} kg/m<sup>2</sup>`;
      Result.style.color = "green";
      bmiCategory.style.color = "green";

      form.style["boxShadow"] = "0 0 40px green";
    } else if (BMI >= 25 && BMI < 29.9) {
      bmiCategory.innerHTML = `OverWeight `;
      Result.innerHTML = `${BMI} kg/m<sup>2</sup>`;
      Result.style.color = "#FF7000";
      bmiCategory.style.color = "#FF7000";
      form.style["boxShadow"] = "0 0 40px #FF7000";
    } else {
      bmiCategory.innerHTML = `Obesity: `;
      Result.innerHTML = `${BMI} kg/m<sup>2</sup>`;
      Result.style.color = "red";
      bmiCategory.style.color = "red";
      form.style["boxShadow"] = "0 0 40px red";
    }
  }
}
