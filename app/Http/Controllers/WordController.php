<?php

namespace App\Http\Controllers;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    public function index(Request $request)
    {
    $words=Word::inRandomOrder()->first();
    $param=[
        'words'=>$words
    ];
    return view('/index', $param);
    }


    public function search(Request $request){

        $word=$request->word;
        $pronunciation=$request->pronunciation;
    
        if(!empty($word)){
            $search=Word::where('word', 'like', "%{$word}%")->get();
        }        
        if(!empty($pronunciation)){
            $search=Word::where('pronunciation', 'like', "%{$pronunciation}%")->get();
        }        
        if(!empty($word)&&($pronunciation)){
            $search=Word::where('word', 'like', "%{$word}%")->where('pronunciation',  'like', "%{$pronunciation}%")->get();
        }  
        $param=[
            'search'=>$search
        ];
        return view('/admin', $param);
    }

    public function admin(Request $request)
    {
    return view('/admin');
    }

    public function create(Request $request)
    {
        $word=$request->word;
        $pronunciation=$request->pronunciation;
        $param=[
            'word'=>$word,
            'pronunciation'=>$pronunciation
        ];
        Word::create($param);
        return redirect('/admin')->with('message', '用語を追加しました');
    }
    
    public function update(Request $request)
    {
        $word=$request->word;
        $pronunciation=$request->pronunciation;
        $param = [
            'id' => $request->id,
            'word' => $word,
            'pronunciation' => $pronunciation,
            '_token'=> $request->_token
        ];    
        unset($param['_token']);
        Word::where('id', $request->id)->update($param);
        return redirect('/admin')->with('message', '変更を保存しました');
    }
    
    public function remove(Request $request)
    {
        Word::find($request->id)->delete();
        return redirect('/admin')->with('message', '用語を削除しました');
    }
    
}