<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            // 'message' => $request->session()->get('message'),
            'message' => collect(Arr::only($request->session()->all(), ['success', 'error']))
                ->mapWithKeys(function ($value, $key) {
                    return [
                        'type' => $key,
                        'body' => $value,
                    ];
                }),
            'can_create_post' => [
                'create_post' => $user && $user->can('create', Post::class)
            ]
        ];
    }
}
