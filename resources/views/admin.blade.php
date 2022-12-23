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
  <div class="container">
    <h1>管理画面</h1>
      @if(session('message'))
          {{session('message')}}
      @endif
    <div class="admin__container">
      <h2>用語追加</h2>
      <form action="/add" method="post">
        @csrf
          <input type="text" class="add__word" name="word" placeholder="word">
          <input type="text" class="add__word" name="pronunciation" placeholder="pronunciation">
          <input class="admin__button" type="submit" value="登録">
      </form>
      <form action="/search"  method="post">
        @csrf  
        <h2>用語検索</h2>
        <input type="text" class="search__word" name="word" placeholder="word">
        <input type="text" class="search__word" name="pronunciation" placeholder="pronunciation">
        <input  class="admin__button" type="submit" value="検索">
      </form> 
    </div>
    <div class="search__container">
      <table class="search__table">     
        <tr>
          <div>
            <th>Word</th>
            <th>Pronunciation</th>
            <th>更新</th>
            <th>削除</th>
          </div>     
        </tr>
        <ul>
          @if(@isset($search))
            <div class="admin__search">
              @foreach ($search as $word)   
              <tr> 
              <form action="/edit" method="POST">
                @csrf   
                <td>
                  <input type="text"  class="table__word" name="word" value=" {{$word->word}}" size="20">                   
                </td>          
                <td>
                  <input type="text"  class="table__word" name="pronunciation" value=" {{$word->pronunciation}}" size="20">   
                </td> 
                <td>
                  <input type="hidden" name="id" value="{{$word->id}}">  
                  <input type="hidden" name="_token" value="{{csrf_token()}}">
                  <button type="submit">更新</button> 
                </td> 
              </form>    
              <form action="/delete" method="POST">
                @csrf          
                  <td>          
                    <input type="hidden" name="id" value="{{$word->id}}">            
                      <button type="submit">削除</button> 
                  </td>
              </form>  
              </tr>     
            @endforeach
            </div> 
          @endif
        </ul>
      </table> 
    </div>
  </div>  
  <script src="/js/ikujida.js"></script>
</body>
</html>
