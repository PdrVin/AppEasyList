// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyCJZPWBU0wt-OYItqO3XOa_h07PGVJTWf8',
    appId: '1:958666327426:web:3ba3251e5a57117a477b9b',
    messagingSenderId: '958666327426',
    projectId: 'lista-de-compras-2b021',
    authDomain: 'lista-de-compras-2b021.firebaseapp.com',
    storageBucket: 'lista-de-compras-2b021.appspot.com',
    measurementId: 'G-279S70FQF0',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDBN5oT2-szhdwQ-XjjAqU_mfzgsdHDsfU',
    appId: '1:958666327426:android:80271a2fb6884fca477b9b',
    messagingSenderId: '958666327426',
    projectId: 'lista-de-compras-2b021',
    storageBucket: 'lista-de-compras-2b021.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyCD6P6q7gnmDk8Tf607YX47JiT7efhwlps',
    appId: '1:958666327426:ios:541e55f28f0f77c0477b9b',
    messagingSenderId: '958666327426',
    projectId: 'lista-de-compras-2b021',
    storageBucket: 'lista-de-compras-2b021.appspot.com',
    iosClientId:
        '958666327426-poaasn97uam9pnr4p0dcn903phhi49s3.apps.googleusercontent.com',
    iosBundleId: 'com.example.shoppinglistapp',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyCD6P6q7gnmDk8Tf607YX47JiT7efhwlps',
    appId: '1:958666327426:ios:541e55f28f0f77c0477b9b',
    messagingSenderId: '958666327426',
    projectId: 'lista-de-compras-2b021',
    storageBucket: 'lista-de-compras-2b021.appspot.com',
    iosClientId:
        '958666327426-poaasn97uam9pnr4p0dcn903phhi49s3.apps.googleusercontent.com',
    iosBundleId: 'com.example.shoppinglistapp',
  );
}
