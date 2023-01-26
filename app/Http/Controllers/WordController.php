<?php

namespace App\Http\Controllers;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    public function index(Request $request)
    {
    return view('/index');
    }


    public function typing(Request $request)
    {
    $words=Word::inRandomOrder()->first();
    $param=[
        'words'=>$words
    ];
    return view('/typing', $param);
    }


    public function ajax(Request $request)
    {
    $words=Word::inRandomOrder()->first();
    $param=[
        'words'=>$words
    ];
    return view('/ajax', $param);
    }

    public function frametarget(Request $request)
    {
    $words=Word::inRandomOrder()->first();
    $param=[
        'words'=>$words
    ];
    return view('/typing', $param);
    }

    public function search(Request $request){

        $word=$request->word;
        $letter=$request->letter;
    
        if(!empty($word)){
            $search=Word::where('word', 'like', "%{$word}%")->get();
        }        
        if(!empty($letter)){
            $search=Word::where('letter', 'like', "%{$letter}%")->get();
        }        
        if(!empty($word)&&($letter)){
            $search=Word::where('word', 'like', "%{$word}%")->where('letter',  'like', "%{$letter}%")->get();
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
        $letter=$request->letter;
        $param=[
            'word'=>$word,
            'letter'=>$letter
        ];
        Word::create($param);
        return redirect('/admin')->with('message', '用語を追加しました');
    }
    

    public function update(Request $request)
    {
        $word=$request->word;
        $letter=$request->letter;
        $param = [
            'id' => $request->id,
            'word' => $word,
            'letter' => $letter,
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