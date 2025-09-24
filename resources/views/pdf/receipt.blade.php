<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Receipt Order #{{ $order->id }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 16px;
            color: #333;
        }
        .receipt {
            max-width: 300px; /* cocok buat thermal printer 80mm */
            margin: auto;
            border: 1px dashed #000;
            padding: 12px;
            background: #fff;
        }
        .header {
            text-align: center;
            border-bottom: 1px dashed #000;
            padding-bottom: 8px;
            margin-bottom: 8px;
        }
        .header h2 {
            margin: 0;
            font-size: 16px;
            letter-spacing: 1px;
        }
        .info {
            margin-bottom: 8px;
            font-size: 11px;
        }
        .info p {
            margin: 2px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }
        th, td {
            padding: 4px;
            font-size: 11px;
        }
        th {
            border-bottom: 1px solid #000;
            text-align: left;
        }
        td:nth-child(2),
        td:nth-child(3),
        td:nth-child(4) {
            text-align: right;
        }
        .total {
            border-top: 1px dashed #000;
            padding-top: 6px;
            text-align: right;
            font-weight: bold;
            font-size: 12px;
        }
        .footer {
            text-align: center;
            margin-top: 10px;
            font-size: 11px;
            border-top: 1px dashed #000;
            padding-top: 6px;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h2>Restoran Kita</h2>
            <small>Jl. Contoh No. 123, Bandung</small>
        </div>

        <div class="info">
            <p>Order #: {{ $order->id }}</p>
            <p>Meja: {{ $order->meja->nomor }}</p>
            <p>Kasir: {{ $order->user->name }}</p>
            <p>Tanggal: {{ $order->created_at->format('d/m/Y H:i') }}</p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>jumlah</th>
                    <th>Harga</th>
                    <th>Sub</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->items as $item)
                    <tr>
                        <td>{{ $item->makanan->nama }}</td>
                        <td>{{ $item->qty }}</td>
                        <td>{{ number_format($item->harga,0,',','.') }}</td>
                        <td>{{ number_format($item->subtotal,0,',','.') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="total">
            Total: Rp {{ number_format($order->total,0,',','.') }}
        </div>

        <div class="footer">
            <p>Terima Kasih 🙏</p>
            <p>Selamat menikmati!</p>
        </div>
    </div>
</body>
</html>
