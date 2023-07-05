<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'supplierName',
        'email',
        'phone',
        'cnpj',
        'address',
        'userId'
    ];

    use HasFactory;
}
