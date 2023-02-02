<?php

namespace App\Http\Controllers;

use App\Services\KeyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ScriptController extends Controller
{
    public function getWidgetScript(string $org_id,string $org_key){
        $keyService=new KeyService();
        $isValidConnectionData=$keyService->validateConnectionData($org_id,$org_key);
        if($isValidConnectionData){
            $path=public_path('build/assets/app-0deab73f.js');
            $storageKey ="sessionStorage.setItem('debtorsTableKey','$org_key');";
            $fileData = file_get_contents($path);
            $newFileData=$storageKey.$fileData;
            $headers=[
                'Content-Type'=>'application/javascript'
            ];
            return response($newFileData,200,$headers);
        } else {
            return response()->json([
                'error' => 'Ошибка подключения:проверьте правильность введенного id организации и ключа доступа',
            ],404);
        }
    }

    public function getWidgetStyles(string $org_id,string $org_key){
        $keyService=new KeyService();
        $isValidConnectionData=$keyService->validateConnectionData($org_id,$org_key);
        if($isValidConnectionData){
            $path=public_path('css/debtorsTable.css');
            $headers=[
                'Content-Type'=>'text/css'
            ];
            return response()->file($path,$headers);
        } else {
            return response()->json([
                'error' => 'Ошибка подключения:проверьте правильность введенного id организации и ключа доступа',
            ],404);
        }
    }
}
