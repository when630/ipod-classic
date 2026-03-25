# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

iPod Classic 모양의 음악 플레이어 모바일 앱. React Native (Expo SDK 55) + TypeScript로 iOS/Android 동시 타겟.
실제 iPod Classic의 클릭휠 제스처, 계층형 메뉴, Now Playing, Cover Flow, 테마 전환 등 풀 경험을 구현.

## Commands

```bash
# 개발 서버 시작 (웹 프리뷰)
npx expo start --web

# 플랫폼별 실행
npx expo start --ios
npx expo start --android

# TypeScript 타입 체크
npx tsc --noEmit

# 빌드 체크 (번들링 테스트)
npx expo export --platform web --output-dir /tmp/build-check

# 의존성 설치 (Expo 호환 버전 자동 선택)
npx expo install <package-name>
```

## Architecture

### Layer Model
앱은 **하드웨어 레이어**(iPod 외관)와 **소프트웨어 레이어**(LCD 안 UI)로 분리.

- **Hardware layer** (`src/components/hardware/`): iPod 외관 — `IPodShell`(메탈릭 바디), `LCDScreen`(화면 영역), `ClickWheel`(휠 비주얼), `ClickWheelGesture`(투명 제스처 오버레이)
- **Software layer** (`src/components/screens/`, `src/components/ui/`): LCD 안에 렌더링되는 화면들

제스처는 하드웨어 레이어에서 캡처 → semantic WheelEvent로 변환 → IPodApp이 현재 화면 컨텍스트에 따라 dispatch.

### Click Wheel Gesture System
`ClickWheelGesture.tsx`가 핵심. `react-native-gesture-handler` Pan + Tap + LongPress를 `react-native-reanimated` worklet에서 처리.

- **원형 스크롤**: `atan2` 각도 계산 → delta 누적 → 임계값(30도) 초과 시 scroll tick 발생
- **탭 영역**: center(select), 4방향(menu/forward/play_pause/back)
- **길게 누르기**: menu(popToRoot)
- 각도 계산 유틸: `src/utils/angle.ts` (worklet-compatible)

### Navigation
React Navigation 대신 **커스텀 스택** (`src/navigation/`). iPod의 단일 LCD + 좌우 슬라이드 전환 모델.

- `NavigationContext`: push/pop/popToRoot + selectedIndex 관리
- `NavigationStack`: Animated 슬라이드 전환 + 라우트별 화면 렌더링
- `menuTree`: 메뉴 아이템 ID → Route 매핑 (정적 + 동적)
- 라우트별 동작: `IPodApp.tsx`의 handleTap에서 현재 route에 따라 분기 (Songs→재생, CoverFlow→앨범, Settings→토글, ThemeSelect→테마 적용)

### State Management
- **Zustand** (`src/stores/`): `usePlayerStore`(재생 상태, 큐, 셔플/반복), `useLibraryStore`(음악 라이브러리 캐시)
- **React Context**: `NavigationContext`(스택 네비게이션), `ThemeContext`(테마)

### Data Layer (Music Service)
`src/services/music/types.ts`에 MusicService 인터페이스 정의, `MockMusicService`가 구현.
모킹 데이터: `src/data/mockData.ts` (10 아티스트, 21 앨범, 91곡).
나중에 Spotify/Apple Music 등으로 교체 가능.

### Audio
`src/services/audio/AudioService.ts` — 현재 `SimulatedAudioService` (타이머 기반 시뮬레이션).
`usePlayerStore`가 AudioService를 호출, status callback으로 상태 업데이트. 실제 오디오는 `WebAudioService`(HTML5 Audio) 또는 `expo-audio`(네이티브)로 교체 가능.

### Screens
- **MenuScreen**: 범용 메뉴 리스트 (Main, Music, Settings, Artists, Albums, Songs, ThemeSelect)
- **NowPlayingScreen**: 트랙 정보 + 프로그레스바 + 볼륨바 (스크롤=볼륨)
- **CoverFlowScreen**: 3D perspective 앨범 캐러셀
- **AboutScreen**: 기기 정보

## Key Conventions

- Path alias: `@/` → `src/` (babel-plugin-module-resolver + tsconfig paths)
- `src/app/`은 사용 금지 — Expo Router가 자동 감지하므로 `src/core/`에 앱 루트 배치
- 테마: `src/theme/colors.ts`에 4가지 iPod 테마 정의, `ThemeContext`로 런타임 전환
- 치수: `src/theme/dimensions.ts`에 iPod/LCD/Wheel 크기 상수 집중 관리
- 웹 프리뷰: Skia 대신 일반 RN View로 렌더링, haptics는 웹에서 no-op
- Worklet 함수에는 `'worklet';` 지시자 필수 (reanimated UI thread 실행용)
