"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";

type CardNavLink = {
  label: string;
  ariaLabel: string;
  href: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

type CardNavProps = {
  logo?: string;
  logoAlt?: string;
  logoText?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonLabel?: string;
  buttonHref?: string;
  cartCount?: number;
};

export default function CardNav({
  logo,
  logoAlt = "Remocha logo",
  logoText = "Remocha",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#FFFCF8",
  menuColor = "#4A3731",
  buttonBgColor = "#D98286",
  buttonTextColor = "#FFFFFF",
  buttonLabel = "Cart",
  buttonHref = "/cart",
  cartCount = 0,
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const menuId = useId();

  const visibleItems = items.slice(0, 3);

  const calculateHeight = () => {
    const navElement = navRef.current;

    if (!navElement) {
      return 320;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const contentElement =
        navElement.querySelector<HTMLElement>(".card-nav-content");

      if (contentElement) {
        const previousStyles = {
          visibility: contentElement.style.visibility,
          pointerEvents: contentElement.style.pointerEvents,
          position: contentElement.style.position,
          height: contentElement.style.height,
          display: contentElement.style.display,
        };

        contentElement.style.visibility = "visible";
        contentElement.style.pointerEvents = "auto";
        contentElement.style.position = "static";
        contentElement.style.height = "auto";
        contentElement.style.display = "flex";

        const contentHeight = contentElement.scrollHeight;

        contentElement.style.visibility = previousStyles.visibility;
        contentElement.style.pointerEvents = previousStyles.pointerEvents;
        contentElement.style.position = previousStyles.position;
        contentElement.style.height = previousStyles.height;
        contentElement.style.display = previousStyles.display;

        const topBarHeight = 68;
        const bottomPadding = 16;

        return topBarHeight + contentHeight + bottomPadding;
      }
    }

    return 310;
  };

  const createTimeline = () => {
    const navElement = navRef.current;

    if (!navElement) {
      return null;
    }

    gsap.set(navElement, {
      height: 68,
      overflow: "hidden",
    });

    gsap.set(cardsRef.current, {
      y: 36,
      opacity: 0,
      scale: 0.97,
    });

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease,
      },
    });

    timeline.to(navElement, {
      height: calculateHeight,
      duration: 0.45,
    });

    timeline.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.42,
        stagger: 0.07,
      },
      "-=0.24",
    );

    return timeline;
  };

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = createTimeline();
      tlRef.current = timeline;
    }, navRef);

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      context.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const currentTimeline = tlRef.current;

      if (!currentTimeline) {
        return;
      }

      currentTimeline.kill();

      const newTimeline = createTimeline();

      if (!newTimeline) {
        return;
      }

      if (isExpanded) {
        newTimeline.progress(1);
        gsap.set(navRef.current, {
          height: calculateHeight(),
        });
      }

      tlRef.current = newTimeline;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useLayoutEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const previousOverflow = document.body.style.overflow;

    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const openMenu = () => {
    const timeline = tlRef.current;

    if (!timeline) {
      return;
    }

    setIsHamburgerOpen(true);
    setIsExpanded(true);

    timeline.eventCallback("onReverseComplete", null);
    timeline.play(0);
  };

  const closeMenu = () => {
    const timeline = tlRef.current;

    if (!timeline) {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
      return;
    }

    setIsHamburgerOpen(false);

    timeline.eventCallback("onReverseComplete", () => {
      setIsExpanded(false);
      timeline.eventCallback("onReverseComplete", null);
    });

    timeline.reverse();
  };

  const toggleMenu = () => {
    if (isExpanded) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
    if (element) {
      cardsRef.current[index] = element;
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" && !isExpanded) {
      event.preventDefault();
      openMenu();
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-[98] bg-[#2F211D]/20 backdrop-blur-[3px] transition duration-300 ${
          isExpanded
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`card-nav-container fixed left-1/2 top-3 z-[99] w-[calc(100%-24px)] max-w-[980px] -translate-x-1/2 sm:top-5 sm:w-[94%] ${className}`}
      >
        <nav
          ref={navRef}
          className={`card-nav relative block h-[68px] overflow-hidden rounded-[1.4rem] border border-[#E8DCD4] p-0 shadow-[0_14px_45px_rgba(85,57,47,0.12)] backdrop-blur-xl will-change-[height] transition-shadow duration-300 ${
            isExpanded
              ? "shadow-[0_24px_70px_rgba(85,57,47,0.2)]"
              : "hover:shadow-[0_18px_55px_rgba(85,57,47,0.16)]"
          }`}
          style={{
            backgroundColor: baseColor,
          }}
          aria-label="Main navigation"
        >
          <div className="card-nav-top absolute inset-x-0 top-0 z-[3] flex h-[68px] items-center justify-between gap-3 px-3 sm:px-4">
            <button
              type="button"
              className={`hamburger-menu group order-2 flex h-11 w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-full border border-[#E7D9D1] bg-white/80 transition duration-300 hover:border-[#D98286] hover:bg-[#FFF4F3] focus:outline-none focus:ring-4 focus:ring-[#F5DCDD] md:order-none ${
                isHamburgerOpen ? "border-[#D98286] bg-[#FFF1F1]" : ""
              }`}
              onClick={toggleMenu}
              onKeyDown={handleMenuKeyDown}
              aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isExpanded}
              aria-controls={menuId}
              style={{
                color: menuColor,
              }}
            >
              <span className="sr-only">
                {isExpanded ? "Close menu" : "Open menu"}
              </span>

              <span
                className={`hamburger-line block h-[2px] w-[22px] rounded-full bg-current transition-[transform,opacity] duration-300 ease-out ${
                  isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />

              <span
                className={`hamburger-line block h-[2px] w-[22px] rounded-full bg-current transition-[transform,opacity] duration-300 ease-out ${
                  isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>

            <Link
              href="/"
              onClick={closeMenu}
              className="logo-container order-1 flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus:ring-4 focus:ring-[#F5DCDD] md:absolute md:left-1/2 md:top-1/2 md:order-none md:-translate-x-1/2 md:-translate-y-1/2"
              aria-label={`${logoText} homepage`}
            >
              {logo ? (
                <img
                  src={logo}
                  alt={logoAlt}
                  className="logo h-9 w-auto max-w-[120px] object-contain sm:h-10"
                />
              ) : (
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D98286] text-sm font-bold text-white shadow-[0_6px_16px_rgba(217,130,134,0.3)]">
                  R
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#718E64]">
                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                  </span>
                </span>
              )}

              <div className="min-w-0">
                <span className="block truncate text-lg font-bold tracking-[-0.03em] text-[#4A3731] sm:text-xl">
                  {logoText}
                </span>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.18em] text-[#A47B73] sm:block">
                  Handmade Mochi
                </span>
              </div>
            </Link>

            <Link
              href={buttonHref}
              onClick={closeMenu}
              className="card-nav-cta-button relative hidden h-11 cursor-pointer items-center gap-2 overflow-hidden rounded-full border-0 px-5 text-sm font-bold shadow-[0_8px_20px_rgba(217,130,134,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(217,130,134,0.34)] focus:outline-none focus:ring-4 focus:ring-[#F5DCDD] md:inline-flex"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />

              <span>{buttonLabel}</span>

              {cartCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[11px] font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          <div
            id={menuId}
            className={`card-nav-content absolute bottom-0 left-0 right-0 top-[68px] z-[2] flex flex-col items-stretch justify-start gap-2.5 p-2.5 pt-1 ${
              isExpanded
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
            } md:flex-row md:items-stretch md:gap-3`}
            aria-hidden={!isExpanded}
          >
            {visibleItems.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                ref={setCardRef(index)}
                className="nav-card group relative flex min-h-[118px] min-w-0 flex-[1_1_auto] select-none flex-col overflow-hidden rounded-[1.2rem] p-5 transition-transform duration-300 hover:-translate-y-1 md:h-full md:min-h-0 md:flex-[1_1_0%] md:p-6"
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125"
                />

                <div className="relative z-[1] flex items-start justify-between gap-3">
                  <div>
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">
                      0{index + 1}
                    </span>

                    <div className="nav-card-label text-xl font-bold tracking-[-0.03em] md:text-[24px]">
                      {item.label}
                    </div>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition duration-300 group-hover:rotate-12 group-hover:bg-white/25">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <div className="nav-card-links relative z-[1] mt-6 flex flex-col gap-1.5 md:mt-auto">
                  {item.links?.map((link, linkIndex) => (
                    <Link
                      key={`${link.label}-${linkIndex}`}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      onClick={closeMenu}
                      tabIndex={isExpanded ? 0 : -1}
                      className="nav-card-link group/link flex min-h-9 cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm font-semibold no-underline transition duration-300 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-transparent md:text-[15px]"
                    >
                      <span>{link.label}</span>

                      <ArrowRight
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              href={buttonHref}
              onClick={closeMenu}
              tabIndex={isExpanded ? 0 : -1}
              className="mt-0.5 flex min-h-12 items-center justify-between rounded-xl px-5 text-sm font-bold shadow-sm transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#F5DCDD] md:hidden"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {buttonLabel}
              </span>

              <span className="flex items-center gap-2">
                {cartCount > 0 && (
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-bold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}

                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}