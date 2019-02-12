<?php

namespace App\Console;

use App\Models\Url;
use App\Services\WeXinCheck\WeChatService;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
        $schedule->call(function () { //每小时执行域名检测
            $service = new WeChatService();
            $service->getAccessToken();
            Url::query()
                ->where('status', 0)
                ->get()
                ->pluck('url')
                ->map(function($url) use($service) {
                    $result = $service->check($url);
                    if ($result != 1) {
                        $urlModel = Url::query()
                            ->where('url', $url)
                            ->first();
                        //先补位
                        $userId = $urlModel->user_id;
                        $type = $urlModel->type;
                        if ($type == Url::A_URL) { //补足一条A连接
                            Url::query()
                                ->where('user_id', $userId)
                                ->where('type', Url::A_URL)
                                ->where('status', 1)
                                ->inRandomOrder()
                                ->update([
                                    'status' => 0,
                                ]);
                        }

                        if ($type == Url::B_URL) { //补足一条B连接
                            Url::query()
                                ->where('user_id', $userId)
                                ->where('type', Url::B_URL)
                                ->where('status', 1)
                                ->inRandomOrder()
                                ->update([
                                    'status' => 0,
                                ]);
                        }
                        //移除这个连接
                        $urlModel->delete();
                    }
                });

        })->hourly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
