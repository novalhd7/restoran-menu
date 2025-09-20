<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration {
    public function up(){
        Schema::create('orders', function(Blueprint $table){
            $table->id();
            $table->foreignId('meja_id')->constrained('meja')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // pembuat
            $table->enum('status',['open','closed'])->default('open');
            $table->decimal('total',12,2)->default(0);
            $table->timestamps();
        });
    }
    public function down(){ Schema::dropIfExists('orders'); }
}
