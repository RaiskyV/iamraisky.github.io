import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Copy, Check, ChevronRight, ArrowUpRight, BookOpen, Image as ImageIcon, LayoutGrid, List, Link as LinkIcon, Download, Palette } from "lucide-react";

/**
 * Single‑file site: "Nano Banana — Руководство от Valery Raisky"
 * Tech: React + Tailwind + Framer Motion + lucide-react
 * Notes:
 *  - Сайт — статичный, всё в одном файле. Можно вставить в Vite/Next.js как страницу.
 *  - Изображения берутся напрямую из публичного GitHub репозитория подборки кейсов.
 *  - Для расширения просто добавляйте записи в массив CASES ниже (id, title, images, prompt, tags).
 */

const BRAND = {
  name: "RAISKY",
  gradient: "from-rose-500 via-fuchsia-500 to-violet-500",
  fontHeading: "'Montserrat', system-ui, sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",
};
const LOGO_URL = ""; // <- сюда можно подставить ссылку на твой SVG/PNG логотип
const ACCENT = BRAND.gradient;

const CASES = [
  {
    id: 1,
    title: "Иллюстрация → Фигура",
    author: "@ZHO_ZHO_ZHO",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case1/input0.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case1/output0.jpg",
    ],
    tags: ["персонажи", "фигурки", "мерч"],
    prompt:
      "Преобразуй это фото в фигурку персонажа. На заднем плане поставь коробку с изображением персонажа; на экране компьютера — процесс моделинга в Blender. Спереди добавь круглую пластиковую подставку, на которой стоит фигурка. По возможности — интерьерная сцена. Разрешение 4K.",
  },
  {
    id: 2,
    title: "Вид с карты → Ground‑view",
    author: "@tokumin",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case2/input.jpg",
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case2/input3.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case2/output.jpg",
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case2/output3.jpg",
    ],
    tags: ["локейшн", "карта", "навигация"],
    prompt:
      "Покажи то, что видит красная стрелка — реалистичный вид с уровня земли из точки внутри красного круга, в направлении стрелки. Сохраняй перспективу и масштаб объектов.",
  },
  {
    id: 3,
    title: "AR‑аннотации реального мира",
    author: "@bilawalsidhu",
    input: [],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case3/output.jpg",
    ],
    tags: ["AR", "аннотации", "урбанистика"],
    prompt:
      "Ты — генератор AR‑опыта. Подсвети выбранный POI на фото и добавь релевантные аннотации/указатели. Учитывай реальную геометрию сцены и читаемость надписей.",
  },
  {
    id: 10,
    title: "Стикеры с персонажем",
    author: "@op7418",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case10/input.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case10/output.jpg",
    ],
    tags: ["стикеры", "персонажи", "UGC"],
    prompt:
      "Преобразуй персонажа в бело‑контурный стикер в стиле веб‑иллюстрации, добавь короткую игривую фразу, описывающую героя (по образцу второго изображения).",
  },
  {
    id: 11,
    title: "Аниме → Реалистичный косплей",
    author: "@ZHO_ZHO_ZHO",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case11/input.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case11/output.jpg",
    ],
    tags: ["косплей", "аниме", "ивенты"],
    prompt:
      "Сгенерируй фото девушки, косплеящей загруженную иллюстрацию, на фоне Комикета (Comic Market). Сохраняй узнаваемость костюма и детали.",
  },
  {
    id: 12,
    title: "Дизайн персонажа: пропорции/виды/эмоции",
    author: "@ZHO_ZHO_ZHO",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case12/input.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case12/output.jpg",
    ],
    tags: ["персонажи", "концепт‑арт"],
    prompt:
      "Сделай дизайн персонажа: (1) пропорции, (2) три вида — фронт/профиль/спина, (3) лист эмоций, (4) лист поз, (5) варианты костюма. Чёткая разметка, читаемые подписи.",
  },
  {
    id: 13,
    title: "Раскрась линейный арт по палитре",
    author: "@ZHO_ZHO_ZHO",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case13/input.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case13/output.jpg",
    ],
    tags: ["иллюстрация", "палитра"],
    prompt:
      "Точно используй палитру из Изображения 2 для раскраски персонажа на Изображении 1. Сохраняй линии и текстуры, избегай пропусков.",
  },
  {
    id: 27,
    title: "Наложить водяной знак",
    author: "@AiMachete",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case27/input.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case27/output.jpg",
    ],
    tags: ["пресеты", "пост‑процессинг"],
    prompt:
      "Добавь аккуратный водяной знак бренда (полупрозрачный, не мешает ключевому контенту). Сохраняй читаемость и композиционный баланс.",
  },
  {
    id: 28,
    title: "Генерация инфографики",
    author: "@icreatelife",
    input: [],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case28/output.jpg",
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case28/output1.jpg",
    ],
    tags: ["инфографика", "образование"],
    prompt:
      "Сделай инфографику на тему: 5 самых высоких зданий мира / самые «сладкие» вещи на Земле. Чёткая иерархия, крупные цифры, векторные пиктограммы.",
  },
  {
    id: 29,
    title: "Красной ручкой: пометки улучшений",
    author: "@AiMachete",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case29/input.jpg",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case29/output.jpg",
    ],
    tags: ["ревью", "редизайн", "UX"],
    prompt:
      "Проанализируй изображение. Красной ручкой отметь места, которые можно улучшить: выравнивание, отступы, контраст, иерархия, читабельность. Не закрывай важный контент.",
  },
  {
    id: 30,
    title: "«Взрывная» продуктовая сцена",
    author: "@icreatelife",
    input: [],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case30/output.jpg",
    ],
    tags: ["e‑commerce", "продукты", "карточки товара"],
    prompt:
      "Снимок продукта в драматичной современной сцене с динамическим «взрывным» разлётом ключевых ингредиентов вокруг, подчёркивающим свежесть и питательность. Студийный свет, 4K.",
  },
  {
    id: 82,
    title: "Витринный мерч по иллюстрации",
    author: "@tokyo_Valentine",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case82/input.png",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case82/output.png",
    ],
    tags: ["мерч", "витрина", "ивенты"],
    prompt:
      "Сгенерируй витрину магазинов с мерчем: канцелярия, карточки, плюш, деформ‑версии оригинального арта. Атмосфера — мечтательная «святая земля» фан‑активностей. 4000×3000.",
  },
  {
    id: 83,
    title: "Комик‑кон: большой стенд и витрины",
    author: "@tokyo_Valentine",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case83/input.png",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case83/output.png",
    ],
    tags: ["ивенты", "мерч", "стенд"],
    prompt:
      "Комик‑маркет: просторный стенд с длинными столами и полками, мерч организован, в центре — 100‑сантиметровая фигурка, 80‑дюймовый дисплей, акриловые подставки, деформ‑фигурки, дакимаки и т. п. Атмосфера восторженная, 4K.",
  },
  {
    id: 84,
    title: "Линеарт → детский дудл",
    author: "@hAru_mAki_ch",
    input: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case84/input.png",
    ],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case84/output.png",
    ],
    tags: ["иллюстрация", "стиль"],
    prompt:
      "Сделай так, чтобы загруженная книжка‑картинка выглядела как нарисованная пятилетним ребёнком. Простые формы, жирная линийка, наивная палитра.",
  },
  {
    id: 85,
    title: "Пространство современной выставки",
    author: "@UNIBRACITY",
    input: [],
    output: [
      "https://raw.githubusercontent.com/PicoTrex/Awesome-Nano-Banana-images/main/images/case85/output.png",
    ],
    tags: ["интерьеры", "музей", "экспозиция"],
    prompt:
      "Авангардное выставочное пространство; тема вынесена в монументальную форму на центральной стене 20×8 м; пол — полированный гранит с отражениями; строгая композиция по центральной точке схода; блюр лиц посетителей.",
  },
];

const TOC = [
  { id: "intro", label: "Введение" },
  { id: "quickstart", label: "Быстрый старт" },
  { id: "tips", label: "Советы" },
  { id: "cases", label: "Кейсы" },
  { id: "patterns", label: "Паттерны" },
  { id: "faq", label: "ЧаВо" },
  { id: "license", label: "Лицензия" },
];

function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium bg-zinc-100/60 dark:bg-zinc-800/60 border-zinc-300/40 dark:border-zinc-700/60">
      {children}
    </span>
  );
}

function SectionHeader({ id, icon: Icon, title, subtitle }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl bg-gradient-to-tr ${ACCENT} text-white shadow`}> 
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
}

function CaseCard({ data }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {}
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {String(data.id).padStart(2, "0")} · {data.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-0.5">Автор: {data.author}</p>
        </div>
        <div className="flex gap-2">
          {data.tags.slice(0, 3).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 pb-2">
        {(data.input || []).slice(0, 2).map((src, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <img src={src} alt={`input-${data.id}-${i}`} className="w-full h-56 object-cover" />
            <span className="absolute left-2 top-2 text-[10px] uppercase tracking-wide bg-white/80 dark:bg-black/50 px-1.5 py-0.5 rounded">Input</span>
          </div>
        ))}
        {(data.output || []).slice(0, 2).map((src, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <img src={src} alt={`output-${data.id}-${i}`} className="w-full h-56 object-cover" />
            <span className="absolute left-2 top-2 text-[10px] uppercase tracking-wide bg-white/80 dark:bg-black/50 px-1.5 py-0.5 rounded">Output</span>
          </div>
        ))}
      </div>

      {/* Prompt */}
      <div className="p-4 pt-1">
        <div className="text-xs uppercase tracking-wide text-zinc-400 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5"/> Промпт</div>
        <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{data.prompt}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {data.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 text-sm rounded-xl px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            title="Скопировать промпт"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function NanoBananaGuideSite() {
  const { dark, setDark } = useDarkMode();
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid"); // grid | list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CASES;
    return CASES.filter((c) => {
      const hay = [c.title, c.author, c.prompt, ...(c.tags || [])].join("\n").toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  // === EXPORT HELPERS ===
  const downloadStatic = () => {
    const item = (c) => `
      <article class="group rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur shadow-sm">
        <div class="p-4 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold">${String(c.id).padStart(2,'0')} · ${c.title}</h3>
            <p class="text-sm text-zinc-500 mt-0.5">Автор: ${c.author}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 pb-2">
          ${(c.input||[]).slice(0,2).map((src)=>`<div class=\"relative rounded-xl overflow-hidden border border-zinc-200\"><img src=\"${src}\" class=\"w-full h-56 object-cover\"/><span class=\"absolute left-2 top-2 text-[10px] uppercase tracking-wide bg-white/80 px-1.5 py-0.5 rounded\">Input</span></div>`).join('')}
          ${(c.output||[]).slice(0,2).map((src)=>`<div class=\"relative rounded-xl overflow-hidden border border-zinc-200\"><img src=\"${src}\" class=\"w-full h-56 object-cover\"/><span class=\"absolute left-2 top-2 text-[10px] uppercase tracking-wide bg-white/80 px-1.5 py-0.5 rounded\">Output</span></div>`).join('')}
        </div>
        <div class="p-4 pt-1">
          <div class="text-xs uppercase tracking-wide text-zinc-400">Промпт</div>
          <p class="mt-1 text-sm leading-relaxed text-zinc-700">${c.prompt}</p>
        </div>
      </article>`;

    const html = `<!doctype html><html lang="ru"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Nano Banana — Руководство (Valery Raisky)</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-50" style="font-family: Inter, system-ui, sans-serif">
<main class="max-w-7xl mx-auto p-4">
<h1 class="text-3xl md:text-5xl font-bold" style="font-family: Montserrat, system-ui, sans-serif">Nano Banana — подробный гайд</h1>
<p class="text-zinc-600 mt-2">Адаптация: Valery Raisky · CC BY 4.0</p>
<section class="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
${CASES.map(item).join('')}
</section>
<footer class="text-sm text-zinc-500 mt-12">© 2025. CC BY 4.0. Изображения принадлежат их авторам.</footer>
</main>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(CASES, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cases.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@600;700;800&display=swap');
        :root { --font-display: ${BRAND.fontHeading}; --font-body: ${BRAND.fontBody}; }
        body { font-family: var(--font-body); }
        h1,h2,h3,.font-display { font-family: var(--font-display); }
      `}</style>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {LOGO_URL ? (
            <img src={LOGO_URL} alt="RAISKY" className="w-10 h-10 rounded-xl object-contain" />
            ) : (
            <RaiskyLogo className="w-10 h-10" />
            )}
            <div>
              <div className="text-sm text-zinc-500">Руководство от</div>
              <div className="font-bold leading-tight">Valery Raisky · Nano Banana</div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 bg-white/70 dark:bg-zinc-900/60">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по кейсам, тегам и промптам..."
                className="bg-transparent text-sm outline-none placeholder-zinc-400 w-72"
              />
            </div>
            <button
              onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title="Переключить вид"
            >
              {view === "grid" ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />} {view === "grid" ? "Список" : "Сетка"}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title="Светлая/тёмная тема"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} {dark ? "Светлая" : "Тёмная"}
            </button>
            <button
              onClick={downloadStatic}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title="Скачать статический index.html"
            >
              <Download className="w-4 h-4" /> Экспорт HTML
            </button>
            <button
              onClick={downloadJSON}
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
              title="Скачать данные кейсов"
            >
              <Download className="w-4 h-4" /> JSON
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Nano Banana — <span className={`bg-clip-text text-transparent bg-gradient-to-tr ${ACCENT}`}>подробный гайд</span> с кейсами и промптами
            </h1>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-[60ch]">
              Практическое руководство: как повторить реальные кейсы, какие входы нужны, как формулировать промпты и чего избегать. Все тексты — на русском с поддержкой кириллицы.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#cases" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-tr from-fuchsia-600 to-amber-500 shadow hover:opacity-95">
                Смотреть кейсы <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#license" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                Лицензия CC BY 4.0 <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className={`rounded-3xl p-1 bg-gradient-to-tr ${ACCENT} shadow-xl`}>
              <div className="rounded-3xl bg-white dark:bg-zinc-950 p-4 md:p-6">
                <div className="grid grid-cols-2 gap-2">
                  {CASES.slice(0, 4).map((c) => (
                    <div key={c.id} className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <img src={(c.output && c.output[0]) || (c.input && c.input[0])} alt={c.title} className="w-full h-28 object-cover"/>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-zinc-500 flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5"/> Превью нескольких кейсов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 pb-16 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-auto pt-6 pr-4">
          <nav className="space-y-2">
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 text-xs text-zinc-500">
            Версия: 1.0 · Обновлено: 17 сентября 2025
          </div>
        </aside>

        {/* Main column */}
        <div className="space-y-14">
          <SectionHeader
            id="intro"
            icon={LinkIcon}
            title="Введение"
            subtitle="Что такое Nano Banana и чем он полезен дизайнеру: мульти‑референсы, точное следование промптам, широкий спектр прикладных задач от product‑съёмки до комиксов и выставок."
          />

          <SectionHeader
            id="quickstart"
            icon={ChevronRight}
            title="Быстрый старт"
            subtitle="1) Подготовьте входы (Input). 2) Скопируйте промпт. 3) Соблюдайте соответствие кейсов. 4) Проверяйте детали (логотипы, вертикали, тени). 5) Экспортируйте в 4K."
          />

          <SectionHeader
            id="tips"
            icon={BookOpen}
            title="Практические советы"
            subtitle="Структурируйте промпт, явно указывайте донор света/материала, фиксируйте камеру и seed для серии, прописывайте сетку композиции."
          />

          {/* Search bar (mobile) */}
          <div className="md:hidden">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-white/70 dark:bg-zinc-900/60">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по кейсам, тегам и промптам..."
                className="bg-transparent text-sm outline-none placeholder-zinc-400 w-full"
              />
            </div>
          </div>

          <SectionHeader
            id="cases"
            icon={LayoutGrid}
            title={`Кейсы · ${filtered.length} из ${CASES.length}`}
            subtitle="Набор реальных примеров с Input/Output. Жмите «Копировать» рядом с промптом. Фильтруйте по поиску выше."
          />

          {/* Cases grid/list */}
          {view === "grid" ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((c) => (
                <CaseCard key={c.id} data={c} />
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((c) => (
                <CaseCard key={c.id} data={c} />
              ))}
            </div>
          )}

          <SectionHeader
            id="patterns"
            icon={ImageIcon}
            title="Рабочие паттерны"
            subtitle="Карточки товара (30/41/53/49/50), айдентика и мерч (39/60/68/82–83), персонажи (10–13/34–36/40), образование и инфографика (14/28/31/47/48/56–59/76)."
          />

          <SectionHeader
            id="faq"
            icon={QuestionMarkIcon}
            title="ЧаВо"
            subtitle="Почему не переносится свет/материал? — Проверьте, что в промпте явно указан донор и загружены оба входа. Слишком общий промпт? — Уточните зону интереса, камеру, свет, разрешение, список объектов. Рвётся серия? — фиксируйте камеру/seed."
          />

          <SectionHeader
            id="license"
            icon={LinkIcon}
            title="Лицензия и благодарности"
            subtitle="Основано на публичной подборке «Awesome Nano‑Banana images» (Creative Commons CC BY 4.0). При перепечатке указывайте источник и авторов кейсов. Адаптация и русская локализация — Valery Raisky."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Valery Raisky · Nano Banana</div>
            <div className="text-sm text-zinc-500 mt-1">© 2025. CC BY 4.0. Изображения принадлежат их авторам; ссылки ведут на исходный репозиторий кейсов.</div>
          </div>
          <a
            href="#intro"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            title="Наверх"
          >
            Наверх <ChevronRight className="w-4 h-4 rotate-90" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function RaiskyLogo({ className }) {
  return (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="128" height="128" rx="24" fill="url(#rg)"/>
      <path d="M36 96c22 0 40-18 40-40 0-10-8-18-18-18h-6l8-16c1-2-1-4-3-3l-22 9c-2 1-3 4-2 6l6 10h-3c-10 0-18 8-18 18 0 19 16 34 36 34Z" fill="white" opacity="0.9"/>
      <path d="M92 22c3 4-3 12-8 13 0-6 5-13 8-13Zm-56 0c-3 4 3 12 8 13 0-6-5-13-8-13Z" fill="white"/>
    </svg>
  );
}

function QuestionMarkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" {...props}>
      <path d="M12 17a.75.75 0 1 0 0 1.5A.75.75 0 0 0 12 17Zm0-12a6 6 0 0 0-6 6 .75.75 0 1 0 1.5 0 4.5 4.5 0 1 1 9 0c0 1.462-.713 2.192-2.16 3.266-1.08.807-1.59 1.26-1.59 2.234v.25a.75.75 0 0 0 1.5 0v-.25c0-.424.21-.63 1.26-1.416C16.735 13.061 18 12.038 18 11a6 6 0 0 0-6-6Z" fill="currentColor" />
    </svg>
  );
}
