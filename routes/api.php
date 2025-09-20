<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MakananController;
use App\Http\Controllers\API\MejaController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login',[AuthController::class,'login']);

Route::get('/meja',[MejaController::class,'index']);
Route::get('/makanan',[MakananController::class,'index']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);

    Route::apiResource('makanan', MakananController::class)->except(['index','show']);
    Route::get('/makanan/{id}', [MakananController::class,'show']);

    Route::post('/orders/open',[OrderController::class,'open']);
    Route::post('/orders/{order}/items',[OrderController::class,'addItem']);
    Route::post('/orders/{order}/close',[OrderController::class,'close']);
    Route::get('/orders',[OrderController::class,'index']);
    Route::get('/orders/{id}',[OrderController::class,'detail']);
    Route::get('/orders/{id}/receipt',[OrderController::class,'receipt'])
        ->name('orders.receipt'); // ✅ fixed
});

// routes/api.php
Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API works!']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
