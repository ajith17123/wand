import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "../assets/style/Home.css";

// Harry Potter Themed Generated & Authentic Images
import HOGWARTS_BG from "../assets/images/harrypotter-castle-epic.jpg";
import CAROUSEL_EXPRESS from "../assets/images/carousel-express.jpg";
import CAROUSEL_GREAT_HALL from "../assets/images/carousel-great-hall.jpg";
import CAROUSEL_OLLIVANDERS from "../assets/images/carousel-ollivanders.jpg";

// Real House Crests & Sorting Hat Images
import HOUSE_GRYFFINDOR from "../assets/images/house-gryffindor.jpg";
import HOUSE_SLYTHERIN from "../assets/images/house-slytherin.jpg";
import HOUSE_RAVENCLAW from "../assets/images/house-ravenclaw.jpg";
import HOUSE_HUFFLEPUFF from "../assets/images/house-hufflepuff.jpg";
import SORTING_HAT_REAL from "../assets/images/sorting-hat-real.jpg";

// Real Wand Products
import WAND_ELDER from "../assets/images/wand-elder.jpg";
import WAND_HOLLY from "../assets/images/wand-holly.jpg";
import WAND_VINE from "../assets/images/wand-vine.jpg";
import WAND_YEW from "../assets/images/wand-yew.jpg";
import WAND_EBONY from "../assets/images/wand-ebony.jpg";

gsap.registerPlugin(ScrollTrigger);

// Lightweight Web Audio synthesizer for magical effects (no external audio files needed)
const playMagicChime = (frequency = 520, type = "sine", duration = 0.5) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback if AudioContext is blocked
  }
};

// 4 Hogwarts Houses with Real Authentic Photographic Crests
const HOUSES = [
  {
    id: "gryffindor",
    name: "Gryffindor",
    crestImg: HOUSE_GRYFFINDOR,
    founder: "Godric Gryffindor",
    trait: "Courage, Bravery & Chivalry",
    accent: "#f59e0b",
    accentDeep: "#780016",
    glow: "rgba(245, 158, 11, 0.55)",
    motto: "Forti Animo Estote — Where dwell the brave at heart",
    freq: 440,
  },
  {
    id: "slytherin",
    name: "Slytherin",
    crestImg: HOUSE_SLYTHERIN,
    founder: "Salazar Slytherin",
    trait: "Ambition, Cunning & Resourcefulness",
    accent: "#10b981",
    accentDeep: "#064e3b",
    glow: "rgba(16, 185, 129, 0.55)",
    motto: "Slytherin will help you on your way to greatness",
    freq: 380,
  },
  {
    id: "ravenclaw",
    name: "Ravenclaw",
    crestImg: HOUSE_RAVENCLAW,
    founder: "Rowena Ravenclaw",
    trait: "Wisdom, Wit & Intellect",
    accent: "#38bdf8",
    accentDeep: "#0f2c59",
    glow: "rgba(56, 189, 248, 0.55)",
    motto: "Wit beyond measure is man's greatest treasure",
    freq: 580,
  },
  {
    id: "hufflepuff",
    name: "Hufflepuff",
    crestImg: HOUSE_HUFFLEPUFF,
    founder: "Helga Hufflepuff",
    trait: "Loyalty, Dedication & Fair Play",
    accent: "#eab308",
    accentDeep: "#382314",
    glow: "rgba(234, 179, 8, 0.55)",
    motto: "Where they are just and loyal, patient and true",
    freq: 494,
  },
];

// Carousel Slides
const CAROUSEL_SLIDES = [
  {
    id: 1,
    tag: "Platform 9¾ • King's Cross",
    title: "The Hogwarts Express Awaits",
    subtitle: "Cross the magical barrier and embark on your journey through the enchanted Scottish Highlands.",
    image: CAROUSEL_EXPRESS,
    badge: "Term Starts Sept 1st",
    ctaText: "Discover the Journey",
    ctaTarget: "chamber",
  },
  {
    id: 2,
    tag: "Diagon Alley • Est. 382 B.C.",
    title: "Ollivanders: Makers of Fine Wands",
    subtitle: "Ancient elder, rowan, and holly woods bound with phoenix feather, dragon heartstring & thestral tail cores.",
    image: CAROUSEL_OLLIVANDERS,
    badge: "The Wand Chooses The Wizard",
    ctaText: "Browse Wand Vault",
    ctaTarget: "wands",
  },
  {
    id: 3,
    tag: "Hogwarts Castle • Great Hall",
    title: "The Enchanted Floating Banquets",
    subtitle: "Beneath thousand floating candles and bewitched weather ceilings, ancient traditions are celebrated.",
    image: CAROUSEL_GREAT_HALL,
    badge: "Enchanted Ceilings",
    ctaText: "Step into The Hall",
    ctaTarget: "spells",
  },
];

// Wand Stick Products
const WAND_PRODUCTS = [
  {
    id: "elder-wand",
    name: "The Elder Wand",
    subtitle: "The Deathstick / Wand of Destiny",
    wood: "Elder Wood",
    core: "Thestral Tail Hair",
    coreType: "thestral",
    length: "15 inches",
    flex: "Unyielding & Supreme",
    priceGalleons: 35,
    allegiance: "Master of Death",
    img: WAND_ELDER,
    spellAura: "Golden Deathly Spark",
    rarity: "Legendary Relic",
    desc: "Carved with distinct spherical cluster nodes along its shaft. The most powerful wand ever forged.",
  },
  {
    id: "harry-wand",
    name: "Holly & Phoenix Feather",
    subtitle: "The Chosen One's Wand",
    wood: "Rare Holly Wood",
    core: "Phoenix Feather (Fawkes)",
    coreType: "phoenix",
    length: "11 inches",
    flex: "Nice & Supple",
    priceGalleons: 18,
    allegiance: "Harry Potter",
    img: WAND_HOLLY,
    spellAura: "Vermillion Spellfire",
    rarity: "Twin Core Masterpiece",
    desc: "Brother wand to Lord Voldemort's yew wand. Balanced with warm holly grain and the singular feather of Fawkes.",
  },
  {
    id: "hermione-wand",
    name: "Vine & Dragon Heartstring",
    subtitle: "The Brightest Witch's Instrument",
    wood: "Twisted Vine Wood",
    core: "Dragon Heartstring",
    coreType: "dragon",
    length: "10¾ inches",
    flex: "Pliable & Precise",
    priceGalleons: 16,
    allegiance: "Hermione Granger",
    img: WAND_VINE,
    spellAura: "Azure Spell Burst",
    rarity: "Ornate Artisan Carving",
    desc: "Embossed with botanical spiraling vine leaves. Renowned for producing flamboyant and extraordinarily precise charms.",
  },
  {
    id: "voldemort-wand",
    name: "Yew & Phoenix Feather",
    subtitle: "The Dark Lord's Talon",
    wood: "Pale Yew Wood",
    core: "Phoenix Feather (Fawkes)",
    coreType: "phoenix",
    length: "13½ inches",
    flex: "Surprisingly Swishy",
    priceGalleons: 28,
    allegiance: "Lord Voldemort",
    img: WAND_YEW,
    spellAura: "Emerald Avada Flare",
    rarity: "Dark Arts Collector",
    desc: "Sculpted with a pale bone-like hooked raptor talon handle. Known for immense power in dueling and dark curses.",
  },
  {
    id: "snape-wand",
    name: "Jet Black Ebony & Dragon",
    subtitle: "The Half-Blood Prince's Precision",
    wood: "Midnight Ebony Wood",
    core: "Dragon Heartstring",
    coreType: "dragon",
    length: "13 inches",
    flex: "Rigid & Unwavering",
    priceGalleons: 19,
    allegiance: "Severus Snape",
    img: WAND_EBONY,
    spellAura: "Moonlit Silver Beam",
    rarity: "Pure Aristocratic Cut",
    desc: "Turned fluted ebony handle with a razor-straight shaft. Preferred by master potion-brewers and occlumency masters.",
  },
];

// Interactive Spells
const SPELLS = [
  {
    name: "Expecto Patronum",
    incantation: "ex-PEK-toh pa-TROH-num",
    effect: "Conjures a dazzling silver celestial guardian spirit to repel Dementors.",
    color: "#e0f2fe",
    aura: "silver-glow",
    icon: "🦌",
    freq: 720,
  },
  {
    name: "Lumos Maxima",
    incantation: "LOO-mos MAX-i-ma",
    effect: "Flashes an intense radiant burst of golden sunlight from the wand tip.",
    color: "#fef08a",
    aura: "gold-glow",
    icon: "✨",
    freq: 640,
  },
  {
    name: "Wingardium Leviosa",
    incantation: "win-GAR-dee-um lev-ee-OH-sa",
    effect: "Makes objects effortlessly hover and dance through mid-air with a swish and flick.",
    color: "#a7f3d0",
    aura: "emerald-glow",
    icon: "🪶",
    freq: 540,
  },
  {
    name: "Alohomora",
    incantation: "ah-LOH-ho-MOH-rah",
    effect: "Unlocks sealed doors, heavy iron grates, and enchanted lock mechanisms.",
    color: "#fed7aa",
    aura: "amber-glow",
    icon: "🗝️",
    freq: 460,
  },
  {
    name: "Expelliarmus",
    incantation: "ex-pel-ee-AR-mus",
    effect: "Disarms an opponent in duel, blasting their wand instantly into your hand.",
    color: "#fca5a5",
    aura: "crimson-glow",
    icon: "⚡",
    freq: 330,
  },
  {
    name: "Avada Kedavra",
    incantation: "ah-VAH-dah keh-DAHV-rah",
    effect: "The Unforgivable green flash — strictly locked under Ministry decree.",
    color: "#86efac",
    aura: "dark-glow",
    icon: "💀",
    freq: 220,
  },
];

// Apothecary Relics
const APOTHECARY_RELICS = [
  {
    id: "felix-felicis",
    name: "Felix Felicis (Liquid Luck)",
    subtitle: "Brewed for 6 Months under Full Moons",
    notes: "One sip brings pure extraordinary fortune to all endeavours until nightfall.",
    priceGalleons: 12,
    badge: "Potions Grade A",
  },
  {
    id: "marauders-map",
    name: "Marauder's Map Parchment",
    subtitle: "I Solemnly Swear That I Am Up to No Good",
    notes: "Detailed magical layout of Hogwarts with real-time footsteps of every dweller.",
    priceGalleons: 15,
    badge: "Mischief Managed",
  },
  {
    id: "golden-snitch",
    name: "Enchanted Golden Snitch",
    subtitle: "Spun in Pure Gold with Silver Wings",
    notes: "Possesses flesh memory. Will only open for the Seeker who first touched it with their lips.",
    priceGalleons: 22,
    badge: "Official Quidditch",
  },
  {
    id: "time-turner",
    name: "Ministry Time-Turner",
    subtitle: "Hourglass with Sparkling Chronos Sand",
    notes: "Turn the golden wheel once per hour to travel backwards through the fabric of time.",
    priceGalleons: 40,
    badge: "Department of Mysteries",
  },
];

export default function Home() {
  const [selectedHouse, setSelectedHouse] = useState(HOUSES[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [coreFilter, setCoreFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSpell, setActiveSpell] = useState(null);
  const [spellMessage, setSpellMessage] = useState("");
  const [wandEffect, setWandEffect] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribedMessage, setSubscribedMessage] = useState(false);
  const [lumosMode, setLumosMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [sampleRelic, setSampleRelic] = useState(null);

  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const carouselTimerRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Parallax on Background & Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
      }

      gsap.to(".magic-particle", {
        y: "-=45",
        x: "+=12",
        opacity: 0,
        repeat: -1,
        duration: 3.5,
        ease: "power1.out",
        stagger: { each: 0.3, from: "random" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Dynamic Smooth Scroll Function
  const scrollToTarget = (targetId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -60, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Carousel Auto-Play Timer
  useEffect(() => {
    carouselTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6500);

    return () => clearInterval(carouselTimerRef.current);
  }, []);

  const nextSlide = () => {
    clearInterval(carouselTimerRef.current);
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    playMagicChime(420, "triangle", 0.2);
  };

  const prevSlide = () => {
    clearInterval(carouselTimerRef.current);
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    playMagicChime(360, "triangle", 0.2);
  };

  const selectSlide = (index) => {
    clearInterval(carouselTimerRef.current);
    setCurrentSlide(index);
    playMagicChime(400 + index * 40, "sine", 0.25);
  };

  // 3D Cursor Parallax
  const handleMouseMove = (e) => {
    if (!bgRef.current) return;
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;

    gsap.to(bgRef.current, {
      x: dx * 16,
      y: dy * 10,
      duration: 1.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Card 3D tilt on hover (Desktop only)
  const handleCardMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY = ((x / rect.width) - 0.5) * 8;
    const rotX = -((y / rect.height) - 0.5) * 8;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 900,
      scale: 1.015,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (e) => {
    if (window.innerWidth < 1024) return;
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  // Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  // Add item to satchel (cart)
  const addToSatchel = (item) => {
    playMagicChime(620, "sine", 0.4);
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setWandEffect(item.id);
    triggerToast(`✨ Added "${item.name}" to your satchel!`);
    setTimeout(() => setWandEffect(null), 1500);
  };

  // Change quantity in satchel
  const updateQuantity = (id, delta) => {
    playMagicChime(480, "sine", 0.15);
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove from satchel
  const removeFromSatchel = (id) => {
    playMagicChime(320, "sawtooth", 0.25);
    setCart((prev) => prev.filter((item) => item.id !== id));
    triggerToast("🗑️ Item returned to Ollivanders Vault.");
  };

  // Cast spell interaction
  const castSpell = (spell) => {
    playMagicChime(spell.freq || 550, "triangle", 0.65);
    setActiveSpell(spell);
    setSpellMessage(`⚡ Cast ${spell.name}! ${spell.effect}`);
    setTimeout(() => {
      setActiveSpell(null);
      setSpellMessage("");
    }, 2800);
  };

  // Select House
  const handleHouseSelect = (house) => {
    setSelectedHouse(house);
    playMagicChime(house.freq || 440, "sine", 0.6);
    triggerToast(`🦁 House pledge renewed: ${house.name}!`);
  };

  const filteredWands =
    coreFilter === "all"
      ? WAND_PRODUCTS
      : WAND_PRODUCTS.filter((w) => w.coreType === coreFilter);

  const magicParticles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 13) % 96}%`,
    top: `${(i * 19) % 94}%`,
    size: 2 + (i % 3),
    duration: 3 + (i % 3),
    delay: (i * 0.2) % 2,
  }));

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.priceGalleons * item.qty,
    0
  );

  return (
    <div
      ref={rootRef}
      className={`wizard-app ${lumosMode ? "lumos-active" : ""}`}
      onMouseMove={handleMouseMove}
      style={{
        "--house-accent": selectedHouse.accent,
        "--house-deep": selectedHouse.accentDeep,
        "--house-glow": selectedHouse.glow,
      }}
    >
      {/* 4K FULL-BODY HARRY POTTER PARALLAX BACKGROUND */}
      <div className="parallax-viewport" aria-hidden="true">
        <div
          ref={bgRef}
          className="parallax-backdrop"
          style={{ backgroundImage: `url(${HOGWARTS_BG})` }}
        />
        <div className="atmospheric-fog" />
        <div className="house-tint-overlay" />
        <div className="vignette-overlay" />

        <div className="magic-particles">
          {magicParticles.map((p) => (
            <span
              key={p.id}
              className="magic-particle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* DYNAMIC TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="wizard-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SPELL FLASH OVERLAY */}
      {activeSpell && (
        <div className={`spell-flash ${activeSpell.aura}`} onClick={() => setActiveSpell(null)}>
          <div className="spell-incantation-popup" onClick={(e) => e.stopPropagation()}>
            <span className="spell-glyph">{activeSpell.icon}</span>
            <h3 className="spell-popup-name">{activeSpell.name}</h3>
            <p className="spell-popup-incantation">"{activeSpell.incantation}"</p>
            <p className="spell-popup-effect">{activeSpell.effect}</p>
            <button className="btn-close-spell" onClick={() => setActiveSpell(null)}>
              Dismiss Charm ✕
            </button>
          </div>
        </div>
      )}

      {/* SAMPLE RELIC INSPECTION MODAL */}
      {sampleRelic && (
        <div className="relic-modal-backdrop" onClick={() => setSampleRelic(null)}>
          <div className="relic-modal" onClick={(e) => e.stopPropagation()}>
            <span className="relic-modal-badge">{sampleRelic.badge}</span>
            <h3 className="relic-modal-title">{sampleRelic.name}</h3>
            <p className="relic-modal-sub">"{sampleRelic.subtitle}"</p>
            <p className="relic-modal-desc">{sampleRelic.notes}</p>
            <div className="relic-modal-footer">
              <span className="relic-modal-price">{sampleRelic.priceGalleons} Galleons</span>
              <div className="relic-modal-btns">
                <button
                  className="btn-gold-glow"
                  onClick={() => {
                    addToSatchel({
                      id: sampleRelic.id,
                      name: sampleRelic.name,
                      wood: "Antiquity Artifact",
                      core: "Enchanted Essence",
                      length: "Pocket Relic",
                      priceGalleons: sampleRelic.priceGalleons,
                      img: sampleRelic.id === "felix-felicis" ? CAROUSEL_GREAT_HALL : CAROUSEL_OLLIVANDERS,
                    });
                    setSampleRelic(null);
                  }}
                >
                  🎒 Acquire Relic
                </button>
                <button className="btn-parchment-outline" onClick={() => setSampleRelic(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OWL POST CHECKOUT CONFIRMATION MODAL */}
      {checkoutModalOpen && (
        <div className="checkout-modal-backdrop" onClick={() => setCheckoutModalOpen(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-seal-badge">⚡</div>
            <h2>Ministry Sealed Owl Dispatch</h2>
            <p className="modal-subtitle">Order Authenticated by Ollivanders Wandmakers</p>
            
            <div className="modal-receipt">
              <div className="receipt-row header">
                <span>Item</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="receipt-row">
                  <span>{item.name}</span>
                  <span>×{item.qty}</span>
                  <span>{item.priceGalleons * item.qty} Galleons</span>
                </div>
              ))}
              <div className="receipt-total">
                <span>Grand Total:</span>
                <span className="total-gold">{cartTotal} Galleons</span>
              </div>
            </div>

            <p className="dispatch-notice">
              🦉 A certified Ministry owl has taken flight from Diagon Alley Chimney #382.
              Expect arrival at your window within one lunar hour!
            </p>

            <button
              className="btn-gold-glow w-full"
              onClick={() => {
                playMagicChime(750, "sine", 0.6);
                setCart([]);
                setCheckoutModalOpen(false);
                setCartOpen(false);
                triggerToast("🦉 Order dispatched via Owl Post!");
              }}
            >
              ✦ Mischief Managed (Close) ✦
            </button>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="wizard-navbar">
        <div className="nav-container">
          <button
            type="button"
            className="brand-logo"
            onClick={() => scrollToTarget("hero")}
            aria-label="Scroll to top"
          >
            <span className="wand-icon">🪄</span>
            <div className="brand-text">
              <span className="brand-title">Ollivanders</span>
              <span className="brand-sub">Makers of Fine Wands Since 382 B.C.</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            <button type="button" onClick={() => scrollToTarget("hero")} className="nav-link">
              Great Hall
            </button>
            <button type="button" onClick={() => scrollToTarget("wands")} className="nav-link">
              Wand Vault
            </button>
            <button type="button" onClick={() => scrollToTarget("chamber")} className="nav-link">
              Sorting Hat
            </button>
            <button type="button" onClick={() => scrollToTarget("spells")} className="nav-link">
              Spellbook
            </button>
            <button type="button" onClick={() => scrollToTarget("apothecary")} className="nav-link">
              Apothecary
            </button>
            <button type="button" onClick={() => scrollToTarget("owlpost")} className="nav-link">
              Owl Post
            </button>
          </nav>

          <div className="nav-actions">
            {/* Lumos / Nox Toggle */}
            <button
              type="button"
              className={`btn-lumos ${lumosMode ? "active" : ""}`}
              onClick={() => {
                playMagicChime(lumosMode ? 300 : 700, "sine", 0.3);
                setLumosMode(!lumosMode);
              }}
              title={lumosMode ? "Nox! (Extinguish Light)" : "Lumos! (Light Wand)"}
            >
              <span>{lumosMode ? "🌙 Nox" : "✨ Lumos"}</span>
            </button>

            {/* Satchel Cart Button */}
            <button
              type="button"
              className="btn-satchel"
              onClick={() => {
                playMagicChime(500, "sine", 0.2);
                setCartOpen(true);
              }}
              aria-label="Open satchel cart"
            >
              <span className="satchel-icon">🎒</span>
              <span className="satchel-label">Satchel</span>
              <span className="satchel-count">
                {cart.reduce((total, item) => total + item.qty, 0)}
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`btn-hamburger ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => {
                playMagicChime(420, "triangle", 0.2);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU SLIDE DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <aside className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-head">
              <span className="menu-brand">⚡ Hogwarts Navigation</span>
              <button
                className="btn-close-menu"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="mobile-nav-links">
              <button type="button" onClick={() => scrollToTarget("hero")} className="mobile-link">
                🏰 Great Hall Carousel
              </button>
              <button type="button" onClick={() => scrollToTarget("wands")} className="mobile-link">
                🪄 Ollivanders Wand Vault
              </button>
              <button type="button" onClick={() => scrollToTarget("chamber")} className="mobile-link">
                🧙‍♂️ Sorting Hat Chamber
              </button>
              <button type="button" onClick={() => scrollToTarget("spells")} className="mobile-link">
                📜 Standard Book of Spells
              </button>
              <button type="button" onClick={() => scrollToTarget("apothecary")} className="mobile-link">
                🧪 Apothecary &amp; Antiquities
              </button>
              <button type="button" onClick={() => scrollToTarget("owlpost")} className="mobile-link">
                ✉️ Owl Post Dispatch
              </button>
            </nav>
            <div className="mobile-menu-foot">
              <p>House Harmonized: <strong>{selectedHouse.name}</strong></p>
            </div>
          </aside>
        </div>
      )}

      {/* SATCHEL / CART DRAWER */}
      {cartOpen && (
        <div className="satchel-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="satchel-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Wizarding Satchel"
          >
            <div className="drawer-header">
              <div className="drawer-title-group">
                <h3>📜 Your Wizarding Satchel</h3>
                <span className="satchel-motto">Authenticated by Ollivanders</span>
              </div>
              <button
                className="btn-close-drawer"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="empty-satchel">
                  <span className="empty-icon">🪶</span>
                  <p>Your satchel is presently empty of magical instruments.</p>
                  <button
                    type="button"
                    className="btn-parchment"
                    onClick={() => {
                      setCartOpen(false);
                      scrollToTarget("wands");
                    }}
                  >
                    Explore Wand Vault
                  </button>
                </div>
              ) : (
                <ul className="satchel-items">
                  {cart.map((item) => (
                    <li key={item.id} className="satchel-item">
                      <img src={item.img} alt={item.name} className="satchel-thumb" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-specs">
                          {item.wood} • {item.length}
                        </p>
                        <div className="item-pricing">
                          <span className="unit-price">
                            {item.priceGalleons} Galleons each
                          </span>
                          <span className="item-subtotal">
                            {item.priceGalleons * item.qty} ⚡
                          </span>
                        </div>
                        <div className="quantity-controls">
                          <button
                            type="button"
                            className="btn-qty"
                            onClick={() => updateQuantity(item.id, -1)}
                            title="Decrease quantity"
                          >
                            –
                          </button>
                          <span className="qty-count">{item.qty}</span>
                          <button
                            type="button"
                            className="btn-qty"
                            onClick={() => updateQuantity(item.id, 1)}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => removeFromSatchel(item.id)}
                        title="Remove from satchel"
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="satchel-total">
                  <span>Grand Total:</span>
                  <span className="total-gold">{cartTotal} Galleons</span>
                </div>
                <button
                  type="button"
                  className="btn-gold-glow w-full"
                  onClick={() => {
                    playMagicChime(680, "sine", 0.5);
                    setCheckoutModalOpen(true);
                  }}
                >
                  ⚡ Seal with Owl Post Checkout
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <main>
        {/* SECTION 1: HERO & CAROUSEL (VIEWPORT FITTED) */}
        <section className="viewport-section hero-section" id="hero">
          <div className="hero-carousel-wrapper" id="carousel">
            <div className="carousel-stage">
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`carousel-slide ${idx === currentSlide ? "active" : ""}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="carousel-slide-img"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  <div className="slide-gradient" />
                  <div className="slide-content-box">
                    <span className="slide-tag">
                      ✦ {slide.tag} ✦
                    </span>
                    <h1 className="slide-title">
                      {slide.title}
                    </h1>
                    <p className="slide-desc">
                      {slide.subtitle}
                    </p>
                    <div className="slide-buttons">
                      <button
                        type="button"
                        className="btn-gold-glow"
                        onClick={() => scrollToTarget(slide.ctaTarget)}
                      >
                        <span>{slide.ctaText}</span>
                      </button>
                      <button
                        type="button"
                        className="btn-parchment-outline"
                        onClick={() => scrollToTarget("chamber")}
                      >
                        <span>The Sorting Ceremony</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-arrow prev"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              ❮
            </button>
            <button
              className="carousel-arrow next"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              ❯
            </button>
          </div>

          <div className="stats-banner">
            <div className="stat-card">
              <span className="stat-num">382 B.C.</span>
              <span className="stat-label">Ollivanders Founded</span>
            </div>
            <div className="stat-divider">⚡</div>
            <div className="stat-card">
              <span className="stat-num">12,400+</span>
              <span className="stat-label">Wands Chosen</span>
            </div>
            <div className="stat-divider">⚡</div>
            <div className="stat-card">
              <span className="stat-num">4 Houses</span>
              <span className="stat-label">Hogwarts Harmony</span>
            </div>
            <div className="stat-divider">⚡</div>
            <div className="stat-card">
              <span className="stat-num">100%</span>
              <span className="stat-label">Ministry Authenticated</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: OLLIVANDERS WAND STICK COLLECTION (VIEWPORT FITTED) */}
        <section className="viewport-section section-wands" id="wands">
          <div className="section-header">
            <span className="section-kicker">✦ Ollivanders Private Reserve ✦</span>
            <h2 className="section-title">The Sacred Wand Stick Vault</h2>
            <p className="section-subtitle">
              "The wand chooses the wizard, Mr. Potter. We can expect great things from you."
            </p>

            <div className="core-filters">
              <button
                className={`btn-filter ${coreFilter === "all" ? "active" : ""}`}
                onClick={() => {
                  playMagicChime(420, "sine", 0.15);
                  setCoreFilter("all");
                }}
              >
                All Wands ({WAND_PRODUCTS.length})
              </button>
              <button
                className={`btn-filter ${coreFilter === "phoenix" ? "active" : ""}`}
                onClick={() => {
                  playMagicChime(520, "sine", 0.15);
                  setCoreFilter("phoenix");
                }}
              >
                🔥 Phoenix Core
              </button>
              <button
                className={`btn-filter ${coreFilter === "dragon" ? "active" : ""}`}
                onClick={() => {
                  playMagicChime(460, "sine", 0.15);
                  setCoreFilter("dragon");
                }}
              >
                🐉 Dragon Heartstring
              </button>
              <button
                className={`btn-filter ${coreFilter === "thestral" ? "active" : ""}`}
                onClick={() => {
                  playMagicChime(380, "sine", 0.15);
                  setCoreFilter("thestral");
                }}
              >
                💀 Thestral Hair
              </button>
            </div>
          </div>

          <div className="wand-grid">
            {filteredWands.map((wand, index) => (
              <article
                key={wand.id}
                className={`wand-card ${wandEffect === wand.id ? "enchanted-pulse" : ""}`}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="wand-badge-row">
                  <span className="wand-rarity-pill">{wand.rarity}</span>
                  <span className="wand-allegiance-pill">
                    <span className="allegiance-crest">⚜️</span>
                    <span className="allegiance-name">{wand.allegiance}</span>
                  </span>
                </div>

                <div className="wand-image-wrap">
                  <img
                    src={wand.img}
                    alt={wand.name}
                    className="wand-photo"
                    loading="lazy"
                  />
                  <div className="wand-image-glow" />
                </div>

                <div className="wand-card-body">
                  <h3 className="wand-name">{wand.name}</h3>
                  <h4 className="wand-sub">{wand.subtitle}</h4>

                  <div className="wand-specs-table">
                    <div className="spec-row">
                      <span className="spec-key">🪵 Wood:</span>
                      <span className="spec-val">{wand.wood}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">🔮 Core:</span>
                      <span className="spec-val">{wand.core}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">📏 Length:</span>
                      <span className="spec-val">{wand.length}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">🪄 Flex:</span>
                      <span className="spec-val">{wand.flex}</span>
                    </div>
                  </div>

                  <div className="wand-footer">
                    <div className="wand-price">
                      <span className="price-tag">{wand.priceGalleons} Galleons</span>
                    </div>

                    <div className="wand-action-group">
                      <button
                        type="button"
                        className="btn-cast-spark"
                        onClick={() =>
                          castSpell({
                            name: wand.name,
                            incantation: wand.spellAura,
                            effect: `Emits radiant ${wand.spellAura} harmonics through Ollivanders test ward.`,
                            color: "#ffd700",
                            aura: "gold-glow",
                            icon: "🪄",
                            freq: 580,
                          })
                        }
                        title="Test wand magical resonance"
                      >
                        ⚡ Resonance
                      </button>
                      <button
                        type="button"
                        className="btn-add-satchel"
                        onClick={() => addToSatchel(wand)}
                      >
                        🎒 Select
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE SORTING CHAMBER (VIEWPORT FITTED WITH REAL IMAGES) */}
        <section className="viewport-section section-chamber" id="chamber">
          <div className="section-header">
            <span className="section-kicker">✦ Great Hall Ceremony ✦</span>
            <h2 className="section-title">The Sorting Chamber</h2>
            <p className="section-subtitle">
              Step before the Sorting Hat. Harmonize the entire emporium with your authentic Hogwarts house crest.
            </p>
          </div>

          <div className="houses-grid">
            {HOUSES.map((h, i) => (
              <div
                key={h.id}
                className={`house-tile ${selectedHouse.id === h.id ? "active" : ""}`}
                style={{
                  "--tile-accent": h.accent,
                  "--tile-deep": h.accentDeep,
                  "--tile-glow": h.glow,
                }}
                onClick={() => handleHouseSelect(h)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* Real Photographic House Crest */}
                <div className="house-crest-frame">
                  <img
                    src={h.crestImg}
                    alt={`${h.name} Real Crest`}
                    className="house-crest-real-img"
                    loading="lazy"
                  />
                  <div className="house-crest-gold-border" />
                </div>

                <h3 className="house-tile-title">{h.name}</h3>
                <span className="house-founder">By {h.founder}</span>
                <p className="house-traits">{h.trait}</p>
                <p className="house-motto-quote">"{h.motto}"</p>

                <button
                  type="button"
                  className="btn-select-house"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHouseSelect(h);
                  }}
                >
                  {selectedHouse.id === h.id ? "✦ Sorted ✦" : "Pledge House"}
                </button>
              </div>
            ))}
          </div>

          {/* Sorting Hat Real Image Banner */}
          <div className="sorting-verdict">
            <div className="sorting-hat-avatar">
              <img
                src={SORTING_HAT_REAL}
                alt="Authentic Hogwarts Sorting Hat"
                className="sorting-hat-real-img"
              />
            </div>
            <div className="verdict-text">
              <h3>The Sorting Hat Decrees:</h3>
              <p>
                "Ah, yes! Unquestionably belongs in <strong>{selectedHouse.name}</strong>! {selectedHouse.motto}"
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SPELLBOOK (VIEWPORT FITTED) */}
        <section className="viewport-section section-spells" id="spells">
          <div className="section-header">
            <span className="section-kicker">✦ Standard Book of Spells, Grade 7 ✦</span>
            <h2 className="section-title">Enchanted Spellbook &amp; Incantations</h2>
            <p className="section-subtitle">
              Click any spell tile to channel magical energy and trigger its radiant incantation.
            </p>
          </div>

          {spellMessage && (
            <div className="active-spell-banner">
              <span className="banner-lightning">⚡</span>
              <span>{spellMessage}</span>
            </div>
          )}

          <div className="spells-grid">
            {SPELLS.map((sp, idx) => (
              <div
                key={sp.name}
                className="spell-tile"
                onClick={() => castSpell(sp)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="spell-header">
                  <span className="spell-icon">{sp.icon}</span>
                  <span className="spell-incant">/{sp.incantation}/</span>
                </div>
                <h3 className="spell-title">{sp.name}</h3>
                <p className="spell-effect">{sp.effect}</p>
                <button
                  type="button"
                  className="btn-cast-spell"
                  onClick={(e) => {
                    e.stopPropagation();
                    castSpell(sp);
                  }}
                >
                  Cast Spell 🪄
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: APOTHECARY & RARE RELICS (VIEWPORT FITTED) */}
        <section className="viewport-section section-apothecary" id="apothecary">
          <div className="section-header">
            <span className="section-kicker">✦ Slug &amp; Jiggers Apothecary ✦</span>
            <h2 className="section-title">Rare Potions &amp; Antiquities</h2>
            <p className="section-subtitle">
              Preserved in lead-lined crystal phials from the Department of Mysteries.
            </p>
          </div>

          <div className="relics-grid">
            {APOTHECARY_RELICS.map((relic, idx) => (
              <div
                key={relic.id}
                className="relic-card"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <span className="relic-badge">{relic.badge}</span>
                <h3 className="relic-title">{relic.name}</h3>
                <h4 className="relic-sub">{relic.subtitle}</h4>
                <p className="relic-notes">{relic.notes}</p>
                <div className="relic-footer">
                  <span className="relic-price">{relic.priceGalleons} Galleons</span>
                  <div className="relic-actions">
                    <button
                      type="button"
                      className="btn-inspect-relic"
                      onClick={() => {
                        playMagicChime(490, "sine", 0.2);
                        setSampleRelic(relic);
                      }}
                      title="Inspect artifact details"
                    >
                      🔍 Inspect
                    </button>
                    <button
                      type="button"
                      className="btn-order-relic"
                      onClick={() => {
                        addToSatchel({
                          id: relic.id,
                          name: relic.name,
                          wood: "Antiquity Artifact",
                          core: "Enchanted Essence",
                          length: "Pocket Relic",
                          priceGalleons: relic.priceGalleons,
                          img: relic.id === "felix-felicis" ? CAROUSEL_GREAT_HALL : CAROUSEL_OLLIVANDERS,
                        });
                      }}
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: OWL POST DISPATCH & NEWSLETTER (VIEWPORT FITTED) */}
        <section className="viewport-section section-owlpost" id="owlpost">
          <div className="owlpost-container">
            <div className="owlpost-parchment">
              <div className="parchment-wax-seal">⚡</div>
              <span className="owlpost-header">Hogwarts Express Mail Service</span>
              <h2 className="owlpost-title">Hogwarts Acceptance &amp; Owl Dispatch</h2>
              <p className="owlpost-desc">
                Subscribe your magical owl address to receive updates on wand restocks,
                celestial alignments, and defense counter-curses.
              </p>

              {subscribedMessage ? (
                <div className="subscribed-success">
                  <p>🦉 An owl has taken flight to deliver your welcome scroll!</p>
                </div>
              ) : (
                <form
                  className="owl-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) {
                      playMagicChime(640, "sine", 0.4);
                      setSubscribedMessage(true);
                      triggerToast("✉️ Owl dispatched to " + newsletterEmail);
                      setNewsletterEmail("");
                    }
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter witch / wizard owl address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="owl-input"
                  />
                  <button type="submit" className="btn-seal">
                    Dispatch Owl ✉️
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="wizard-footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <h3>⚡ Ollivanders &amp; Emporium</h3>
            <p>
              Makers of Fine Wands since 382 B.C. South Side, Diagon Alley, London.
              Ministry of Magic Decree #792.
            </p>
            <span className="floo-code">Floo Network: DIAGON-382</span>
          </div>

          <div className="footer-col">
            <h4>Emporium Quarters</h4>
            <ul>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToTarget("hero")}>
                  Great Hall Carousel
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToTarget("wands")}>
                  Sacred Wand Vault
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToTarget("chamber")}>
                  Sorting Hat Chamber
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToTarget("spells")}>
                  Spellbook Library
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToTarget("apothecary")}>
                  Apothecary Antiquities
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hogwarts Houses</h4>
            <ul>
              {HOUSES.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    className="footer-link-btn house-switch-btn"
                    onClick={() => {
                      handleHouseSelect(h);
                      scrollToTarget("chamber");
                    }}
                  >
                    {h.id === "gryffindor" && "🦁"}
                    {h.id === "slytherin" && "🐍"}
                    {h.id === "ravenclaw" && "🦅"}
                    {h.id === "hufflepuff" && "🦡"}{" "}
                    {h.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Ministry Ethics</h4>
            <p>All cores ethically acquired under international magical creature treaties.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 382 B.C. – Present. Wizarding Emporium &amp; Ollivanders Wandmakers. All rights reserved.</p>
          <button
            type="button"
            className="btn-scroll-top"
            onClick={() => scrollToTarget("hero")}
            title="Fly back to top on Firebolt"
          >
            🧹 Fly to Top
          </button>
        </div>
      </footer>
    </div>
  );
}
