// @flow
import React, { useState, useEffect, useCallback } from 'react';

type Props = {
  defaultValue: string,
  options: Array<string>,
}
function TypeAhead({ defaultValue, options }: Props) {
  const [val, onChange] = useState(defaultValue || '');
  const [searchOptions, setSearchOptions] = useState(options);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSearchOptions(options);
  }, [options]);

  const onChangeHandler = useCallback((e) => {
    const { value } = e.target;
    onChange(value);
    setSearchOptions(() => options.filter(f => f.toLowerCase().startsWith(value.toLowerCase())));
  }, [options, setSearchOptions, onChange]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative', }}>
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
          style={
            {
              background: 'transparent',
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
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', width: '100%' }}>
          {searchOptions.map((s) => {
            return <button type="button" style={{ display: 'flex', width: '100%' }}>{s}</button>;
          })}
        </div>
      </div>
    </div>
  );
}

export default TypeAhead;
