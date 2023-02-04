<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/style.css" >
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet"> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <title>育児打</title>
</head>
<body style="background: url(/img/wall3.jpg);">
  <div class="typing__container">
    <p id="count">60</p>
    <div id="wrap" class="wrap">
      <div id="ajaxreload">
        <p>{{$words->word}}</p>
          <span id="typed"></span><span id="untyped">{{$words->letter}}</span>
      </div>
    </div>
  </div>
  <script  src="/js/typing.js?ver=1.0"></script>
</body>
</html>
