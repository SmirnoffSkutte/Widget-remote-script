<?php

namespace App\Http\Middleware;

use App\Services\KeyService;
use Closure;
use Illuminate\Http\Request;

class authedOrganisation
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $keyService=new KeyService();
            $key=$request->bearerToken();
            if ($key===null or trim($key)==='') {
                throw new \Exception('Нет ключа',401);
            }
            $isValid=$keyService->validateKey($key);
            if($isValid===false){
                throw new \Exception('Ключ невалиден',401);
            }
            return $next($request);
        }
        catch (\Exception $exception){
            return response()->json([
                'error' => $exception->getMessage(),
            ],$exception->getCode());
        }
    }
}
