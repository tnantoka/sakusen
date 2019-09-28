import * as admin from 'firebase-admin';
import 'firebase-functions'; // tslint-disable-line no-import-side-effect
admin.initializeApp();

export { default as share } from './share';
