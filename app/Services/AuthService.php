<?php
namespace App\Services;
use App\Models\Organisation;
use App\Services\KeyService;
use Exception;

class AuthService{
    public function registration(string $orgName){
        try
        {
            $keyService=new KeyService();
            $isOldOrg=Organisation::where('name',$orgName)->first();
            if($isOldOrg){
                throw new Exception("Организация $orgName уже есть",406);
            }
            $newOrg=new Organisation();
            $newOrg->name=$orgName;
            $newOrg->key=$keyService->createKey($orgName);
            $newOrg->save();

            $orgInfo=Organisation::where('name',$orgName)->first();
            $responce=[
                'name'=>$orgInfo->name,
                'orgId'=>$orgInfo->id,
                'key'=>$orgInfo->key,
            ];
            return json_encode($responce);
        }
        catch(\Exception $e)
        {
            return response()->json([
                'error' => $e->getMessage(),
            ],$e->getCode());
        }
    }
}
