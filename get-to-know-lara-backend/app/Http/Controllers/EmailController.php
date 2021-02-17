<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailController extends Controller
{
    function inboxEmails(Request $request)
    {
        try {
            $user_id = auth()->user()->id;
            $mail = Mail::where('id_user_to', $user_id)->where('is_read','=', 0)->orderBy('sent','desc')->get();
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
            $mail = Mail::where('id_user_from', $user_id)->orderBy('sent','desc')->get();
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
            $email->id_user_from = auth()->user()->id;
            $email->id_user_to=$request->id_user_to;
            $email->subject=$request->subject;
            $email->message=$request->message;
            $email->save();

            return response()->json([
                'email' => $email,
            ], 200);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(["message:" => "Something went wrong.",
                'iduserTO:' => $email ],400);
        }
    }


    public function removeEmail(Request $request)
    {
        try{
            $user_id = auth()->user()->id;
            $email_id = $request->email_id;
            $delete=Mail::where('id', $email_id)->delete();
            return response()->json([
                'Message:' => 'Email deleted!',
                'email:' => $email_id,
            ], 200);
        } catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    public function allEmails(Request $request){
        try{
            $user_id = auth()->user()->id;
            $mail = Mail::where('id_user_to', $user_id)->orwhere('id_user_from', $user_id)->get();
            return response()->json([
                'mail' => $mail,
                'id' => $user_id
            ], 200);

        }catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    public function unreadEmails(Request $request){
        try{
            $user_id = auth()->user()->id;
            $mail=Mail::where('id_user_to', $user_id)->where('is_read','=', 1)->get();
            return response()->json([
                'mail' => $mail,
            ], 200);

        }catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

    public function updateEmail(Request $request){
        try{
            $user_id = auth()->user()->id;
            $email_id = $request->email_id;
            $mail=Mail::where('id', $email_id)->update(['is_read' =>'1']);
            return response()->json([
                'Message: ' => 'Email updated!',
                'emailid:' => $email_id
            ], 200);

        }catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json(['message' => 'Something went wrong'], 400);
        }
    }

}
