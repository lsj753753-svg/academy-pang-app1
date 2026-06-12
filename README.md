# 🫧 버블 팡 - APK 변환 가이드

## 📁 파일 구조

```
bubble-pang-apk/
│
├── www/
│   └── index.html              ← 게임 파일 (메인)
│
├── android-config/
│   ├── AndroidManifest.xml     ← Android 앱 설정
│   ├── build.gradle            ← 빌드 설정
│   ├── MainActivity.java       ← 메인 액티비티
│   ├── strings.xml             ← 앱 이름 등 문자열
│   └── styles.xml              ← 전체화면 테마
│
├── icons/                      ← 아이콘 생성 후 생성됨
│   ├── mipmap-mdpi/
│   ├── mipmap-hdpi/
│   ├── mipmap-xhdpi/
│   ├── mipmap-xxhdpi/
│   └── mipmap-xxxhdpi/
│
├── scripts/
│   ├── generate_icons.py       ← 아이콘 자동 생성
│   ├── build.sh                ← 빌드 스크립트 (Mac/Linux)
│   └── build.bat               ← 빌드 스크립트 (Windows)
│
├── package.json                ← NPM 패키지 설정
└── capacitor.config.ts         ← Capacitor 설정
```

---

## 🛠️ 사전 설치 필요 항목

| 도구 | 버전 | 다운로드 |
|------|------|----------|
| **Node.js** | 18 이상 | https://nodejs.org |
| **Java JDK** | 17 이상 | https://adoptium.net |
| **Android Studio** | 최신 | https://developer.android.com/studio |

> Android Studio 설치 시 **Android SDK**가 자동으로 함께 설치됩니다.

---

## 🚀 빌드 단계

### 1단계 - 아이콘 생성

```bash
# Pillow 설치
pip install pillow

# 아이콘 생성
python3 scripts/generate_icons.py
```

### 2단계 - APK 빌드

**Mac / Linux:**
```bash
chmod +x scripts/build.sh
./scripts/build.sh
```

**Windows:**
```
scripts\build.bat
```

### 2단계 (수동 빌드 방식)

```bash
# 패키지 설치
npm install

# Android 플랫폼 추가
npx cap add android

# 파일 동기화
npx cap sync android

# Android Studio로 열기
npx cap open android
```

Android Studio에서 `Build → Build Bundle(s) / APK(s) → Build APK(s)` 클릭

---

## 📱 완성된 APK 위치

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## ⚙️ 앱 정보 변경 방법

| 항목 | 파일 | 수정 위치 |
|------|------|-----------|
| 앱 이름 | `android-config/strings.xml` | `app_name` |
| 패키지 ID | `capacitor.config.ts` | `appId` |
| 버전 | `android-config/build.gradle` | `versionName` |
| 아이콘 | `scripts/generate_icons.py` | 이미지 로직 수정 |

---

## ❓ 자주 발생하는 오류

### `ANDROID_HOME` 환경변수 없음
```bash
# Mac/Linux
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### `SDK not found`
Android Studio → SDK Manager → Android SDK 설치 확인

### Java 버전 오류
JDK 17 이상 설치 후 `java -version` 확인

---

## 🔐 릴리즈(서명) APK 만들기

Play Store 배포용 서명 APK가 필요한 경우:

```bash
# 키스토어 생성
keytool -genkey -v -keystore bubble-pang.keystore \
  -alias bubblepang -keyalg RSA -keysize 2048 -validity 10000

# android/app/build.gradle 에 signingConfigs 추가 후
cd android && ./gradlew assembleRelease
```

---

## 📞 테스트 방법

1. Android 기기에서 **개발자 옵션 → USB 디버깅** 활성화
2. USB 연결 후:
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```
