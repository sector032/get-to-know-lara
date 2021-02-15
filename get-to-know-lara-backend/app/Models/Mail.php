<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    use HasFactory;
    public $timestamps = false;


    protected $mails = [
        'subject',
        'message',
        'is_read',
        'id_user_from',
        'id_user_to',
        'sent',
        'created',
    ];




}
