const admin = require('firebase-admin');

const initFirebaseApp = async () => {
  // @ts-ignore -- для buildа, т.к. файла может не быть
  const serviceAccount = require('./serviceAccountKey.json')

  if (!serviceAccount) return;

  const config = {
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  };

  return admin.initializeApp({
    credential: admin.credential.cert(config),
  });
};

// @NOTE: Мемоизируем функцию через библиотеку mem, чтобы не выполнялась переинициализация приложения
module.exports = initFirebaseApp;
