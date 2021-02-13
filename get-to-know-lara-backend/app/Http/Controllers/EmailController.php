<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailController extends Controller
{
    function inboxEmails(Request $request)
    {
        try {
            $user_id = auth()->user()->id;
            $mail = Mail::where('id_user_to', $user_id)->get();
            return response()->json([
                'mail' => $mail,
                'id' => $user_id,
            ], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    function sentEmails(Request $request)
    {
        try {
            $user_id = auth()->user()->id;
            $mail = Mail::where('id_user_from', $user_id)->get();
            return response()->json([
                'mail' => $mail,
                'id' => $user_id
            ], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    function sendingEmail(Request $request)
    {
        try {
            $email = new Mail();
            $email->id = auth()->user()->id;
            $email->id_user_to=$request->id_user_to;
            $email->subject=$request->subject;
            $email->message=$request->message;
            $email->save();

            return response()->json([
                'email' => $email
            ], 200);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(["message:" => "Something went wrong."], 400);
        }
    }


    public function removeEmail(Request $request)
    {
        try{
            $user_id = auth()->user()->id;
            $email_id = $request->email_id;
            $delete=Mail::where('id', $email_id)->where('id_user_to',$user_id)->delete();
            return response()->json([
                'Message:' => 'Email deleted!',
                'userid'=> $user_id,
                'mailid'=> $email_id
            ], 200);
        } catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }
}
