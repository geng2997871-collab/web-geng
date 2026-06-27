import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import './styles.css';

const contact = {
  name: '\u803f\u9f99\u5343',
  phone: '13562080356',
  email: 'geng2997871@163.com',
  location: '\u4e2d\u56fd / \u8fdc\u7a0b\u534f\u4f5c',
};

const navItems = [
  { label: '\u9996\u9875', href: '#top' },
  { label: '\u7ecf\u5386', href: '#experience' },
  { label: '\u4f5c\u54c1', href: '#works' },
  { label: '\u8054\u7cfb', href: '#contact' },
];

const motionWorks = [
  {
    title: '\u573a\u666f',
    tag: 'SCENE',
    video: '/assets/work-atmosphere.mp4',
    tone: 'landscape',
    objectPosition: 'center center',
    description: '\u4e00\u4e2a\u8352\u5de5\u4e1a\u6587\u660e\u901f\u5fd8\u7684\u6e2f\u53e3\uff0c\u94a2\u94c1\u4e0e\u96e8\u6c34\u4ea4\u7ec7\u51fa\u672a\u6765\u4e16\u754c\u7684\u8f6e\u5ed3\u3002',
  },
  {
    title: '\u6676\u9ab8',
    tag: 'VISUAL',
    video: '/assets/work-crystal.mp4',
    tone: 'landscape',
    objectPosition: 'center center',
    description: '\u673a\u68b0\u751f\u547d\u7684\u5f62\u6001\u63a2\u7d22\uff0c\u8fde\u63a5\u6750\u8d28\u4e0e\u60c5\u7eea\u7ed3\u6784\u7684\u5931\u771f\u610f\u8c61\u3002',
  },
  {
    title: '\u5b9d\u77ff\u529b',
    tag: 'AD',
    video: '/assets/work-pocari.mp4',
    tone: 'landscape',
    objectPosition: 'center center',
    description: '\u66f4\u5feb\u7684\u7c92\u5b50\u6d41\u52a8\uff0c\u8fce\u63a5\u6bcf\u4e00\u6b21\u6311\u6218\uff0c\u8ba9\u6c57\u6c34\u6210\u4e3a\u524d\u8fdb\u7684\u52a8\u529b\u3002',
  },
  {
    title: '\u7ec8\u8001',
    tag: 'FILM',
    video: '/assets/work-elder.mp4',
    tone: 'square',
    objectPosition: 'center center',
    description: '\u5728\u9ed1\u6697\u4e2d\u5bfb\u627e\u5149\uff0c\u5728\u5bc2\u9759\u4e2d\u542c\u89c1\u7075\u9b42\u7684\u53ec\u5524\u3002',
  },
  {
    title: '\u94f8\u5e01\u673a',
    tag: 'FUTURE',
    video: '/assets/work-mint.mp4',
    tone: 'square',
    objectPosition: 'center center',
    description: '\u5f53\u79d1\u6280\u5f00\u59cb\u94f8\u9020\u4ef7\u503c\uff0c\u672a\u6765\u7684\u8d27\u5e01\u5c06\u7531\u673a\u5668\u4e0e\u4ee3\u7801\u5171\u540c\u953b\u9020\u3002',
  },
];

const projectGallery = [
  {
    title: '\u5b9e\u9a8c\u88c5\u7f6e\u89c6\u89c9',
    category: 'AI \u89c6\u89c9 / \u79d1\u6280\u53d9\u4e8b',
    image: '/assets/gallery-reactor.png',
  },
  {
    title: '\u4eba\u7269\u5f71\u50cf\u5b9e\u9a8c',
    category: '\u89d2\u8272\u6c1b\u56f4 / \u89c6\u89c9\u751f\u6210',
    image: '/assets/gallery-cyber-samurai.png',
  },
  {
    title: '\u672a\u6765\u57ce\u5e02\u573a\u666f',
    category: '\u4e16\u754c\u89c2\u6784\u5efa / \u9ed1\u767d\u53d9\u4e8b',
    image: '/assets/gallery-megacity.png',
  },
  {
    title: '\u65f6\u5c1a\u54c1\u724c\u8096\u50cf',
    category: '\u54c1\u724c\u56fe\u50cf / \u5ba3\u53d1\u6d77\u62a5',
    image: '/assets/gallery-fashion.png',
  },
  {
    title: '\u7a7a\u95f4\u53d9\u4e8b\u5f71\u50cf',
    category: '\u89c2\u5ff5\u6444\u5f71 / \u753b\u9762\u6784\u6210',
    image: '/assets/gallery-horse-room.png',
  },
  {
    title: '\u673a\u68b0\u4f53\u6982\u5ff5',
    category: '\u4ea7\u54c1\u6982\u5ff5 / \u6750\u8d28\u5b9e\u9a8c',
    image: '/assets/gallery-spider.png',
  },
  {
    title: '\u5546\u4e1a\u6d77\u62a5\u521b\u4f5c',
    category: '\u5e7f\u544a\u89c6\u89c9 / \u54c1\u724c\u4f20\u64ad',
    image: '/assets/gallery-pocari.png',
  },
];

function wrapPosition(value, length) {
  const midpoint = (length - 1) / 2;
  return ((((value + midpoint) % length) + length) % length) - midpoint;
}

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
    };
  }, []);

  return (
    <section className="hero section-full" id="top">
      <video
        ref={videoRef}
        className="hero-video"
        src="/assets/hero-bg.mp4"
        autoPlay
        muted
        preload="auto"
        loop
        playsInline
        disablePictureInPicture
        aria-hidden="true"
      />
      <header className="site-header">
        <a href="#top" className="site-logo" aria-label="Homepage">
          <img src="/assets/site-logo.png" alt="Logo" />
        </a>
        <nav aria-label="\u4e3b\u5bfc\u822a">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="hero-inner container">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span>Visual Designer</span>
            <em>/</em>
            <span>AI Designer</span>
            <em>/</em>
            <span>Brand Designer</span>
          </span>
          <h1>
            <span>GENG</span>
            <span>LONGQIAN</span>
          </h1>
          <p>
            {'\u7528\u514b\u5236\u800c\u6709\u672a\u6765\u611f\u7684\u89c6\u89c9\u8bed\u8a00\uff0c\u628a\u5e7f\u544a\u4f20\u64ad\u3001\u54c1\u724c\u53d9\u4e8b\u4e0e AI \u56fe\u50cf\u751f\u6210\u8fde\u63a5\u6210\u5b8c\u6574\u7684\u8bbe\u8ba1\u8f93\u51fa\u3002'}
          </p>
          <div className="hero-actions">
            <a href="#works" className="primary-link">
              {'\u67e5\u770b\u4f5c\u54c1'}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutBrief() {
  const posterRef = useRef(null);

  useEffect(() => {
    const poster = posterRef.current;
    if (!poster) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          poster.classList.add('is-active');
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(poster);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    const poster = posterRef.current;
    if (!poster) return;

    const rect = poster.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const nx = (x - 0.5) * 2;
    const ny = (y - 0.5) * 2;

    poster.style.setProperty('--about-spot-x', `${(x * 100).toFixed(2)}%`);
    poster.style.setProperty('--about-spot-y', `${(y * 100).toFixed(2)}%`);
    poster.style.setProperty('--about-tilt-x', `${(-ny * 4).toFixed(2)}deg`);
    poster.style.setProperty('--about-tilt-y', `${(nx * 5).toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    const poster = posterRef.current;
    if (!poster) return;

    poster.style.setProperty('--about-spot-x', '50%');
    poster.style.setProperty('--about-spot-y', '52%');
    poster.style.setProperty('--about-tilt-x', '0deg');
    poster.style.setProperty('--about-tilt-y', '0deg');
  };

  return (
    <section className="about about-brief section-full" id="experience">
      <div className="container about-brief-shell">
        <div
          ref={posterRef}
          className="experience-poster"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="experience-scan" aria-hidden="true" />
          <div className="experience-poster-left">
            <h2>
              <span>MY</span>
              <span>EXPERIENCE</span>
            </h2>
            <p className="experience-poster-kicker">{'DESIGN / STRATEGY / VISUAL'}</p>
            <p className="experience-poster-copy">
              {'教育建立设计基础，实习连接品牌项目，校园经历补足传播执行与落地经验。'}
            </p>
            <span className="experience-poster-date">{'2020 — PRESENT'}</span>
            <span className="experience-poster-code">{'||||||||||||||||'}</span>
          </div>

          <div className="experience-poster-center" aria-hidden="true">
            <span className="experience-cross experience-cross-top" />
            <span className="experience-cross experience-cross-right" />
            <span className="experience-cross experience-cross-bottom" />
            <span className="experience-cross experience-cross-left" />
            <div className="experience-rings">
              <span />
              <span />
            </div>
            <div className="experience-core">
              <img src="/assets/about-foreground.webp" alt="" />
            </div>
          </div>

          <div className="experience-poster-right">
            <article className="experience-panel">
              <span className="experience-panel-number">01</span>
              <span className="experience-panel-label">{'EDUCATION'}</span>
              <p>
                {'武汉工程科技学院环境设计本科，夯实构图、色彩搭配、版式设计与空间视觉表达基础；'}
                <br className="mobile-only-break" />
                {'马来亚大学公共管理硕士，进一步强化项目组织、传播逻辑与跨文化协作理解。'}
              </p>
            </article>

            <article className="experience-panel">
              <span className="experience-panel-number">02</span>
              <span className="experience-panel-label">{'PRACTICE'}</span>
              <p>
                {'上海有树文化传播有限公司视觉设计实习，参与抖音账号海报、封面、图文版式与视觉延展，协助统一内容视觉风格与品牌传播表达。'}
              </p>
            </article>

            <article className="experience-panel">
              <span className="experience-panel-number">03</span>
              <span className="experience-panel-label">{'PROJECTS'}</span>
              <p>
                {'负责校园活动主视觉海报、邀请函、背景板与导视物料等整套输出，能够在较短周期内完成从设计到落地的统一呈现。'}
              </p>
            </article>
          </div>

          <div className="experience-poster-footer" aria-hidden="true">
            <span>{'EXPERIMENTAL'}</span>
            <span>{'DIGITAL'}</span>
            <span>{'VISUAL DESIGN'}</span>
            <span>{'ART DIRECTION'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsGallery() {
  const total = projectGallery.length;
  const shellRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(null);
  const [dragState, setDragState] = useState({
    active: false,
    startX: 0,
    startOffset: 0,
    delta: 0,
    moved: false,
  });
  const autoPausedUntilRef = useRef(0);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    const updateViewport = () => {
      const nextIsMobile = window.innerWidth < 768;
      setIsMobileViewport(nextIsMobile);
      if (nextIsMobile) {
        const centeredOffset = Math.round(offsetRef.current);
        offsetRef.current = centeredOffset;
        targetOffsetRef.current = null;
        setOffset(centeredOffset);
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    let frameId = 0;
    let lastTime = 0;

    const tick = (time) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!dragState.active && targetOffsetRef.current !== null) {
        const current = offsetRef.current;
        const target = targetOffsetRef.current;
        const diff = target - current;

        if (Math.abs(diff) < 0.0025) {
          offsetRef.current = target;
          targetOffsetRef.current = null;
          setOffset(target);
        } else {
          const easing = Math.min(0.22, deltaTime * 0.0125);
          const next = current + diff * easing;
          offsetRef.current = next;
          setOffset(next);
        }
      } else if (
        !isMobileViewport &&
        !dragState.active &&
        Date.now() > autoPausedUntilRef.current
      ) {
        const autoSpeed = isMobileViewport ? 0.000075 : 0.00012;
        const next = offsetRef.current + deltaTime * autoSpeed;
        offsetRef.current = next;
        setOffset(next);
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [dragState.active, isMobileViewport]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          shell.classList.add('is-active');
          if (isMobileViewport) {
            const centeredOffset = Math.round(offsetRef.current);
            offsetRef.current = centeredOffset;
            targetOffsetRef.current = null;
            setOffset(centeredOffset);
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, [isMobileViewport]);

  const pauseAuto = () => {
    autoPausedUntilRef.current = Date.now() + 2800;
  };

  const animateCardToCenter = (index) => {
    const current = offsetRef.current;
    const position = wrapPosition(index - current, total);
    pauseAuto();
    targetOffsetRef.current = current + position;
  };

  const handleGalleryStep = (direction) => {
    pauseAuto();
    const baseOffset = targetOffsetRef.current ?? offsetRef.current;
    targetOffsetRef.current = Math.round(baseOffset) + direction;
  };

  const handleGalleryPointerMove = (event) => {
    if (isMobileViewport) return;
    const shell = shellRef.current;
    if (!shell) return;

    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    shell.style.setProperty('--gallery-spot-x', `${x.toFixed(2)}%`);
    shell.style.setProperty('--gallery-spot-y', `${y.toFixed(2)}%`);
  };

  const handleGalleryPointerLeave = () => {
    if (isMobileViewport) return;
    const shell = shellRef.current;
    if (!shell) return;

    shell.style.setProperty('--gallery-spot-x', '50%');
    shell.style.setProperty('--gallery-spot-y', '50%');
  };

  const handlePointerDown = (event) => {
    pauseAuto();
    targetOffsetRef.current = null;
    setDragState({
      active: true,
      startX: event.clientX,
      startOffset: offsetRef.current,
      delta: 0,
      moved: false,
    });
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.active) return;
    const delta = event.clientX - dragState.startX;
    const next = dragState.startOffset - delta / 240;
    setDragState((prev) => ({ ...prev, delta, moved: prev.moved || Math.abs(delta) > 6 }));
    offsetRef.current = next;
    setOffset(next);
  };

  const handlePointerUp = (event) => {
    if (!dragState.active) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    const clickedCard = event.target.closest?.('[data-gallery-index]');

    if (!dragState.moved && clickedCard) {
      const index = Number(clickedCard.dataset.galleryIndex);
      if (!Number.isNaN(index)) {
        animateCardToCenter(index);
      }
    }

    setDragState({
      active: false,
      startX: 0,
      startOffset: offsetRef.current,
      delta: 0,
      moved: false,
    });
  };

  const handleCardClick = (index) => {
    if (dragState.active || dragState.moved) return;
    animateCardToCenter(index);
  };

  const cards = useMemo(() => {
    return projectGallery.map((project, index) => {
      const position = wrapPosition(index - offset, total);
      const distance = Math.abs(position);
      const tilt = dragState.active ? Math.max(-12, Math.min(12, dragState.delta / 18)) : 0;

      return {
        ...project,
        index,
        style: {
          '--x': `${position * 238}px`,
          '--y': `${distance * 10}px`,
          '--scale': Math.max(0.76, 1 - distance * 0.08).toFixed(3),
          '--rotate-y': `${position * -24}deg`,
          '--rotate-z': `${position * 3 + tilt * 0.18}deg`,
          '--opacity': Math.max(0, 1 - distance * 0.16).toFixed(3),
          '--z': `${1000 - Math.round(distance * 100)}`,
          '--pointer': distance > 3.6 ? 'none' : 'auto',
          '--reveal-delay': `${index * 70}ms`,
        },
      };
    });
  }, [dragState.active, dragState.delta, offset, total]);

  return (
    <section className="projects gallery-section section-full" id="works">
      <div className="gallery-glow" aria-hidden="true" />
      <div
        ref={shellRef}
        className="container gallery-shell"
        onPointerMove={handleGalleryPointerMove}
        onPointerLeave={handleGalleryPointerLeave}
      >
        <div className="gallery-heading">
          <h2>
            Selected Visual Works
            <span>{'AI \u89c6\u89c9\u5b9e\u9a8c\u4e0e\u54c1\u724c\u56fe\u50cf\u751f\u6210'}</span>
          </h2>
        </div>

        <div className="gallery-stage">
          <button
            type="button"
            className="gallery-arrow gallery-arrow-prev"
            onClick={() => handleGalleryStep(-1)}
            aria-label="\u4e0a\u4e00\u5f20\u4f5c\u54c1"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            className={`gallery-track ${dragState.active ? 'is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {cards.map((card) => (
              <article
                key={`${card.title}-${card.index}`}
                data-gallery-index={card.index}
                className="gallery-card"
                style={card.style}
                onClick={() => handleCardClick(card.index)}
              >
                <img src={card.image} alt={card.title} draggable="false" />
                <div className="gallery-card-copy">
                  <span>{card.category}</span>
                  <h3>{card.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="gallery-arrow gallery-arrow-next"
            onClick={() => handleGalleryStep(1)}
            aria-label="\u4e0b\u4e00\u5f20\u4f5c\u54c1"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="gallery-points" aria-label="\u4f5c\u54c1\u65b9\u5411">
          <div>
            <strong>{'\u5e7f\u544a\u89c6\u89c9'}</strong>
            <span>{'\u805a\u7126\u54c1\u724c\u5ba3\u53d1\u3001KV \u6d77\u62a5\u4e0e\u4f20\u64ad\u753b\u9762\u8f93\u51fa\u3002'}</span>
          </div>
          <div>
            <strong>{'\u89c6\u89c9\u827a\u672f'}</strong>
            <span>{'\u5f3a\u8c03\u56fe\u50cf\u6c1b\u56f4\u3001\u53d9\u4e8b\u5f20\u529b\u4e0e\u4e2a\u4eba\u98ce\u683c\u8fa8\u8bc6\u5ea6\u3002'}</span>
          </div>
          <div>
            <strong>{'\u54c1\u724c\u8868\u8fbe'}</strong>
            <span>{'\u8ba9\u56fe\u50cf\u3001\u6587\u5b57\u4e0e\u4f20\u64ad\u8bed\u5883\u4fdd\u6301\u4e00\u81f4\uff0c\u5f62\u6210\u5b8c\u6574\u5370\u8c61\u3002'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ item, className = '' }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prepareFirstFrame = () => {
      if (!video.paused) return;
      if (video.readyState < 2) return;
      try {
        if (video.currentTime < 0.01) {
          video.currentTime = 0.01;
        }
      } catch {}
    };

    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onEnded = () => setIsPlaying(false);
    const onLoadedData = () => prepareFirstFrame();
    const onSeeked = () => {
      if (!isPlaying) video.pause();
    };

    video.addEventListener('pause', onPause);
    video.addEventListener('play', onPlay);
    video.addEventListener('ended', onEnded);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('seeked', onSeeked);

    prepareFirstFrame();

    return () => {
      video.removeEventListener('pause', onPause);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('seeked', onSeeked);
    };
  }, [isPlaying]);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.controls = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
      if (typeof video.requestFullscreen === 'function') {
        video.requestFullscreen().catch(() => {});
      } else if (typeof video.webkitEnterFullscreen === 'function') {
        video.webkitEnterFullscreen();
      }
    } else {
      video.pause();
    }
  };

  return (
    <article
      className={`motion-reel-card motion-tone-${item.tone} ${className}`.trim()}
      onClick={handleToggle}
    >
      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        preload="metadata"
        style={{ objectPosition: item.objectPosition }}
      />
      <div className="motion-reel-card-overlay" />
      <div className="motion-reel-card-meta">
        <span>{item.tag}</span>
        <strong>{item.title}</strong>
        <p>{item.description}</p>
      </div>
      <button
        type="button"
        className="motion-reel-play"
        onClick={(event) => {
          event.stopPropagation();
          handleToggle();
        }}
        aria-label={isPlaying ? '\u6682\u505c\u89c6\u9891' : '\u64ad\u653e\u89c6\u9891'}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
    </article>
  );
}

function Strengths() {
  const reelRef = useRef(null);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reel.classList.add('is-active');
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(reel);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    const reel = reelRef.current;
    if (!reel) return;

    const rect = reel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    reel.style.setProperty('--motion-spot-x', `${x.toFixed(2)}%`);
    reel.style.setProperty('--motion-spot-y', `${y.toFixed(2)}%`);
  };

  const handlePointerLeave = () => {
    const reel = reelRef.current;
    if (!reel) return;
    reel.style.setProperty('--motion-spot-x', '76%');
    reel.style.setProperty('--motion-spot-y', '22%');
  };

  return (
    <section className="strengths motion-reel motion-reel-primary section-full" id="strengths">
      <div className="motion-reel-glow" aria-hidden="true" />
      <div
        ref={reelRef}
        className="motion-reel-shell"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="motion-layout-board">
          <div className="motion-reel-grid motion-reel-grid-single">
            <VideoCard item={motionWorks[0]} className="motion-layout-hero" />
            <VideoCard item={motionWorks[1]} className="motion-layout-top" />
            <VideoCard item={motionWorks[2]} className="motion-layout-bottom-left" />
            <VideoCard item={motionWorks[3]} className="motion-layout-bottom-mid" />
            <VideoCard item={motionWorks[4]} className="motion-layout-bottom-right" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const posterRef = useRef(null);

  useEffect(() => {
    const poster = posterRef.current;
    if (!poster) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          poster.classList.add('is-active');
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(poster);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    const poster = posterRef.current;
    if (!poster) return;

    const rect = poster.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const offsetX = (px - 0.5) * 18;
    const offsetY = (py - 0.5) * 18;

    poster.style.setProperty('--closing-spot-x', `${(px * 100).toFixed(2)}%`);
    poster.style.setProperty('--closing-spot-y', `${(py * 100).toFixed(2)}%`);
    poster.style.setProperty('--closing-shift-x', `${offsetX.toFixed(2)}px`);
    poster.style.setProperty('--closing-shift-y', `${offsetY.toFixed(2)}px`);
  };

  const handlePointerLeave = () => {
    const poster = posterRef.current;
    if (!poster) return;

    poster.style.setProperty('--closing-spot-x', '62%');
    poster.style.setProperty('--closing-spot-y', '34%');
    poster.style.setProperty('--closing-shift-x', '0px');
    poster.style.setProperty('--closing-shift-y', '0px');
  };

  return (
    <section className="closing section-full" id="contact">
      <div className="container closing-inner">
        <div
          ref={posterRef}
          className="closing-poster"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="closing-poster-figure" aria-hidden="true" />
          <div className="closing-poster-bloom" aria-hidden="true" />
          <div className="closing-poster-grid" aria-hidden="true" />
          <div className="closing-poster-arcs" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="closing-topline">
            <span>{'Project Invitation'}</span>
          </div>

          <div className="closing-dates" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="closing-copy">
            <span>{'Visual Closing Poster'}</span>
            <h2>{'THANK YOU'}</h2>
            <p>
              {'\u628a\u5e7f\u544a\u5ba3\u53d1\u3001\u54c1\u724c\u8868\u8fbe\u4e0e AI \u89c6\u89c9\u751f\u6210\u6574\u5408\u6210\u4e00\u5957\u5b8c\u6574\u8f93\u51fa\uff0c\u8ba9\u753b\u9762\u5148\u62b5\u8fbe\uff0c\u518d\u8ba9\u4fe1\u606f\u88ab\u8bb0\u4f4f\u3002'}
            </p>
          </div>

          <div className="closing-meta closing-meta-left">
            <p>
              {'\u63a5\u53d7\u54c1\u724c\u89c6\u89c9\u3001\u6d3b\u52a8\u4e3b\u89c6\u89c9\u3001\u5e7f\u544a\u5ba3\u53d1\u3001AIGC \u56fe\u50cf\u751f\u6210\u4e0e\u5185\u5bb9\u5305\u88c5\u5408\u4f5c\uff0c\u652f\u6301\u9636\u6bb5\u5236\u9879\u76ee\u4e0e\u957f\u671f\u534f\u4f5c\u3002'}
            </p>
          </div>

          <div className="closing-meta closing-meta-right">
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>{contact.phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [enableDesktopSnap, setEnableDesktopSnap] = useState(() => {
    if (typeof window === 'undefined') return false;
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    return window.innerWidth >= 1024 && supportsFinePointer;
  });

  useEffect(() => {
    const updateSnapMode = () => {
      const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setEnableDesktopSnap(window.innerWidth >= 1024 && supportsFinePointer);
    };

    updateSnapMode();
    window.addEventListener('resize', updateSnapMode);
    return () => window.removeEventListener('resize', updateSnapMode);
  }, []);

  useEffect(() => {
    if (!enableDesktopSnap) return;

    const sections = Array.from(document.querySelectorAll('.section-full'));
    if (!sections.length) return;

    let locked = false;
    let unlockTimer = 0;

    const getClosestIndex = () => {
      const viewportMid = window.scrollY + window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const sectionMid = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionMid - viewportMid);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const handleWheel = (event) => {
      if (document.fullscreenElement) return;
      if (Math.abs(event.deltaY) < 10) return;
      if (locked) {
        event.preventDefault();
        return;
      }

      const activeElement = document.activeElement;
      const isTyping =
        activeElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);
      if (isTyping) return;

      event.preventDefault();
      locked = true;

      const currentIndex = getClosestIndex();
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));

      sections[nextIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, 900);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.clearTimeout(unlockTimer);
    };
  }, [enableDesktopSnap]);

  return (
    <>
      <Hero />
      <AboutBrief />
      <ProjectsGallery />
      <Strengths />
      <Closing />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

