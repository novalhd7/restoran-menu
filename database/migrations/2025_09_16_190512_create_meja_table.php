<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMejaTable extends Migration {
    public function up(){
        Schema::create('meja', function(Blueprint $table){
            $table->id();
            $table->string('nama')->nullable();
            $table->integer('nomor')->unique();
            $table->enum('status',['kosong','terisi'])->default('kosong');
            $table->timestamps();
        });
    }
    public function down(){ Schema::dropIfExists('meja'); }
}
