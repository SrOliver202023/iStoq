<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
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
        'supplierName' => 'required|string|max:255',
        'email' => 'required|string|max:255',
        'phone'  => 'required|string|max:255',
        'cnpj'  => 'required|string|max:255',
        'address'  => 'required|string|max:255',
        'created_at'  => 'nullable|timestamp',
        'updated_at'  => 'nullable|timestamp',
        ];
    }
}
