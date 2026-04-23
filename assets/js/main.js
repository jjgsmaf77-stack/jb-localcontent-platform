// =========================================================
// JB Local Content Platform · Main JS
// =========================================================

// --- Mobile nav toggle ---
(function () {
  const toggle = document.querySelector('.gnb__toggle');
  const gnb = document.querySelector('.gnb');
  if (!toggle || !gnb) return;
  toggle.addEventListener('click', () => {
    const open = gnb.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// --- Tabs (창업 TALK) ---
(function () {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      panels.forEach((p) =>
        p.classList.toggle('is-active', p.dataset.panel === target)
      );
    });
  });
})();

// --- Region map interaction ---
(function () {
  const regions = document.querySelectorAll('.jb-map .region');
  const rcTag = document.getElementById('rcTag');
  const rcTitle = document.getElementById('rcTitle');
  const rcDesc = document.getElementById('rcDesc');
  const rcStats = document.getElementById('rcStats');
  const rcTeams = document.getElementById('rcTeams');
  const rcMentors = document.getElementById('rcMentors');
  const rcAssets = document.getElementById('rcAssets');
  const rcNews = document.getElementById('rcNews');
  if (!regions.length || !rcTitle) return;

  const DATA = {
    jeonju: {
      tag: '전주시', teams: 32, mentors: 8, assets: 24,
      desc: '한옥마을·한지·비빔밥 등 전통 문화자원과 청년 창업이 만나는 대한민국 로컬콘텐츠의 중심.',
      news: [
        '전주 한옥마을 팝업 스토어 \'결\' 매출 8배 성장',
        '전주문화재단 × JB 플랫폼, 전통 IP 공동 개발 MOU',
        '청년몰 창업 아카데미 3기 모집 (~5/10)',
      ],
    },
    gunsan: {
      tag: '군산시', teams: 18, mentors: 4, assets: 19,
      desc: '근대역사문화 자원과 항만 도시의 이야기로 세계와 소통하는 새로운 로컬 브랜드의 실험실.',
      news: [
        '군산 근대도시 AR 투어, 시리즈 A 투자 유치',
        '경암동 철길마을 로컬 크리에이터 레지던시 오픈',
        '호원대학교 × 군산시 청년 창업 공간 개소',
      ],
    },
    iksan: {
      tag: '익산시', teams: 12, mentors: 3, assets: 15,
      desc: '보석·귀금속 산업과 미륵사지 백제 문화의 융합, 공예와 주얼리 테크 창업이 활발.',
      news: [
        '보석박물관 연계 디자인 창업 스튜디오 개소',
        '미륵사지 IP 활용 굿즈 공모전 진행 중',
      ],
    },
    namwon: {
      tag: '남원시', teams: 10, mentors: 3, assets: 17,
      desc: '춘향전·판소리 등 K컬처 원형 콘텐츠의 본고장. 전통 예술 IP 기반 크리에이터 집중 배출.',
      news: [
        '남원 소리 크리에이터 \'판\' 글로벌 팔로워 120만',
        '춘향문화 IP 라이선싱 사업 공모 개시',
      ],
    },
    jeongeup: {
      tag: '정읍시', teams: 8, mentors: 2, assets: 12,
      desc: '내장산·동학 역사 자원 기반의 체험형 관광·문화 콘텐츠 창업 특화 지역.',
      news: [
        '동학농민혁명 VR 콘텐츠 팀 문체부 우수상 수상',
        '내장산 로컬푸드 키트 크라우드펀딩 200% 달성',
      ],
    },
    gimje: {
      tag: '김제시', teams: 7, mentors: 2, assets: 11,
      desc: '지평선·쌀 문화 기반 로컬푸드 창업, 농업 기반 6차 산업 콘텐츠에 강점.',
      news: [
        '김제 지평선 쌀 브랜드 리뉴얼 팀 선정',
        '농촌 체류형 관광 콘텐츠 팀 모집 중',
      ],
    },
    wanju: {
      tag: '완주군', teams: 14, mentors: 4, assets: 18,
      desc: '삼례책마을·농촌 푸드 허브로 지역 커뮤니티 기반의 슬로우 브랜드가 성장.',
      news: [
        '삼례책마을 로컬 출판 크리에이터 레지던시',
        '완주 로컬푸드 × 로컬 커피 콜라보 팝업',
      ],
    },
    jinan: {
      tag: '진안군', teams: 5, mentors: 2, assets: 10,
      desc: '마이산·홍삼 등 청정 자원을 활용한 웰니스·힐링 콘텐츠 창업.',
      news: [
        '마이산 웰니스 리트릿 창업팀 시드 투자 유치',
        '홍삼 기반 건강 식음료 브랜드 런칭',
      ],
    },
    muju: {
      tag: '무주군', teams: 4, mentors: 1, assets: 9,
      desc: '반딧불이·산악 레저 자원 기반의 아웃도어·에코 콘텐츠 실험 지역.',
      news: [
        '무주 반딧불이 축제 연계 콘텐츠 공모',
        '덕유산 트레일 러닝 브랜드 크라우드펀딩',
      ],
    },
    jangsu: {
      tag: '장수군', teams: 3, mentors: 1, assets: 8,
      desc: '고랭지 농산물과 말(馬) 산업 기반의 이색 로컬 브랜드 창업.',
      news: [
        '장수 사과 브랜드 리뉴얼 팀 선정',
        '승마 체험 관광 콘텐츠 베타 오픈',
      ],
    },
    imsil: {
      tag: '임실군', teams: 4, mentors: 1, assets: 9,
      desc: '임실치즈·옥정호 등 명확한 지역 자원을 바탕으로 브랜드력 있는 로컬푸드 창업.',
      news: [
        '임실치즈 리브랜딩 팀 해외 바이어 상담회 진출',
        '옥정호 관광 콘텐츠 크리에이터 레지던시',
      ],
    },
    sunchang: {
      tag: '순창군', teams: 3, mentors: 1, assets: 8,
      desc: '고추장·발효 문화 중심의 푸드 테크 & 전통 발효 브랜드 실험장.',
      news: [
        '순창 고추장 발효 테크 스타트업 매칭 투자 성사',
        '발효 문화 체험 패키지 출시',
      ],
    },
    gochang: {
      tag: '고창군', teams: 6, mentors: 2, assets: 11,
      desc: '고인돌·복분자·갯벌 등 독보적 자원 기반 생태·체험형 콘텐츠 창업.',
      news: [
        '고창 복분자 브랜드 2.0 프로젝트 킥오프',
        '갯벌 생태 콘텐츠 팀 문화관광부 선정',
      ],
    },
    buan: {
      tag: '부안군', teams: 6, mentors: 2, assets: 12,
      desc: '변산반도·곰소 염전 등 바다 자원과 예술가 레지던시를 결합한 아트테크 창업.',
      news: [
        '곰소 염전 아트 레지던시 3기 선정',
        '변산 해양 콘텐츠 창업팀 크라우드펀딩 오픈',
      ],
    },
  };

  regions.forEach((region) => {
    region.addEventListener('mouseenter', () => region.classList.add('is-hover'));
    region.addEventListener('mouseleave', () => region.classList.remove('is-hover'));
    region.addEventListener('click', () => {
      regions.forEach((r) => r.classList.remove('is-active'));
      region.classList.add('is-active');
      const key = region.dataset.region;
      const data = DATA[key];
      if (!data) return;
      rcTag.textContent = data.tag;
      rcTag.classList.remove('chip--blue', 'chip--pink', 'chip--green');
      rcTag.classList.add('chip--blue');
      rcTitle.textContent = data.tag + ' 창업 스냅샷';
      rcDesc.textContent = data.desc;
      rcStats.hidden = false;
      rcTeams.textContent = data.teams;
      rcMentors.textContent = data.mentors;
      rcAssets.textContent = data.assets;
      const ul = rcNews.querySelector('ul');
      ul.innerHTML = data.news.map((n) => '<li>' + n + '</li>').join('');
    });
  });
})();

// --- Filter chips (sub pages) ---
(function () {
  document.querySelectorAll('.filter-bar').forEach((bar) => {
    const chips = bar.querySelectorAll('.filter-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
      });
    });
  });
})();

// --- Scroll reveal (subtle) ---
(function () {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.news-card, .press-list li, .story-card, .track__item, .program-card, .vision-card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
})();
