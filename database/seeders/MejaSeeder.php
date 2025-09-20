<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Meja;

class MejaSeeder extends Seeder {
    public function run(){
        for($i=1;$i<=10;$i++){
            Meja::create(['nomor'=>$i,'nama'=>"Meja $i",'status'=>'kosong']);
        }
    }
}
