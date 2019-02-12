<?php
function cmf_url_encrypt($str){
    $str = base64_encode('encrypt'.$str.'zts');
    return $str;
}
function cmf_url_decrypt($str){
    $str = base64_decode($str);
    return substr($str,7,-3);
}

function cmf_url_encrypt_array($array,$field='id'){
    $_array = [];
    foreach ($array as $val){
        $val[$field] = cmf_url_encrypt($val[$field]);
        $_array[] = $val;
    }
    return $_array;
}
function cmf_url_encrypt_item($array,$field='id'){
    $array[$field] = cmf_url_encrypt($array[$field]);
    return $array;
}

function isSuperManager() {
    $user = \App\Models\User::query()
        ->with(['Roles'])
        ->where('id', \Illuminate\Support\Facades\Auth::id())
        ->first()
        ->toArray()['roles'];
    $roleName = collect($user)->pluck('name')->toArray();
    if (!in_array('超管', $roleName)) { //不是超管
        return true;
    }
    return false;
}