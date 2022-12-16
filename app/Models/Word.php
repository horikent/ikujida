<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    protected $guarded =[
        'id'
    ];
    protected $fillable =[
        'word', 'pronunciation', 'created_at', 'updated_at', 'shop_id', 'user_id'
    ];
}
