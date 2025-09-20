<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Meja extends Model {
    protected $table = 'meja';
    protected $fillable = ['nama','nomor','status'];
    public function orders(){ return $this->hasMany(Order::class); }
}
