<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $typ = htmlspecialchars($_POST['typ']);
    $opis = htmlspecialchars($_POST['opis']);

    $data = date("Y-m-d H:i:s");
    $zamowienie = "--------------------------\n";
    $zamowienie .= "Data: $data\n";
    $zamowienie .= "E-mail: $email\n";
    $zamowienie .= "Typ zamówienia: $typ\n";
    $zamowienie .= "Opis:\n$opis\n";
    $zamowienie .= "--------------------------\n\n";

    file_put_contents('zlozone.txt', $zamowienie, FILE_APPEND);

    // Przekierowanie na stronę główną z parametrem status=success
    header("Location: index.html?status=success");
    exit;
} else {
    echo "Błąd: formularz nie został poprawnie wysłany.";
}
?>
