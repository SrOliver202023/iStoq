<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('productName');
            $table->string('externalCode')->nullable();
            $table->string('description');
            $table->float('price');
            $table->integer('quantity');
            $table->string('imageUrl')->nullable();
            $table->bigInteger('supplierId')->unsigned();
            $table->foreign('supplierId')->references('id')->on('suppliers')->onDelete('cascade');
            // $table->bigInteger('userId')->unsigned();
            // $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('products');
        Schema::table('products', function (Blueprint $table) {
            $table->integer('imageUrl')->nullable(false);
            $table->integer('externalCode')->nullable(false);
        });
    }
};
