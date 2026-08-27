import { useState, useRef, useEffect } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { mantraLines, type MantraScript } from "./ShurangamaMantraText";

const body = "var(--font-body, Lora, Georgia, serif)";
const accentOnCard = "var(--color-accent-on-card, var(--color-accent-gold))";
const mutedOnCard = "var(--color-muted-on-card, var(--muted-foreground))";
const practiceBackground = "color-mix(in srgb, var(--card) 50%, var(--background))";

const AUDIO_TRACKS = [
  {
    id: "cttb",
    label: "CTTB Recording",
    src: "/assets/audio/shurangama_mantra_CTTB.mp3",
  },
  {
    id: "hua",
    label: "Master Hua Recording",
    src: "/assets/audio/shurangama_mantra_Master_Hua.mp3",
  },
] as const;

const SPEED_PRESETS = [0.5, 0.75, 1, 1.25] as const;
const MIN_SPEED = 0.45;

const SECTION_BREAKS = [0, 187, 232, 363, 434]; // 0-indexed positions of section starts
const SECTION_NUMERALS = ["I", "II", "III", "IV", "V"] as const;

function getSavedSpeed() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("mantra-speed");
    const parsed = saved ? parseFloat(saved) : NaN;
    if (Number.isFinite(parsed)) return Math.max(MIN_SPEED, parsed);
  }
  return 1;
}

/* ---------------------------------------------------------------- */
/* Icons                                                             */
/* ---------------------------------------------------------------- */

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SkipIcon({ direction }: { direction: "back" | "forward" }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: 27,
        height: 27,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {direction === "back" ? (
        <RotateCcw size={27} strokeWidth={1.5} />
      ) : (
        <RotateCw size={27} strokeWidth={1.5} />
      )}
      <span
        style={{
          position: "absolute",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "0.44rem",
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          transform: "translateY(1px)",
        }}
      >
        10
      </span>
    </span>
  );
}

function PracticeHeading({ compact = false }: { compact?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.65rem",
        minHeight: compact ? 38 : 42,
        padding: "0.35rem 1rem",
        backgroundColor: "var(--color-dark-bg-95)",
        backdropFilter: "blur(12px)",
        borderBottom: "2px solid var(--color-accent-gold)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "1.5rem",
          height: 1,
          backgroundColor: "var(--color-accent-on-dark, var(--color-accent-gold))",
          opacity: 0.75,
        }}
      />
      <h2
        style={{
          margin: 0,
          color: "var(--color-accent-on-dark, var(--color-accent-gold))",
          fontFamily: "var(--font-title, Georgia, serif)",
          fontSize: compact ? "0.95rem" : "1rem",
          fontWeight: 500,
          letterSpacing: "0.055em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        Shurangama Mantra
      </h2>
      <span
        aria-hidden="true"
        style={{
          width: "1.5rem",
          height: 1,
          backgroundColor: "var(--color-accent-on-dark, var(--color-accent-gold))",
          opacity: 0.75,
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Audio player hook — single source of truth, mounted once          */
/* ---------------------------------------------------------------- */

function useAudioPlayer() {
  const [trackIndex, setTrackIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mantra-recording");
      const savedIndex = AUDIO_TRACKS.findIndex((track) => track.id === saved);
      if (savedIndex >= 0) return savedIndex;
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(() => getSavedSpeed());
  const [customSpeed, setCustomSpeed] = useState(() => {
    const savedSpeed = getSavedSpeed();
    return !SPEED_PRESETS.some((preset) => preset === savedSpeed);
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    localStorage.setItem("mantra-speed", String(speed));
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    localStorage.setItem("mantra-recording", AUDIO_TRACKS[trackIndex].id);
  }, [trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = isPlaying;
    audio.load();
    audio.playbackRate = speed;
    if (wasPlaying) audio.play().catch(() => setIsPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const resetToBeginning = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleSpeedPreset = (s: number) => {
    setSpeed(s);
    setCustomSpeed(false);
  };

  const handleSpeedSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = parseFloat(parseFloat(e.target.value).toFixed(2));
    setSpeed(s);
    setCustomSpeed(true);
  };

  return {
    trackIndex,
    setTrackIndex,
    isPlaying,
    currentTime,
    duration,
    speed,
    customSpeed,
    audioRef,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    togglePlay,
    skip,
    resetToBeginning,
    handleSeek,
    handleSpeedPreset,
    handleSpeedSlider,
  };
}

type Player = Omit<ReturnType<typeof useAudioPlayer>, "audioRef">;

function formatTime(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ControlIconButton({
  children,
  label,
  title,
  onClick,
  muted = false,
}: {
  children: React.ReactNode;
  label: string;
  title?: string;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={title ?? label}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        backgroundColor: muted
          ? "transparent"
          : "color-mix(in srgb, var(--foreground) 5%, transparent)",
        border: muted ? "none" : "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
        cursor: "pointer",
        color: muted ? mutedOnCard : "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

function PlaybackControls({
  player,
  onOpenSettings,
  rightSlot,
}: {
  player: Player;
  onOpenSettings: () => void;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "44px 1fr 44px",
        alignItems: "center",
        columnGap: "0.45rem",
      }}
    >
      <ControlIconButton label="Playback settings" onClick={onOpenSettings} muted>
        <SettingsIcon />
      </ControlIconButton>

      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.85rem" }}
      >
        <ControlIconButton
          label="Skip back 10 seconds"
          title="Skip back 10 seconds"
          onClick={() => player.skip(-10)}
        >
          <SkipIcon direction="back" />
        </ControlIconButton>

        <button
          onClick={player.togglePlay}
          aria-label={player.isPlaying ? "Pause recording" : "Play recording"}
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            backgroundColor: "var(--color-accent-gold)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {player.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <ControlIconButton
          label="Skip forward 10 seconds"
          title="Skip forward 10 seconds"
          onClick={() => player.skip(10)}
        >
          <SkipIcon direction="forward" />
        </ControlIconButton>
      </div>

      {rightSlot ?? <div aria-hidden="true" />}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Condensed audio bar — play/skip/progress + a gear for everything  */
/* else                                                               */
/* ---------------------------------------------------------------- */

function AudioBar({
  player,
  onOpenSettings,
  onEnterPractice,
  minimal = false,
  controlsFirst = false,
  rightSlot,
}: {
  player: Player;
  onOpenSettings: () => void;
  onEnterPractice?: () => void;
  minimal?: boolean;
  controlsFirst?: boolean;
  rightSlot?: React.ReactNode;
}) {
  const controls = (
    <PlaybackControls player={player} onOpenSettings={onOpenSettings} rightSlot={rightSlot} />
  );

  return (
    <div
      style={{
        backgroundColor: minimal ? "transparent" : "var(--card)",
        border: minimal ? "none" : "1px solid var(--border)",
        borderRadius: minimal ? 0 : "4px",
        padding: minimal ? "0 0 0.5rem" : "1rem 1.1rem",
        marginBottom: minimal ? 0 : "1.5rem",
      }}
    >
      {controlsFirst && <div style={{ marginBottom: "0.95rem" }}>{controls}</div>}

      {!minimal && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontFamily: body,
            fontSize: "0.76rem",
            color: mutedOnCard,
            marginBottom: "0.6rem",
          }}
        >
          <span>{AUDIO_TRACKS[player.trackIndex].label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <button
              onClick={onOpenSettings}
              aria-label={`Playback speed ${player.speed.toFixed(2)}x. Open settings.`}
              title="Playback speed"
              style={{
                border: "none",
                background: "none",
                color: mutedOnCard,
                cursor: "pointer",
                fontFamily: body,
                fontSize: "0.76rem",
                padding: 0,
              }}
            >
              {player.speed.toFixed(2)}x
            </button>
            {onEnterPractice && (
              <button
                onClick={onEnterPractice}
                aria-label="Open practice mode"
                title="Open practice mode"
                style={{
                  minHeight: 30,
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  backgroundColor: "transparent",
                  color: accentOnCard,
                  cursor: "pointer",
                  fontFamily: body,
                  fontSize: "0.76rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  padding: "0 0.55rem",
                }}
              >
                <ExpandIcon />
                Practice
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "0.75rem" }}>
        <input
          type="range"
          min={0}
          max={player.duration || 0}
          step={0.1}
          value={player.currentTime}
          onChange={player.handleSeek}
          style={{ width: "100%", accentColor: "var(--color-accent-gold)", cursor: "pointer" }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            fontFamily: body,
            fontSize: "0.78rem",
            color: mutedOnCard,
            marginTop: "0.2rem",
          }}
        >
          <span>{formatTime(player.currentTime)}</span>
          {minimal ? (
            <button
              onClick={onOpenSettings}
              aria-label={`Playback speed ${player.speed.toFixed(2)}x. Open settings.`}
              title="Playback speed"
              style={{
                border: "none",
                background: "none",
                color: accentOnCard,
                cursor: "pointer",
                fontFamily: body,
                fontSize: "0.78rem",
                padding: "0.15rem 0.4rem",
              }}
            >
              {player.speed.toFixed(2)}x
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <span style={{ textAlign: "right" }}>{formatTime(player.duration)}</span>
        </div>
      </div>

      {!controlsFirst && controls}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Settings bottom sheet — track choice, speed presets, speed slider */
/* ---------------------------------------------------------------- */

function SettingsSheet({
  open,
  onClose,
  player,
  script,
  onScriptChange,
}: {
  open: boolean;
  onClose: () => void;
  player: Player;
  script: MantraScript;
  onScriptChange: (s: MantraScript) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartYRef = useRef(0);
  const dragCurrentYRef = useRef(0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setDragY(0);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStartYRef.current = e.clientY;
    dragCurrentYRef.current = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const nextY = Math.max(0, e.clientY - dragStartYRef.current);
    dragCurrentYRef.current = nextY;
    setDragY(nextY);
  };

  const handleDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (dragCurrentYRef.current > 90) {
      onClose();
      return;
    }

    dragCurrentYRef.current = 0;
    setDragY(0);
  };

  if (!mounted) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000 }}>
      {/* backdrop — not themed, this is a standard modal scrim rather than site content */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          opacity: visible ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: "100%",
          maxWidth: "56rem",
          maxHeight: "82vh",
          overflowY: "auto",
          backgroundColor: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          padding: "0.75rem 1.25rem 1.5rem",
          transform: visible
            ? `translateX(-50%) translateY(${dragY}px)`
            : "translateX(-50%) translateY(100%)",
          transition: isDragging ? "none" : "transform 260ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
            userSelect: "none" as const,
            padding: "0.25rem 0 0.9rem",
            margin: "-0.25rem 0 0",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: "var(--border)",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              maxWidth: "42rem",
              margin: "1.1rem auto 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <h3
              className="type-subtitle"
              style={{
                fontSize: "1.1rem",
                color: "var(--heading-foreground)",
                margin: 0,
              }}
            >
              Settings
            </h3>
            <button
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Close settings"
              style={{
                position: "absolute",
                right: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: mutedOnCard,
              }}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center" as const }}>
          <div
            style={{
              fontFamily: body,
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              color: mutedOnCard,
              marginTop: "1.25rem",
              marginBottom: "0.6rem",
            }}
          >
            Text
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              marginBottom: "1.5rem",
              flexWrap: "wrap" as const,
            }}
          >
            {(
              [
                { value: "pinyin", label: "Pinyin style text" },
                { value: "phonetic", label: "Recitation style text" },
              ] as { value: MantraScript; label: string }[]
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => onScriptChange(opt.value)}
                style={{
                  fontFamily: body,
                  fontSize: "0.85rem",
                  padding: "0.5rem 0.9rem",
                  border: "1px solid",
                  borderColor: script === opt.value ? "var(--color-accent-gold)" : "var(--border)",
                  backgroundColor: "transparent",
                  color: script === opt.value ? accentOnCard : mutedOnCard,
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", margin: "0 0 1.25rem" }} />

          <div
            style={{
              fontFamily: body,
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              color: mutedOnCard,
              marginBottom: "0.6rem",
            }}
          >
            Audio
          </div>

          <div
            style={{
              fontFamily: body,
              fontSize: "0.78rem",
              color: mutedOnCard,
              marginBottom: "0.5rem",
            }}
          >
            Recording
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              marginBottom: "1.5rem",
              flexWrap: "wrap" as const,
            }}
          >
            {AUDIO_TRACKS.map((track, i) => (
              <button
                key={track.id}
                onClick={() => player.setTrackIndex(i)}
                style={{
                  fontFamily: body,
                  fontSize: "0.85rem",
                  padding: "0.5rem 0.9rem",
                  border: "1px solid",
                  borderColor:
                    player.trackIndex === i ? "var(--color-accent-gold)" : "var(--border)",
                  backgroundColor: "transparent",
                  color: player.trackIndex === i ? accentOnCard : mutedOnCard,
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {track.label}
              </button>
            ))}
          </div>

          <div
            style={{
              fontFamily: body,
              fontSize: "0.78rem",
              color: mutedOnCard,
              marginBottom: "0.5rem",
            }}
          >
            Speed: {player.speed.toFixed(2)}x
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              marginBottom: "0.75rem",
              flexWrap: "wrap" as const,
            }}
          >
            {SPEED_PRESETS.map((s) => (
              <button
                key={s}
                onClick={() => player.handleSpeedPreset(s)}
                style={{
                  fontFamily: body,
                  fontSize: "0.85rem",
                  padding: "0.4rem 0.85rem",
                  border: "1px solid",
                  borderColor:
                    player.speed === s && !player.customSpeed
                      ? "var(--color-accent-gold)"
                      : "var(--border)",
                  color: player.speed === s && !player.customSpeed ? accentOnCard : mutedOnCard,
                  backgroundColor: "transparent",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {s}x
              </button>
            ))}
          </div>
          <input
            type="range"
            min={MIN_SPEED}
            max={2}
            step={0.05}
            value={player.speed}
            onChange={player.handleSpeedSlider}
            style={{
              display: "block",
              width: "100%",
              maxWidth: "34rem",
              margin: "0 auto",
              accentColor: "var(--color-accent-gold)",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Mantra text display                                               */
/* ---------------------------------------------------------------- */

function MantraDisplay({
  script,
  fill,
  minimal = false,
  onBeginAnotherRecitation,
}: {
  script: MantraScript;
  fill?: boolean;
  minimal?: boolean;
  onBeginAnotherRecitation?: () => void;
}) {
  const lines = mantraLines[script];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTopQuickly = () => {
    const element = scrollRef.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      element.scrollTop = 0;
      return;
    }

    const start = element.scrollTop;
    const duration = 320;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.scrollTop = start * (1 - eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const handleBeginAnotherRecitation = () => {
    onBeginAnotherRecitation?.();
    scrollToTopQuickly();
  };

  return (
    <div
      ref={scrollRef}
      style={{
        backgroundColor: minimal ? "transparent" : "var(--card)",
        border: minimal ? "none" : "1px solid var(--border)",
        borderRadius: minimal ? 0 : "4px",
        overflowY: "auto",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
        padding: minimal ? "1rem 0 1.25rem" : "1.25rem 1rem",
        ...(fill ? { flex: 1, minHeight: 0, height: "100%" } : { maxHeight: "60vh" }),
      }}
    >
      {lines.map((line, i) => {
        const sectionIndex = SECTION_BREAKS.indexOf(i);
        return (
          <div key={i}>
            {sectionIndex >= 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  margin: i === 0 ? "0 0 1.25rem" : "1.25rem 0",
                }}
                aria-label={`Section ${SECTION_NUMERALS[sectionIndex]}`}
              >
                <span
                  style={{
                    width: "5rem",
                    height: 1,
                    backgroundColor: "var(--border)",
                    opacity: 0.8,
                  }}
                />
                <span
                  style={{
                    fontFamily: body,
                    fontSize: "0.72rem",
                    lineHeight: 1,
                    color: mutedOnCard,
                    letterSpacing: "0.08em",
                    userSelect: "none" as const,
                  }}
                >
                  {SECTION_NUMERALS[sectionIndex]}
                </span>
                <span
                  style={{
                    width: "5rem",
                    height: 1,
                    backgroundColor: "var(--border)",
                    opacity: 0.8,
                  }}
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "baseline",
                padding: minimal ? "0.34rem 0" : "0.3rem 0",
              }}
            >
              <span
                style={{
                  fontFamily: body,
                  fontSize: "0.72rem",
                  color: mutedOnCard,
                  minWidth: "2rem",
                  textAlign: "right" as const,
                  flexShrink: 0,
                  userSelect: "none" as const,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontFamily: body,
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "var(--foreground)",
                  letterSpacing: "0.01em",
                }}
              >
                {line}
              </span>
            </div>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid var(--border)",
          marginTop: "1.25rem",
          paddingTop: "1.25rem",
        }}
      >
        <button
          onClick={handleBeginAnotherRecitation}
          style={{
            fontFamily: body,
            fontSize: "0.85rem",
            color: accentOnCard,
            backgroundColor: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "3px",
            cursor: "pointer",
            padding: "0.5rem 0.85rem",
          }}
        >
          Begin another recitation
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Root component                                                    */
/* ---------------------------------------------------------------- */

export function ShurangamaMantraPractice() {
  const { audioRef, ...player } = useAudioPlayer();
  const [script, setScript] = useState<MantraScript>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mantra-script");
      if (saved === "pinyin" || saved === "phonetic") return saved;
    }
    return "pinyin";
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleScriptChange = (s: MantraScript) => {
    setScript(s);
    if (typeof window !== "undefined") localStorage.setItem("mantra-script", s);
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const scrollY = window.scrollY;
    const bodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.position = bodyStyles.position;
      document.body.style.top = bodyStyles.top;
      document.body.style.left = bodyStyles.left;
      document.body.style.right = bodyStyles.right;
      document.body.style.width = bodyStyles.width;
      document.body.style.overflow = bodyStyles.overflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isFullscreen]);

  return (
    <>
      {/* single audio element — stays mounted regardless of view */}
      <audio
        ref={audioRef}
        src={AUDIO_TRACKS[player.trackIndex].src}
        onTimeUpdate={player.handleTimeUpdate}
        onLoadedMetadata={player.handleLoadedMetadata}
        onEnded={player.handleEnded}
      />

      {!isFullscreen && (
        <>
          <AudioBar
            player={player}
            onOpenSettings={() => setShowSettings(true)}
            onEnterPractice={() => setIsFullscreen(true)}
          />
          <MantraDisplay script={script} onBeginAnotherRecitation={player.resetToBeginning} />

          <div
            style={{
              marginTop: "1rem",
              padding: "0.9rem 1.1rem",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
            }}
          >
            <p
              className="type-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--foreground)",
                marginBottom: 1,
              }}
            >
              Two versions of the romanised text are available:{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 500 }}>Pinyin</strong> and{" "}
              <strong style={{ color: "var(--foreground)", fontWeight: 500 }}>Recitation</strong>.
              Pinyin follows standard Mandarin romanisation, though several characters in the Mantra
              carry traditional recitation readings that differ from everyday pronunciation.
              Recitation offers a more approachable option for readers unfamiliar with pinyin. Both
              can be selected from settings.
            </p>
            <p
              className="type-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--foreground)",
                marginBottom: 0,
              }}
            >
              The Romanised texts and audio recordings are courtesy of the Buddhist Text Translation
              Society.
            </p>
          </div>
        </>
      )}

      {isFullscreen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--background)",
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
            overflow: "hidden",
            overscrollBehavior: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "56rem",
              height: "100%",
              margin: "0 auto",
              backgroundColor: practiceBackground,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PracticeHeading compact />
            <div
              style={{
                flexShrink: 0,
                padding: "0.85rem 1.1rem 0",
              }}
            >
              <AudioBar
                player={player}
                onOpenSettings={() => setShowSettings(true)}
                minimal
                controlsFirst
                rightSlot={
                  <button
                    onClick={() => setIsFullscreen(false)}
                    aria-label="Close practice mode"
                    title="Close practice mode"
                    style={{
                      width: 42,
                      height: 42,
                      background: "none",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      color: mutedOnCard,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <CloseIcon />
                  </button>
                }
              />
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                padding: "0 1.1rem env(safe-area-inset-bottom, 0.75rem)",
              }}
            >
              <div style={{ borderTop: "1px solid var(--border)", flexShrink: 0 }} />
              <MantraDisplay
                script={script}
                fill
                minimal
                onBeginAnotherRecitation={player.resetToBeginning}
              />
            </div>
          </div>
        </div>
      )}

      <SettingsSheet
        open={showSettings}
        onClose={() => setShowSettings(false)}
        player={player}
        script={script}
        onScriptChange={handleScriptChange}
      />
    </>
  );
}
