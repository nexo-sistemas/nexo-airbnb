<?php

namespace App\Exceptions;

use Dotenv\Exception\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (QueryException $e, $request) {
            return response()->json([
                'ok' => false,
                'errors' => ['Server Error'],
                'details' => $e->getMessage()
            ], 500);
        });

        $this->renderable(function (ValidationException $e, $request) {
            $error = [];
            foreach ($e->errors() as $field => $messages) {
                foreach ($messages as $message) {
                    $error[] = $message;
                }

            }

            return response()->json([
                'ok' => false,
                'errors' => $error,
            ], 422);

        });
    }
}
