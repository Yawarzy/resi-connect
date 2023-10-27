<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Login for Tenant
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // check if user is tenant
        $user = User::where('email', $request->email)->first();
        if (!$user || $user->role_id != 2) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials',
            ], 401);
        }

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;

            // get tenant from

            return response()->json([
                'status' => 'success',
                'token' => $token,
                // send user with tenant relationship
                'user' => $user,
                'tenant' => $user->tenant()->get()->except(['created_at', 'updated_at', 'unsigned_contract', 'upload_contract_slug', 'status'])
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Invalid credentials',
        ], 401);
    }

    /**
     * Logout for Tenant
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        if (request()->user()->currentAccessToken()->delete()) {
            return response()->json([
                'message' => 'Logged out',
            ]);
        } else {
            return response()->json([
                'message' => 'Something went wrong',
            ]);
        }
    }

    /**
     * Is Tenant Authenticated
     */
    public function isAuthenticated()
    {
        if (auth('sanctum')->check()) {
            return response()->json([
                'status' => 'authenticated',
                'user' => auth('sanctum')->user(),
                'tenant' => auth('sanctum')->user()->tenant()->get()->except(['created_at', 'updated_at', 'unsigned_contract', 'upload_contract_slug', 'status'])->first()
            ]);
        } else {
            return response()->json([
                'status' => 'not authenticated',
            ]);
        }
    }
}
