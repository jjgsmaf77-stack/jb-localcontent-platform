# JB 로컬콘텐츠 플랫폼 · 배포 가이드

맛JobGO 플랫폼과 동일한 이중 배포 아키텍처 (GitHub + Netlify + Vercel + 가비아).
본 플랫폼은 **정적 사이트**이므로 빌드 과정 없이 바로 배포됩니다.

---

## 🌐 배포 구성

```
  [소스]                [CI/CD]                [도메인]
  GitHub      →   Netlify / Vercel      →     가비아
   (main)          (자동 감지+배포)          (DNS 관리)
```

- `main` push → 1~3분 내 전 세계 CDN 반영
- PR → Preview URL 자동 생성
- SSL 자동 발급 (Let's Encrypt · 자동 갱신)

---

## 🚀 배포 단계

### [1단계] GitHub 레포 생성 & 푸시

```bash
cd "E:/2025 RISE 결과보고서/jb-localcontent-platform"

git init
git add -A
git commit -m "feat: JB 로컬콘텐츠 창업가 양성 플랫폼 초기 배포"

# gh CLI로 레포 생성 & 푸시
gh repo create jb-localcontent-platform --public --source=. --remote=origin --push
```

### [2단계-A] Netlify 연결

1. https://netlify.com → **Add new site** → **Import from GitHub**
2. `jb-localcontent-platform` 선택
3. 빌드 설정 자동 감지됨 (`netlify.toml`)
   - Build command: _(empty — static)_
   - Publish directory: `.`
4. **Deploy site** → 완료 후 URL: `https://jb-localcontent-platform.netlify.app`

### [2단계-B] Vercel 연결 (동시 배포 가능)

1. https://vercel.com → **Add New Project** → GitHub `jb-localcontent-platform` Import
2. Framework: **Other** (자동 감지)
3. **Deploy** → URL: `https://jb-localcontent-platform.vercel.app`

### [3단계] 커스텀 도메인 — `jblocal.co.kr` (가비아 구매 완료)

### [4단계] DNS 연결 (가비아 My가비아 → 도메인 → DNS 관리)

**Netlify 사용 시**
```
호스트      타입      값                                       TTL
@           A         75.2.60.5                                 3600
www         CNAME     jb-localcontent-platform.netlify.app.     3600
```

**Vercel 사용 시**
```
호스트      타입      값                                       TTL
@           A         76.76.21.21                               3600
www         CNAME     cname.vercel-dns.com.                     3600
```

**양쪽 동시 배포 시**: `jblocal.co.kr` (apex) → Vercel, `www.jblocal.co.kr` → Netlify
(또는 하나를 메인으로 지정하고 나머지를 301 리다이렉트)

그다음 Netlify/Vercel 대시보드 → **Domains → Add custom domain**
→ `jblocal.co.kr` · `www.jblocal.co.kr` 입력 → 각 플랫폼이 안내하는 정확한 레코드로 가비아에 등록.

### [5단계] DNS 전파 + SSL 자동 발급

- DNS 전파: 15분 ~ 24시간
- SSL: Let's Encrypt 자동 (90일마다 자동 갱신)
- 확인: `nslookup 도메인.co.kr` 또는 브라우저에서 `https://` 접속

---

## 🔄 이후 업데이트

```bash
git add -A
git commit -m "feat: 콘텐츠 업데이트"
git push origin main
```

1~3분 내 Netlify/Vercel 양쪽 모두 자동 반영.

---

## 💰 운영 비용 (3개년)

| 항목 | 플랜 | 월 | 3년 |
|---|---|---|---|
| 가비아 도메인 `.co.kr` | — | — | 약 66,000원 |
| Netlify | Free | 0원 | 0원 |
| Vercel | Hobby | 0원 | 0원 |
| **합계** | | **0원** | **≈ 66,000원** |

> 정적 사이트는 DB가 없어 Turso 등 외부 서비스 불필요 — 순수 도메인 비용만 듭니다.

---

## 📁 배포 관련 파일

```
jb-localcontent-platform/
├── netlify.toml         Netlify 빌드·헤더·리다이렉트
├── vercel.json          Vercel 헤더·리전(icn1)
├── _headers             Netlify 정적 헤더 (보조)
├── .gitignore           Git 제외 항목
└── DEPLOY.md            이 문서
```

---

## 🆘 트러블슈팅

### 한글 폰트가 깨집니다
- `<meta charset="UTF-8">` 확인 (이미 적용됨)
- Netlify/Vercel Content-Type 헤더가 `charset=utf-8` 인지 확인 (이미 적용됨)

### 도메인 연결 안 됨
- `nslookup 도메인.co.kr` 로 DNS 확인
- 가비아 DNS 반영 대기 (최대 24시간)
- Netlify/Vercel 대시보드에서 **Verify** 재시도

### 배포 후 CSS/JS 반영 안 됨
- 브라우저 캐시 → 하드 리프레시 (`Ctrl+Shift+R`)
- HTML은 1시간 캐시로 설정되어 있음 — 최대 1시간 대기
