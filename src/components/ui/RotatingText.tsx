"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type AnimatePresenceProps,
  type HTMLMotionProps,
  type Transition,
  type Variants,
} from "motion/react";

type SplitBy = "characters" | "words" | "lines" | string;

type StaggerFrom = "first" | "last" | "center" | "random" | number | string;

type RotatingTextProps = Omit<HTMLMotionProps<"span">, "children"> & {
  texts: string[];
  rotationInterval?: number;

  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;

  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;

  staggerDuration?: number;
  staggerFrom?: StaggerFrom;

  transition?: Transition;

  loop?: boolean;
  auto?: boolean;
  splitBy?: SplitBy;

  onNext?: (nextIndex: number) => void;

  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;

  pauseOnHover?: boolean;
  pauseWhenHidden?: boolean;

  enableBlur?: boolean;
  enableScale?: boolean;
  enableRotation?: boolean;

  showIndicator?: boolean;
  indicatorClassName?: string;

  style?: CSSProperties;
};

export type RotatingTextHandle = {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
  pause: () => void;
  play: () => void;
};

type TextElement = {
  characters: string[];
  needsSpace: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function splitIntoCharacters(text: string) {
  if (
    typeof Intl !== "undefined" &&
    "Segmenter" in Intl &&
    typeof Intl.Segmenter === "function"
  ) {
    const segmenter = new Intl.Segmenter("en", {
      granularity: "grapheme",
    });

    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }

  return Array.from(text);
}

function createSeededOrder(total: number, seed: number) {
  const values = Array.from({ length: total }, (_, index) => index);

  let currentSeed = seed + 1;

  for (let index = values.length - 1; index > 0; index -= 1) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;

    const random = currentSeed / 233280;
    const swapIndex = Math.floor(random * (index + 1));

    [values[index], values[swapIndex]] = [
      values[swapIndex],
      values[index],
    ];
  }

  return values;
}

const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(
  (
    {
      texts,
      transition = {
        type: "spring",
        damping: 24,
        stiffness: 320,
        mass: 0.8,
      },

      initial,
      animate,
      exit,

      animatePresenceMode = "wait",
      animatePresenceInitial = false,

      rotationInterval = 2500,
      staggerDuration = 0.035,
      staggerFrom = "last",

      loop = true,
      auto = true,
      splitBy = "characters",

      onNext,

      mainClassName,
      splitLevelClassName,
      elementLevelClassName,

      pauseOnHover = true,
      pauseWhenHidden = true,

      enableBlur = true,
      enableScale = true,
      enableRotation = true,

      showIndicator = false,
      indicatorClassName,

      style,
      ...rest
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const safeTexts = useMemo(
      () => texts.filter((text) => typeof text === "string" && text.length > 0),
      [texts],
    );

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isPageVisible, setIsPageVisible] = useState(true);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentText = safeTexts[currentTextIndex] ?? "";

    useEffect(() => {
      if (currentTextIndex >= safeTexts.length) {
        setCurrentTextIndex(0);
      }
    }, [currentTextIndex, safeTexts.length]);

    const defaultInitial = useMemo(
      () => ({
        y: "110%",
        opacity: 0,
        filter: enableBlur ? "blur(8px)" : "blur(0px)",
        scale: enableScale ? 0.82 : 1,
        rotateX: enableRotation ? 50 : 0,
      }),
      [enableBlur, enableRotation, enableScale],
    );

    const defaultAnimate = useMemo(
      () => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        rotateX: 0,
      }),
      [],
    );

    const defaultExit = useMemo(
      () => ({
        y: "-120%",
        opacity: 0,
        filter: enableBlur ? "blur(8px)" : "blur(0px)",
        scale: enableScale ? 0.88 : 1,
        rotateX: enableRotation ? -50 : 0,
      }),
      [enableBlur, enableRotation, enableScale],
    );

    const resolvedInitial = prefersReducedMotion
      ? { opacity: 0 }
      : initial ?? defaultInitial;

    const resolvedAnimate = prefersReducedMotion
      ? { opacity: 1 }
      : animate ?? defaultAnimate;

    const resolvedExit = prefersReducedMotion
      ? { opacity: 0 }
      : exit ?? defaultExit;

    const resolvedTransition: Transition = prefersReducedMotion
      ? {
          duration: 0.15,
        }
      : transition;

    const elements = useMemo<TextElement[]>(() => {
      if (!currentText) {
        return [];
      }

      if (splitBy === "characters") {
        const words = currentText.split(" ");

        return words.map((word, index) => ({
          characters: splitIntoCharacters(word),
          needsSpace: index !== words.length - 1,
        }));
      }

      if (splitBy === "words") {
        const words = currentText.split(" ");

        return words.map((word, index) => ({
          characters: [word],
          needsSpace: index !== words.length - 1,
        }));
      }

      if (splitBy === "lines") {
        const lines = currentText.split("\n");

        return lines.map((line, index) => ({
          characters: [line],
          needsSpace: false,
        }));
      }

      const parts = currentText.split(splitBy);

      return parts.map((part, index) => ({
        characters: [part],
        needsSpace: index !== parts.length - 1,
      }));
    }, [currentText, splitBy]);

    const totalElements = useMemo(
      () =>
        elements.reduce(
          (total, element) => total + element.characters.length,
          0,
        ),
      [elements],
    );

    const randomOrder = useMemo(
      () => createSeededOrder(totalElements, currentTextIndex),
      [currentTextIndex, totalElements],
    );

    const getStaggerDelay = useCallback(
      (index: number, total: number) => {
        if (prefersReducedMotion || staggerDuration <= 0) {
          return 0;
        }

        if (staggerFrom === "first") {
          return index * staggerDuration;
        }

        if (staggerFrom === "last") {
          return Math.max(0, total - 1 - index) * staggerDuration;
        }

        if (staggerFrom === "center") {
          const center = (total - 1) / 2;
          return Math.abs(center - index) * staggerDuration;
        }

        if (staggerFrom === "random") {
          const position = randomOrder.indexOf(index);
          return Math.max(0, position) * staggerDuration;
        }

        const numericStart = Number(staggerFrom);

        if (!Number.isNaN(numericStart)) {
          return Math.abs(numericStart - index) * staggerDuration;
        }

        return index * staggerDuration;
      },
      [
        prefersReducedMotion,
        randomOrder,
        staggerDuration,
        staggerFrom,
      ],
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        if (!safeTexts.length) {
          return;
        }

        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext, safeTexts.length],
    );

    const next = useCallback(() => {
      if (safeTexts.length <= 1) {
        return;
      }

      setCurrentTextIndex((currentIndex) => {
        const isLast = currentIndex >= safeTexts.length - 1;
        const nextIndex = isLast
          ? loop
            ? 0
            : currentIndex
          : currentIndex + 1;

        if (nextIndex !== currentIndex) {
          onNext?.(nextIndex);
        }

        return nextIndex;
      });
    }, [loop, onNext, safeTexts.length]);

    const previous = useCallback(() => {
      if (safeTexts.length <= 1) {
        return;
      }

      setCurrentTextIndex((currentIndex) => {
        const isFirst = currentIndex === 0;
        const previousIndex = isFirst
          ? loop
            ? safeTexts.length - 1
            : currentIndex
          : currentIndex - 1;

        if (previousIndex !== currentIndex) {
          onNext?.(previousIndex);
        }

        return previousIndex;
      });
    }, [loop, onNext, safeTexts.length]);

    const jumpTo = useCallback(
      (index: number) => {
        if (!safeTexts.length) {
          return;
        }

        const validIndex = Math.max(
          0,
          Math.min(index, safeTexts.length - 1),
        );

        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [
        currentTextIndex,
        handleIndexChange,
        safeTexts.length,
      ],
    );

    const reset = useCallback(() => {
      if (safeTexts.length && currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [
      currentTextIndex,
      handleIndexChange,
      safeTexts.length,
    ]);

    const pause = useCallback(() => {
      setIsPaused(true);
    }, []);

    const play = useCallback(() => {
      setIsPaused(false);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
        pause,
        play,
      }),
      [jumpTo, next, pause, play, previous, reset],
    );

    useEffect(() => {
      if (!pauseWhenHidden) {
        return;
      }

      const handleVisibilityChange = () => {
        setIsPageVisible(document.visibilityState === "visible");
      };

      handleVisibilityChange();

      document.addEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    }, [pauseWhenHidden]);

    useEffect(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const shouldRun =
        auto &&
        !isPaused &&
        isPageVisible &&
        safeTexts.length > 1 &&
        rotationInterval > 0;

      if (!shouldRun) {
        return;
      }

      intervalRef.current = setInterval(next, rotationInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [
      auto,
      isPageVisible,
      isPaused,
      next,
      rotationInterval,
      safeTexts.length,
    ]);

    if (!safeTexts.length) {
      return null;
    }

    const textVariants: Variants = {
      initial: resolvedInitial,
      animate: resolvedAnimate,
      exit: resolvedExit,
    };

    return (
      <motion.span
        className={cn(
          "relative inline-flex min-w-0 items-center",
          mainClassName,
        )}
        style={{
          perspective: "800px",
          transformStyle: "preserve-3d",
          ...style,
        }}
        onMouseEnter={(event) => {
          if (pauseOnHover) {
            pause();
          }

          rest.onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (pauseOnHover) {
            play();
          }

          rest.onMouseLeave?.(event);
        }}
        layout
        transition={resolvedTransition}
        {...rest}
      >
        <span className="sr-only" aria-live="polite">
          {currentText}
        </span>

        <span
          aria-hidden="true"
          className="relative inline-grid overflow-hidden"
        >
          <AnimatePresence
            mode={animatePresenceMode}
            initial={animatePresenceInitial}
          >
            <motion.span
              key={`${currentTextIndex}-${currentText}`}
              className={cn(
                "col-start-1 row-start-1",
                splitBy === "lines"
                  ? "flex w-full flex-col"
                  : "relative flex flex-wrap whitespace-pre-wrap",
              )}
              layout
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {elements.map((element, elementIndex) => {
                const previousElementCount = elements
                  .slice(0, elementIndex)
                  .reduce(
                    (total, previousElement) =>
                      total + previousElement.characters.length,
                    0,
                  );

                return (
                  <span
                    key={`${currentTextIndex}-${elementIndex}`}
                    className={cn(
                      splitBy === "lines"
                        ? "block"
                        : "inline-flex",
                      splitLevelClassName,
                    )}
                  >
                    {element.characters.map(
                      (character, characterIndex) => {
                        const globalIndex =
                          previousElementCount + characterIndex;

                        return (
                          <motion.span
                            key={`${character}-${characterIndex}`}
                            variants={textVariants}
                            transition={{
                              ...resolvedTransition,
                              delay: getStaggerDelay(
                                globalIndex,
                                totalElements,
                              ),
                            }}
                            className={cn(
                              "inline-block origin-center will-change-transform",
                              elementLevelClassName,
                            )}
                            style={{
                              backfaceVisibility: "hidden",
                              transformStyle: "preserve-3d",
                            }}
                          >
                            {character}
                          </motion.span>
                        );
                      },
                    )}

                    {element.needsSpace && (
                      <span className="whitespace-pre"> </span>
                    )}
                  </span>
                );
              })}
            </motion.span>
          </AnimatePresence>
        </span>

        {showIndicator && safeTexts.length > 1 && (
          <span
            aria-hidden="true"
            className={cn(
              "ml-2 inline-flex items-center gap-1",
              indicatorClassName,
            )}
          >
            {safeTexts.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentTextIndex
                    ? "w-4 bg-current opacity-100"
                    : "w-1.5 bg-current opacity-30",
                )}
              />
            ))}
          </span>
        )}
      </motion.span>
    );
  },
);

RotatingText.displayName = "RotatingText";

export default RotatingText;