<?php

use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Mail;
use App\Http\Controllers\RegController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::resource('registration', RegController::class);
Route::post('login', [RegController::class, 'login'])->name('auth.login');

Route::post('registration',[RegController::class, 'registration']);


//Route::middleware('auth:sanctum')->get('/mail/inbox', [EmailController::class, 'inboxEmails']);
//Route::middleware('auth:sanctum')->get('/mail/sent', [EmailController::class, 'sentEmails']);
//Route::middleware('auth:sanctum')->get('/mail/send', [EmailController::class, 'sendingEmail']);


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/mail/inbox',[EmailController::class, 'inboxEmails']);
    Route::get('/mail/sent',[EmailController::class, 'sentEmails']);
    Route::post('/mail/send',[EmailController::class, 'sendingEmail']);
    Route::post('/mail/delete',[EmailController::class, 'removeEmail']);
    Route::get('/mail/all',[EmailController::class, 'allEmails']);
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = auth()->user();
    return response()->json([
        'message' => 'ok',
        'user' => $user
    ], 200);
});

