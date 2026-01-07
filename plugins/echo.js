import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default ({ app }, inject) => {
  window.Pusher = Pusher;

  inject('connectToPusher', () => {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.VITE_PUSHER_APP_KEY,
      wsHost: process.env.VITE_PUSHER_HOST ?? `ws-${process.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
      wsPort: process.env.VITE_PUSHER_PORT ?? 80,
    //   wssPort: process.env.VITE_PUSHER_PORT ?? 443,
    //   forceTLS: (process.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
      forceTLS: false,
      disabaleStats:true
    //   enabledTransports: ['ws', 'wss'],
    });
  });
};