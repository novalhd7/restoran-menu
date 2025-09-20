<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration {
    public function up(){
        Schema::create('order_items', function(Blueprint $table){
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('makanan_id')->constrained('makanans')->onDelete('cascade');
            $table->integer('qty')->default(1);
            $table->decimal('harga',12,2); // harga per item saat pemesanan
            $table->decimal('subtotal',12,2);
            $table->timestamps();
        });
    }
    public function down(){ Schema::dropIfExists('order_items'); }
}
