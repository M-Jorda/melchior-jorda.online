<?php
// Vérifie si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupère et échappe les données du formulaire
    $nom = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    // Adresse e-mail de destination
    $destinataire = "jorda.j.fr@gmail.com";

    // Sujet de l'e-mail
    $sujet = "Nouveau message du formulaire";

    // Obtient l'heure et la date actuelles
    $dateReception = date("d/m/Y H:i:s");

    // Contenu de l'e-mail
    $contenu = "Bonjour, vous avez reçu un message. Voilà les détails:\n";
    $contenu .= "Date et heure de la reception: $dateReception\n";
    $contenu .= "Nom: $nom\n";
    $contenu .= "Email: $email\n";
    $contenu .= "Message: $message\n";

    // En-têtes de l'e-mail
    $headers = "From: $destinataire\n";

    // Envoi de l'e-mail
    if (mail($destinataire, $sujet, $contenu, $headers)) {
        // Si le message est envoyé avec succès
        echo '<script>alert("Votre message a été envoyé avec succès."); window.location.href = "index.html";</script>';
    } else {
        // Si une erreur s'est produite lors de l'envoi du message
        echo '<script>alert("Une erreur s\'est produite lors de l\'envoi du message."); window.location.href = "index.html";</script>';
    }
    header("Location: index.html");
    exit(); // Assurez-vous de terminer le script après la redirection
}
?>