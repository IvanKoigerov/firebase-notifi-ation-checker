const { getMessaging } = require('firebase-admin/messaging')
const getFirebaseApp = require('./index.js');

const pushNotifications = async () => {
  const app = await getFirebaseApp();

  if (!app) {
    console.error('Не удалось инициализировать firebase app');
    return;
  }

  const messaging = getMessaging(app);

  const tokens = ['eGs5Q25LR-e4orK6I5NgP3:APA91bH0s4qGt6nmyM0ys48e5rsV3VPlDinGllQE4kQCVxXetVuy5qpxNXXKqEZOf4v6PRMwt_qE_wJarc2bkJiOOWI42VthOBqfjE_Fe_7w7Jupe2jXZwczzqyergDheOPRuk1ZDEFN'];

  if (!tokens.length) {
    console.error('Нет tokens');
    return;
  }

  await messaging.sendAll(
    tokens.map((row) =>
      ({
        token: row,
        notification: {
          body: 'Notification body',
          title: 'Notification title',
        },
        data: {
          link: 'sut-mobile://today',
          notification_foreground: "true",
          notification_body : "Notification body",
          notification_title: "Notification title",
        },
        android: {
          priority: 'high',
          notification: {
            color: '#075985',
            channelId: 'default',
          },
        },
      }),
    ),
  ).then(() => console.log('Успех!') )
};

pushNotifications();