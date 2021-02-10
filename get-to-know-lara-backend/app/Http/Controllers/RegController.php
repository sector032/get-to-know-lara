<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

//A CONTROLLERBEN MONDOM MEG, HOGY MI TÖRTÉNJEN AZ APIBÓL BEJÖVŐ REQUESTEL, A REQUEST TARTALMA EGY
//JSON FILE, AMIT A FRONTEND KÜLD EL FIELDEKBŐL STB.

class RegController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return User[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Http\Response
     */
    public function index()
    {
        // kilistázza a usereket
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registration(Request $request)
    {
        // regisztrál usert
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        $userData = $request->all();
        $userData['password'] = Hash::make($userData['password']);

        return User::create($userData);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // megmutat egy usert
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // updatel egy usert, de ezt csak login utan lehessen csak
//        return User::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return int
     */
    public function destroy($id)
    {
        // töröl egy usert, de ezt csak login utan lehessen csak
        return User::destroy($id);
    }

    public function login(Request $request){
        $data=[
            'email' => $request->email,
            'password' => $request->password
        ];

        if(auth()->attempt($data)){
            $token = auth()->user()->createToken('LaravelAuthApp')->plainTextToken;
            return response()->json([
                'token'=> $token,
                'user'=>auth()->user(),
            'message' => 'Hi'], 200);
        }else{
            return response()->json(['message'=> 'Not valiable login!'], 401);
        }
    }
}
