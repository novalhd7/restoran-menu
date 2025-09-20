<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model {
    protected $fillable = ['order_id','makanan_id','qty','harga','subtotal'];
    public function makanan(){ return $this->belongsTo(Makanan::class); }
}
