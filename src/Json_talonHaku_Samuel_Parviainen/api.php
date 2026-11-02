<?php
include "yhteys.php";

$tiedosto = "data.json";
$metodi = $_SERVER["REQUEST_METHOD"];

if($metodi === "POST"){
    $katu = "";
    $makuuhuone = "";
    $kylpyhuone = "";

    $sql = "INSERT INTO talot (katu, makuuhuoneet, kylpyhuoneet)
    VALUES ($katu", "$makuuhuone", "$kylpyhuone)";

    if ($conn->query($sql) === TRUE) {
        json_encode("Uusi talo lisätty", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    } else {
            json_encode("Error: " . $sql . "<br>" . $conn->error, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
}





if($metodi === "PUT"){
    $id ="";
    $katu = "";
    $makuuhuone = "";
    $kylpyhuone = "";

    $sql = "UPDATE talot SET katu='.$katu.', makuuhuoneet='.$makuuhuone.', kylpyhuoneet='.$kylpyhuone.' WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        json_encode("Talo on päivitetty", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    } else {
            json_encode("Error talon päivittämisessä: " . $conn->error;, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    $conn->close();
}





if($metodi === "GET"){
    $katu = "";
    $makuuhuone = "";
    $kylpyhuone = "";

    if(isset($katu) | isset($makuuhuone) | isset($kylpyhuone)){ //tarkista jos haetaan jotain
        if (!empty($katu)) {
        $suodatus[] += $katu; // haettavat asiat laitetaan arrayhin
        }
        if (!empty($makuuhuone)) {
            $suodatus[] += $makuuhuone;
        }
        if (!empty($kylpyhuone)) {
            $suodatus[] += $kylpyhuone;
        }

        if(is_array($suodatus)){
            $suodatus = implode(' AND ', $conditions); //jaetaan ne ANDilla, jotta sqlssä ei tule virheitä
        }
        $sql = "SELECT id, katu, makuuhuoneet, kylpyhuoneet FROM talot WHERE '.$suodatus'.";
        // Execute the SQL query
        $result = $conn->query($sql);

        
    }
    else{
        $sql = "SELECT id, katu, makuuhuoneet, kylpyhuoneet FROM talot";
        
        $result = $conn->query($sql);
    }

    json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        $conn->close();
}





if($metodi === "DELETE"){
    $id ="";

    $sql = "DELETE FROM talot WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        json_encode("Talo on poistettu", JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    } else {
            json_encode("Error talon poistamisess: " . $conn->error;, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
    
}