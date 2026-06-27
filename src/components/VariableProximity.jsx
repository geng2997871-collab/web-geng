import { forwardRef, useEffect, useMemo, useRef } from 'react';
import './VariableProximity.css';

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId;

    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (event) => updatePosition(event.clientX, event.clientY);
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef(function VariableProximity(props, ref) {
  const {
    label = '',
    fromFontVariationSettings = "'wght' 400",
    toFontVariationSettings = "'wght' 800",
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(',')
          .map((setting) => setting.trim())
          .map((setting) => {
            const [name, value] = setting.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          }),
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateFalloff = (distance) => {
    const normalized = Math.min(Math.max(1 - distance / radius, 0), 1);

    switch (falloff) {
      case 'exponential':
        return normalized ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return normalized;
    }
  };

  useAnimationFrame(() => {
    if (!containerRef?.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;

    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }

    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
      const distance = Math.hypot(x - letterCenterX, y - letterCenterY);

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  let letterIndex = 0;
  const words = label.split(' ');

  return (
    <span
      ref={ref}
      className={`variable-proximity ${className}`.trim()}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="variable-proximity-word">
          {word.split('').map((letter) => {
            const currentLetterIndex = letterIndex;
            letterIndex += 1;

            return (
              <span
                key={`${letter}-${currentLetterIndex}`}
                ref={(element) => {
                  letterRefs.current[currentLetterIndex] = element;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings:
                    interpolatedSettingsRef.current[currentLetterIndex] ?? fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="variable-proximity-space">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

export default VariableProximity;
