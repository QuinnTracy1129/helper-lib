import weeks from '../../constants/weeks.js';
import { isEmpty } from '../../utils/isEmpty.js';
import { useEffect, useRef, useState } from 'react';

const SCROLL_DEBOUNCE = 150; // ms

export function Calendar({
  id = '',
  className,
  onDayClick = () => {},
  selectedDay = {},
  startDate = null,
}) {
  const today = new Date();
  const initialDate = isEmpty(startDate)
    ? { month: today.getMonth(), year: today.getFullYear() }
    : startDate;

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [initLoad, setInitialLoad] = useState(true);
  const [scrollToCenter, setScrollToCenter] = useState(false);
  const scrollerRef = useRef(null);

  const handleDayClick = (d) => {
    const { day, monthOffset, isCurrentMonth } = d;

    let clickedMonth = currentDate.month + monthOffset;
    let clickedYear = currentDate.year;

    if (clickedMonth > 11) clickedYear += 1;
    if (clickedMonth < 0) clickedYear -= 1;

    const normalizedMonth = (clickedMonth + 12) % 12;

    if (monthOffset !== 0) {
      setCurrentDate({ month: normalizedMonth, year: clickedYear });
      setScrollToCenter(true); // mark that next effect should reset scrollLeft
    }

    onDayClick({ day, month: normalizedMonth, year: clickedYear, monthOffset, isCurrentMonth });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (initLoad || scrollToCenter) {
      el.classList.remove('scroll-smooth');
      el.scrollLeft = el.clientWidth;
      setTimeout(() => el.classList.add('scroll-smooth'), 0);

      if (scrollToCenter) setScrollToCenter(false); // reset flag
      if (initLoad) setInitialLoad(false);
    }
  }, [currentDate, initLoad, scrollToCenter]);

  // Generate days for a given month with optional leading/trailing dates
  const generateCalendarDays = (month, year, options = {}) => {
    const { leading = true, trailing = true } = options;
    const days = [];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    if (leading) {
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        days.push({ day: daysInPrevMonth - i, monthOffset: -1, isCurrentMonth: false });
      }
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, monthOffset: 0, isCurrentMonth: true });
    }

    if (trailing) {
      const remaining = 7 - (days.length % 7 || 7);
      for (let day = 1; day <= remaining; day++) {
        days.push({ day, monthOffset: 1, isCurrentMonth: false });
      }
    }

    return days;
  };

  const getPrevMonth = (month, year) =>
    month === 0 ? { month: 11, year: year - 1 } : { month: month - 1, year };
  const getNextMonth = (month, year) =>
    month === 11 ? { month: 0, year: year + 1 } : { month: month + 1, year };

  // Debounced scroll handler to detect snap-end
  const useDebouncedScroll = (scrollerRef, callback) => {
    const timeoutRef = useRef(null);
    return () => {
      if (!scrollerRef.current) return;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(scrollerRef.current), SCROLL_DEBOUNCE);
    };
  };

  const handleSnapEnd = (el) => {
    if (!el) return;
    const width = el.clientWidth;
    const delta = el.scrollLeft - width; // difference from center

    if (Math.abs(delta) < width * 0.5) return; // ignore tiny movements

    const shift = Math.round(delta / width); // can be > 1 for fast scroll
    setCurrentDate((prev) => {
      let month = prev.month + shift;
      let year = prev.year;

      while (month > 11) {
        month -= 12;
        year += 1;
      }
      while (month < 0) {
        month += 12;
        year -= 1;
      }
      return { month, year };
    });
  };

  const handleScroll = useDebouncedScroll(scrollerRef, handleSnapEnd);

  // Prepare previous, current, next months for 3-panel scroll
  const prev = getPrevMonth(currentDate.month, currentDate.year);
  const next = getNextMonth(currentDate.month, currentDate.year);
  const months = [prev, currentDate, next].map(({ month, year }) => ({
    key: `${year}-${month}`,
    month,
    year,
    days: generateCalendarDays(month, year),
  }));

  return (
    <div className={`w-full p-5 max-w-80 select-none ${className}`}>
      <div className="font-bold text-lg">
        {new Date(currentDate.year, currentDate.month).toLocaleString('default', { month: 'long' })}
      </div>
      <div className="font-semibold mb-3 -mt-2">{currentDate.year}</div>

      <div className="grid grid-cols-7 text-xs mb-2">
        {weeks.map((week, i) => (
          <div key={`${id}-week-${i}`} className="text-center">
            {week.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="overflow-hidden w-full">
        <div
          ref={scrollerRef}
          className="flex w-full overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth"
          onWheel={(e) => {
            e.currentTarget.scrollLeft += e.deltaY * 2;
            handleScroll();
          }}
          onScroll={handleScroll}
        >
          {months.map(({ key, days }) => (
            <div key={`${id}-${key}`} className="snap-center shrink-0 w-full pb-3">
              <div className="grid grid-cols-7">
                {days.map((d, i) => {
                  const { monthOffset, isCurrentMonth, day } = d;

                  const isToday =
                    day === today.getDate() &&
                    currentDate.month + monthOffset === today.getMonth() &&
                    currentDate.year === today.getFullYear();

                  const isSelected =
                    selectedDay?.day === d.day &&
                    selectedDay?.month === (currentDate.month + d.monthOffset + 12) % 12 &&
                    selectedDay?.year === currentDate.year;

                  return (
                    <div
                      key={`${id}-${i}`}
                      className={`rounded-xs aspect-square cursor-pointer ${
                        isToday ? 'bg-primary text-primary-content' : ''
                      } ${isSelected ? 'bg-secondary text-secondary-content' : ''} ${
                        !d.isCurrentMonth ? 'text-base-content/50' : 'hover:bg-secondary'
                      }
                    `}
                      onClick={() => handleDayClick(d)}
                    >
                      <div className="indicator w-full h-full">
                        <span className="indicator-item indicator-center indicator-bottom status status-primary" />
                        <div
                          className={`${
                            !isCurrentMonth ? 'text-base-content/50' : ''
                          } w-full h-full grid place-items-center text-xs`}
                        >
                          {day}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
