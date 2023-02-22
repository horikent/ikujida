<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/style.css" >
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <div class="ajaxReturn">
      <p>{{$words->word}}</p>
        <span id="typed" class="typed"></span><span id="untyped" class="untyped">{{$words->letter}}</span>
  </div>  
  <script src="/js/typing.js?ver=1.0"></script>
  
</body>
</html>

