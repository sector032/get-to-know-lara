<?php

use Illuminate\Http\Request;
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
Route::post('login',[RegController::class, 'login']);
Route::post('registration',[RegController::class, 'registration']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
