<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Meja;
use App\Models\Makanan;
use PDF; // from barryvdh/laravel-dompdf

class OrderController extends Controller {
    public function index(){ // list semua
        return Order::with('meja','items.makanan','user')->get();
    }

    public function open(Request $r){ // buka order di meja kosong
        $r->validate(['meja_id'=>'required|exists:meja,id']);

        // cek apakah sudah ada order open di meja ini
        $existing = Order::where('meja_id', $r->meja_id)
                         ->where('status','open')
                         ->exists();
        if ($existing) {
            return response()->json(['message'=>'Masih ada order open di meja ini'],422);
        }

        $meja = Meja::findOrFail($r->meja_id);
        if ($meja->status == 'terisi') {
            return response()->json(['message'=>'Meja sudah terisi'],422);
        }

        $order = Order::create([
            'meja_id'=>$meja->id,
            'user_id'=> $r->user()->id,
            'status'=>'open',
            'total'=>0
        ]);

        $meja->update(['status'=>'terisi']);
        return response()->json($order,201);
    }

    public function addItem(Request $r, $orderId){
        $r->validate(['makanan_id'=>'required','qty'=>'required|integer|min:1']);
        $order = Order::findOrFail($orderId);
        if($order->status != 'open') return response()->json(['message'=>'Order sudah tutup'],422);

        $m = Makanan::findOrFail($r->makanan_id);
        $subtotal = $m->harga * $r->qty;
        $item = OrderItem::create([
            'order_id'=>$order->id,
            'makanan_id'=>$m->id,
            'qty'=>$r->qty,
            'harga'=>$m->harga,
            'subtotal'=>$subtotal
        ]);
        // update total
        $order->total = $order->items()->sum('subtotal');
        $order->save();
        return response()->json($item,201);
    }

    public function detail($id){
        return Order::with('items.makanan','meja','user')->findOrFail($id);
    }

    public function close(Request $r, $id){
        $order = Order::findOrFail($id);
        if($order->status == 'closed') return response()->json(['message'=>'sudah closed'],422);
        $order->status = 'closed';
        $order->save();

        // set meja kosong
        $meja = $order->meja;
        $meja->status = 'kosong';
        $meja->save();

        return response()->json($order);
    }

    public function receipt($id){ // generate PDF simple
        $order = Order::with('items.makanan','meja','user')->findOrFail($id);
        $data = ['order'=>$order];
        $pdf = PDF::loadView('pdf.receipt',$data);
        return $pdf->download("receipt_order_{$order->id}.pdf");
    }
}
