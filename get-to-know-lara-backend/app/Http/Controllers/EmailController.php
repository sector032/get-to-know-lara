<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailController extends Controller
{
    function inboxEmails(Request $request){
        try{
            $user_id=auth()->user()->id;
            $mail = Mail::where('id_user_to',$user_id)->get();
            return response()->json([
                'mail'=>$mail,
                'id'=> $user_id
            ],200);
        } catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    function sentEmails(Request $request){
        try{
            $user_id=auth()->user()->id;
            $mail= Mail::where('id_user_from',$user_id)->get();
            return response()->json([
               'mail'=>$mail,
                'id'=>$user_id
            ],200);
        } catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }
}
