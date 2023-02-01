<?php

namespace App\Services;

use App\Models\Organisation;
use function PHPUnit\Framework\isEmpty;

class KeyService {
   public function createKey($orgName){
       $key=hash('sha256',$orgName).'.'.time();
       return $key;
   }

   public function validateConnectionData(string $org_id,string $org_key){
       $data=Organisation::where([
           ['id',$org_id],
           ['key',$org_key]
       ])->first();
       if($data){
           return true;
       } else {
           return false;
       }
   }

   public function validateKey(string $key){
        $data=Organisation::where('key',$key)->first();
        if($data){
            return true;
        } else {
            return false;
        }
   }
}
