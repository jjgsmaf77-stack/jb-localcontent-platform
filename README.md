# JB 로컬콘텐츠 창업가 양성 플랫폼

전북 RISE 사업 · 지산학 K컬처&아트테크 창업가 양성 과제
호원대학교 산학협력단 운영

## 주요 기능

- **창업 TALK** — 뉴스 · 보도자료 · 활동사진
- **우리동네 창업소식** — 전북 14개 시·군 지도 인터랙션
- **교육 프로그램** — 5단계 풀 사이클 트랙 (발견→설계→실증→창업→성장)
- **멘토링 · 네트워킹** — 28명 멘토 1:1 매칭
- **창업 성공사례** — 24개 스토리
- **지원사업 안내** — 자금 · 공간 · 교육 · 해외진출
- **커뮤니티 Q&A**

## 기술 스택

- 정적 HTML5 / CSS3 / Vanilla JavaScript
- 별도 빌드 프로세스 없음 — 바로 배포 가능
- Pretendard 폰트 (Google Fonts CDN)

## 로컬 실행

```bash
npx http-server . -p 5180
# http://localhost:5180 접속
```

## 디렉토리 구조

```
jb-localcontent-platform/
├── index.html              메인 페이지
├── pages/
│   ├── about.html          사업소개
│   ├── talk.html           창업 TALK
│   ├── news.html           우리동네 창업소식
│   ├── program.html        교육 프로그램
│   ├── mentor.html         멘토링·네트워킹
│   ├── story.html          창업 성공사례
│   ├── support.html        지원사업 안내
│   └── community.html      커뮤니티 Q&A
├── assets/
│   ├── css/style.css       전체 스타일
│   ├── js/main.js          인터랙션 스크립트
│   └── img/                이미지 에셋
├── netlify.toml            Netlify 설정
├── vercel.json             Vercel 설정
├── _headers                Netlify 정적 헤더
└── DEPLOY.md               배포 가이드
```

## 배포

[DEPLOY.md](DEPLOY.md) 참조.
