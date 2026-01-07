import Pusher from 'pusher-js'

// const pusher = new Pusher('896c3ae43a0900cd2944', {
//   cluster: 'ap1',
//   encrypted: true
// })
  
// export default pusher

export default ({ app }, inject) => {
  
    inject('connectToPusher', () => {
        console.log('process.env.PUSHER_APP_KEY',`${process.env.PUSHER_APP_KEY}`)
        window.Pusher = new Pusher(`${process.env.PUSHER_APP_KEY}`, {
            cluster: `${process.env.PUSHER_APP_CLUSTER}`,
            encrypted: true
          })
    });
  };

