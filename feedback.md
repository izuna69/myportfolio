# 포트폴리오 구현 피드백 및 개발 계획

`docks/todo.md`의 내용을 바탕으로 정리한 React 기반 구현 계획 및 제안사항입니다.

## 1. 프로젝트 개요 (Summary)

- **주제**: 개인 포트폴리오 웹사이트
- **테마**: 다크 모드 (Black Theme)
- **기술 스택**: React, Tailwind CSS, Vite
- **배포/관리**: Git, GitHub

## 2. 상세 구현 계획 (Implementation Details)

### A. 레이아웃 구조 (Layout)

- **전체 구조**: 2열 레이아웃 (Split Screen)
  - **Left Sidebar (고정/Sticky 추천)**:
    - 너비: 약 250px ~ 300px
    - 내용: 프로필 및 개인 스탯 정보
  - **Right Content Area**:
    - 내용: 프로젝트 리스트 (Grid Layout)
- **반응형 (Mobile/Tablet)**:
  - 모바일에서는 1열로 변경 (Sidebar가 상단으로 가거나, 햄버거 메뉴로 숨김 처리 고려 필요)

### B. 컴포넌트 설계 (Component Hierarchy)

```text
App
├── Layout (전체 컨테이너 - flex/grid, dark theme bg)
│   ├── ProfileSidebar (Left)
│   │   ├── ProfileHeader (이미지, 이름, 직업)
│   │   ├── InfoList (거주지, 나이 등)
│   │   ├── LanguageSkills (Echarts - 원형 차트)
│   │   ├── TechStackSkills (Echarts - 가로 막대 차트)
│   │   ├── SkillTags (사용 가능 툴 - Badge 형태)
│   │   └── SocialLinks (GitHub, LinkedIn 등 아이콘)
│   │
│   └── ProjectSection (Right)
│       └── ProjectGrid (2열 그리드)
│           └── ProjectCard (개별 프로젝트)
│               ├── ProjectImage
│               ├── ProjectInfo (제목, 설명)
│               └── ProjectLinks (데모, 코드)
```

### C. 주요 기능 및 라이브러리 추천

1.  **차트 (Charts)**

    - `echarts-for-react`: `todo.md`에서 언급된 echarts를 리액트에서 쉽게 쓰기 위해 사용.
    - 언어 능력 (Circle/Pie Chart), 기술 스택 (Bar Chart) 구현.

2.  **스타일링 (Tailwind CSS)**

    - 다크 테마: `bg-slate-900` or `bg-black`, `text-white` 기반.
    - 카드 디자인: `bg-gray-800`, `rounded-lg`, `shadow-md`.
    - Grid: `grid-cols-1 md:grid-cols-2` (오른쪽 프로젝트 영역).

3.  **아이콘 (Icons)**
    - `react-icons`: 소셜 미디어 및 기술 스택 아이콘 사용 (예: `FaGithub`, `FaReact`).

## 3. 피드백 및 제안 (Feedback)

1.  **데이터 관리 방안**:

    - 내용이 자주 바뀔 수 있으므로, 하드코딩보다는 `data.js` 또는 `constants.ts` 파일에 객체 배열 형태로 데이터를 분리하여 관리하는 것을 추천합니다. (유지보수 용이)
    - 예: `PROFILE_DATA`, `PROJECT_LIST` 상수 정의.

2.  **이미지 처리**:

    - 프로필 사진과 프로젝트 스크린샷은 `public/images` 또는 `src/assets` 폴더에 잘 정리해두어야 합니다.

3.  **추가 고려사항**:

    - **다국어 지원?**: 언어 능력에 'Korean', 'Japanese'가 있는 것으로 보아, 추후 사이트 자체의 다국어 지원(i18n)을 고려할 수도 있습니다.
    - **애니메이션**: `framer-motion`을 사용하여 등장 애니메이션을 넣으면 퀄리티가 높아집니다.

4.  **인터랙션 강화 (Interaction)**:
    - **프로젝트 카드 호버 효과**: 사용자가 커서를 카드에 올렸을 때(Hover), 카드가 부드럽게 확대(Scale Up)되면서 페이드인(Fade In) 되는 효과를 적용합니다.
    - 예: `hover:scale-105`, `hover:opacity-100` (기본 상태를 약간 투명하게 하거나 그림자 강조), `transition` 효과 적용.

위 계획대로 React + Vite + Tailwind 환경에서 개발을 진행하면 됩니다.
