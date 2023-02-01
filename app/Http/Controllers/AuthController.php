<?php

namespace App\Http\Controllers;
use App\Services\AuthService;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function registration(Request $request){
        $body=json_decode($request->getContent(),true);
        $orgName=$body['name'];
        $authService=new AuthService();
        $newOrg=$authService->registration($orgName);
        return $newOrg;
    }
}
