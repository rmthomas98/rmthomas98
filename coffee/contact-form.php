<?php

    $first = $_POST['first'];
    $last = $_POST['last'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];

    $email_from = 'CoffeeDepotFeedback@urbanadepot.com';

    $email_subject = "Customer Feedback";

    $email_body = "First Name: $first.\n"
                    "Last Name: $last.\n"
                    "Email: $email.\n"
                    "Comments: $comment.\n";
                
    $to = "rmthomas1998@gmail.com"

    $headers = "From: $email_from \r\n";

    $headers .= "Reply-To: $email \r\n";
    
    mail($to,$email_subject,$email_body,$headers);

    header("Location: index.html"); 

    if (mail($to,$email_subject,$email_body,$headers)) {
        $success = "Message sent, thank you for contacting us!";
    }


?>