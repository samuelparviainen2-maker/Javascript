<?php
  $para1 = "";
  $para2 = "";


$motherInfo = "The mother cats are called ";
$kittenInfo;
$requestURL =
  "https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json";

$data = file_get_contents($requestURL);

// Don't edit the code above here!

function displayCatInfo($data) {
  $total = 0;
  $male = 0;

  // Add your code here
$cats = json_decode($data, true);
  
 foreach ($cats as $cat){
    $motherNames[] = $cat['name'];

    foreach($cat["kittens"] as $kitten){
        if($kitten["gender"] === "m"){
        $male ++;
      }
      $total++;
    }
  }
  $female = $total-$male;
  $motherInfo = "The mother cats are called " . implode(", ", $motherNames);
    $kittenInfo = "There are $total kittens in total, $male males and $female females.";

      return [$motherInfo, $kittenInfo];
  // Don't edit the code below here!

  
}
[$para1, $para2] = displayCatInfo($data);
?>

<!doctype html>
<html>
    <head>

    </head>
    <body>
        
    <p><?php echo $para1; ?></p>
    <p><?php echo $para2; ?></p>

    

    </body>
</html>