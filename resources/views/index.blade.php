<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/style.css" >
  <title>育児打</title>
</head>
<body>
  <div class="timer" id="timer">
  </div>
  <div class="typing__container">
    <div class="type-display">
      <p>{{$words->word}}</p>
      <p id="typeDisplay">{{$words->pronunciation}}</p>
    </div>
    <textarea class="type-Input" id="typeInput" autofocus></textarea>
    <p class="info">
      correct: <span id="score">0</span>&emsp;miss: <span id="miss">0</span>
    </p>
    <script src="/js/ikujida.js"></script>
  </div>
</body>
</html>
