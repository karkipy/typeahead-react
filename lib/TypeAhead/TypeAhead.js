// @flow
import React, { useState, useEffect, useCallback, useRef } from 'react';

type Props = {
  defaultValue: string,
  options: Array<string>,
  onSelect: () => void,
}
function TypeAhead({ defaultValue, options, onSelect }: Props) {
  const ref = useRef();
  const [val, onChange] = useState(defaultValue || '');
  const [searchOptions, setSearchOptions] = useState(options);
  const [searchToggle, setSearchToggle] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSearchToggle(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    document.addEventListener('click', handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchOptions(options);
  }, [options]);


  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    onChange(value);
    setSearchOptions(() => options.filter(f => f.startsWith(value)));
  }, [options, setSearchOptions, onChange]);

  const handleKeyDown = useCallback((e) => {
    switch (e.keyCode) {
      case 13: // On Press Enter inside the search bar
        e.preventDefault();
        if (searchOptions[index]) {
          if (onSelect) {
            onSelect(searchOptions[index]);
          }
          onChange(searchOptions[index]);
        }
        break;

      case 38: // on Press up arrow
        e.preventDefault();
        if (index > 0) {
          onChange(searchOptions[index - 1]);
          setIndex(index - 1);
        }
        break;

      case 40: // on Press down arrow
        e.preventDefault();
        if (index < searchOptions.length - 1) {
          onChange(searchOptions[index + 1]);
          setIndex(index + 1);
        }
        break;
      default:
        break;
    }
  }, [searchOptions, onChange, onSelect, index, setIndex]);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', flex: 1 }}>
        {/* suggestion text */}
        <div style={{ color: '#9B9B9B', position: 'absolute', zIndex: -10, fontSize: '18px', fontFamily: 'sans serif' }}>
          {val.length > 0 && searchOptions.length > 0 && searchOptions[index]}
        </div>
        <input
          type="text"
          placeholder="Search..."
          onChange={onChangeHandler}
          value={val}
          onKeyDown={handleKeyDown}
          onFocus={() => setSearchToggle(true)}
          // autoFocus
          style={
            {
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              display: 'flex',
              flex: 1,
              width: '100%',
              alignItems: 'center',
              fontFamily: 'sans serif',
            }
          }
        />
      </div>
      <div>
        {searchToggle && searchOptions.length > 0 && (
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', width: '100%' }}>
          {searchOptions.map((s, idx) => {
            return (
              <button
                type="button"
                key={s}
                onClick={() => {
                  if (onSelect) {
                    onSelect(searchOptions[idx]);
                  }
                  onChange(searchOptions[idx]);
                  setIndex(idx);
                }}
                style={
                  {
                    display: 'flex',
                    width: '100%',
                    padding: '5px',
                    outline: 'none',
                    background: idx === index ? 'blue' : 'transparent',
                    color: idx === index ? 'white' : 'black',
                  }}
              >
                {s}
              </button>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}

export default TypeAhead;
