import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export default functions.https.onRequest(async (req, res) => {
  try {
    const sid = req.path.split('/')[2];
    const strategy = await db.doc(`/strategies/${sid}`).get();
    if (!strategy.exists) {
      res.status(404).send('Not Found');
      return;
    }
    const profile = await strategy.get('profile.ref').get();
    res.set('cache-control', 'public, max-age=3600');
    res.send(html(sid, strategy.get('text'), ''));
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

const html = (sid: string, text: string, image: string) => {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>${text}</title>
  <meta property="og:image" content=${image}>
</head>
<body>
<!--script-->
location.href = '/s/${sid}';
<!--/script-->
</body>
</html>`;
};
