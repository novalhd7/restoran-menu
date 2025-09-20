<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function login(Request $req){
        $req->validate(['email'=>'required|email','password'=>'required']);
        $user = User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password)){
            return response()->json(['message'=>'credential salah'],401);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json(['user'=>$user,'token'=>$token]);
    }

    public function logout(Request $req){
        $req->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'logged out']);
    }
}
