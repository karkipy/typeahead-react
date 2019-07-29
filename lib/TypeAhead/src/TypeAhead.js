// @flow
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './TypeAhead.css';

type Props = {
  defaultValue: string,
  options: Array<string>,
  onSelect: () => void,
  placeholder?: string,
}
function TypeAhead({ defaultValue, options, onSelect, placeholder }: Props) {
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
    <div ref={ref} className="typeahead-container">
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', flex: 1 }}>
        {/* suggestion text */}
        <div className="typeahead-suggestion-container">
          {val.length > 0 && searchOptions.length > 0 && searchOptions[index]}
        </div>
        <input
          type="text"
          className="typeahead-input"
          placeholder={placeholder}
          onChange={onChangeHandler}
          value={val}
          onKeyDown={handleKeyDown}
          onFocus={() => setSearchToggle(true)}
        />
      </div>
      <div>
        {searchToggle && searchOptions.length > 0 && (
        <div className="typeahead-search-container">
          {searchOptions.map((s, idx) => {
            return (
              <button
                type="button"
                className={`typeahead-search-item ${idx === index ? 'active' : ''}`}
                key={s}
                onClick={() => {
                  if (onSelect) {
                    onSelect(searchOptions[idx]);
                  }
                  onChange(searchOptions[idx]);
                  setIndex(idx);
                  setSearchToggle(false);
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

TypeAhead.defaultProps = {
  placeholder: 'Search ...',
};

export default TypeAhead;
