<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstname = $_POST["firstname"];

    $email = $_POST["email"];
    $phone = $_POST["phone"];
    echo "<table>
    
    <tr>
      <td>First Name</td>
      <td>$firstName</td>
    </tr>
    <tr>
      <td>Date of Birth</td>
      <td>$dob</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>$email</td>
    </tr>
    <tr>
      <td>Phone</td>
      <td>$phone</td>
    </tr>
  </table>";
} else {
    echo "Something want wrong";
}

?>