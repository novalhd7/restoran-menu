<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Makanan;

class MakananController extends Controller {
    public function index(){ return Makanan::all(); }
    public function store(Request $r){
        $r->validate(['nama'=>'required','harga'=>'required|numeric']);
        $m = Makanan::create($r->only('nama','keterangan','harga'));
        return response()->json($m,201);
    }
    public function show($id){ return Makanan::findOrFail($id); }
    public function update(Request $r,$id){
        $m = Makanan::findOrFail($id);
        $m->update($r->only('nama','keterangan','harga'));
        return response()->json($m);
    }
    public function destroy($id){
        Makanan::findOrFail($id)->delete();
        return response()->json(['message'=>'deleted']);
    }
}
