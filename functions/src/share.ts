import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const bucket = admin.storage().bucket();

export default functions.https.onRequest(async (req, res) => {
  try {
    const sid = req.path.split('/')[2];
    const strategy = await db.doc(`/strategies/${sid}`).get();
    if (!strategy.exists) {
      res.status(404).send('Not Found');
      return;
    }
    const profile = await strategy.get('profile.ref').get();
    const [uid] = await strategy
      .get('profile.ref')
      .path.split('/')
      .slice(-1);
    res.set('cache-control', 'public, max-age=3600');
    res.send(
      await generateHTML(
        uid,
        sid,
        profile.get('screenName'),
        strategy.get('text')
      )
    );
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

const generateHTML = async (
  uid: string,
  sid: string,
  screenName: string,
  text: string
) => {
  const image = await bucket
    .file(`users/${uid}/strategies/${sid}`)
    .getSignedUrl({ action: 'read', expires: new Date().getTime() + 3600000 });
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>${text}</title>
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:title" content="${text}">
  <meta property="og:description" content="@${screenName}の さくせん">
  <meta name="twitter:card" content="summary_large_image">
</head>
<body>
<script>
location.href = '/s/${sid}';
</script>
</body>
</html>`;
};
