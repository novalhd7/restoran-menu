<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMakananTable extends Migration {
    public function up(){
        Schema::create('makanans', function(Blueprint $table){
            $table->id();
            $table->string('nama');
            $table->text('keterangan')->nullable();
            $table->decimal('harga',12,2);
            $table->timestamps();
        });
    }
    public function down(){ Schema::dropIfExists('makanans'); }
}
