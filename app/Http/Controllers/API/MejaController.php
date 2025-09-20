<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Meja;

class MejaController extends Controller {
    public function index(){
        return Meja::with(['orders' => function($q){
            $q->where('status','open');
        }])->get();
    }
}
