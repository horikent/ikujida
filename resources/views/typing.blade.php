<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/style.css" >
  <title>育児打</title>
</head>
<body>
  <div id="ajaxreload">
    <div class="typing__container">
      <p id="count" class="count">60</p>
      <div id="wrap" class="wrap">
        <p>{{$words->word}}</p>
        <span id="typed" class="typed"></span><span id="untyped" class="untyped">{{$words->pronunciation}}</span>
      </div>
        <script src="/js/typing.js"></script>
        <script type="text/javascript" src="/js/typing.js?ver=1.0"></script>
      </div>
    </div>
  </div>
</body>
</html>
