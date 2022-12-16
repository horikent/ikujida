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
}
