<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php $folder = file_get_contents("php/cache.txt") ?>
    <script type="module"  src="<?php echo $folder ?>/main.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js' integrity='sha512-gmwBmiTVER57N3jYS3LinA9eb8aHrJua5iQD7yqYCKa5x6Jjc7VDVaEA0je0Lu0bP9j7tEjV3+1qUm6loO99Kw==' crossorigin='anonymous' referrerpolicy='no-referrer'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js' integrity='sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==' crossorigin='anonymous' referrerpolicy='no-referrer'></script>
</head>
<body>

    <button class='add' data-add="person">add1</button>
    <button class='add' data-add="person2">add2</button>
    <button class='add' data-add="person3">add3</button>
    <button class='sync' data-sync>sync</button>
    <button class='reset' data-reset>reset</button>
    <button class='break' data-break>break</button>
    
</body>
</html>