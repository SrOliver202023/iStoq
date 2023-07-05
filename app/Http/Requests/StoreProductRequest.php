<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
        //
        'productName' => 'required|string|max:255',
        'externalCode' => 'nullable|string|max:255',
        'description' => 'nullable|string|max:255',
        'price' => 'required|numeric',
        'quantity' => 'required|numeric',
        'imageUrl' => 'nullable|string|max:255',
        'supplierId' => 'required|integer',
        'created_at'  => 'nullable|timestamp',
        'updated_at'  => 'nullable|timestamp',
        // 'userId' => 'required|integer',
        ];
    }
}
