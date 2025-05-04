import './VirtualKeyboard.scss';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, RefObject, useEffect, useState } from 'react';

import { Card } from '@/shared/ui';

import CloseIcon from '../assets/icons/close.svg?react';
import { keyboardData } from '../data';
import { updateInputValueWithCursor } from '../lib';
import { useVirtualKeyboard } from '../provider';
import { KeyboardType } from '../types';

interface IVirtualKeyboardProps {
  show: boolean;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}

export const VirtualKeyboard: FC<IVirtualKeyboardProps> = ({
  show,
  inputRef,
}) => {
  const [keyboardType, setKeyboardType] = useState<KeyboardType>('rus');
  const [isCaps, setIsCaps] = useState(false);

  const { triggerGo } = useVirtualKeyboard();

  useEffect(() => {
    if (inputRef.current) {
      switch (inputRef.current.inputMode) {
        case 'numeric':
          setKeyboardType('num');
          break;

        default:
          setKeyboardType('rus');
      }
    }
  }, [inputRef.current]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const { key } = target.dataset;
    const input = inputRef.current;

    if (!input || !key) return;

    switch (key) {
      case 'SHIFT':
        setIsCaps((prev) => !prev);
        break;

      case 'BACKSPACE':
        updateInputValueWithCursor(input, (text, start, end) => {
          const newStart = start ? start - 1 : start;
          return {
            value: text.slice(0, newStart) + text.slice(end),
            cursorPosition: newStart,
          };
        });
        break;

      case 'NUM':
        setKeyboardType((prev) => (prev === 'num' ? 'rus' : 'num'));
        break;

      case 'LANG':
        setKeyboardType((prev) => (prev === 'rus' ? 'eng' : 'rus'));
        break;

      case 'SPACE':
        updateInputValueWithCursor(input, (text, start, end) => ({
          value: text.slice(0, start) + ' ' + text.slice(end),
          cursorPosition: start + 1,
        }));
        break;

      case 'GO':
        input.blur();
        triggerGo();
        break;

      default:
        updateInputValueWithCursor(input, (text, start, end) => ({
          value: text.slice(0, start) + key + text.slice(end),
          cursorPosition: start + key.length,
        }));
        break;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, pointerEvents: 'none' }}
          animate={{ opacity: 1, height: 'auto', pointerEvents: 'initial' }}
          exit={{ opacity: 0, height: 0, pointerEvents: 'none' }}
        >
          <Card className={'virtual-keyboard-card'}>
            <div
              className={clsx(
                'virtual-keyboard',
                `virtual-keyboard--${keyboardType}`,
                isCaps && 'virtual-keyboard--isCaps',
              )}
            >
              <div
                onClick={(e) => handleClick(e)}
                onMouseDown={(e) => e.preventDefault()}
                className={'virtual-keyboard__body'}
              >
                {keyboardData[keyboardType].map((row, index) => {
                  return (
                    <div key={index} className={'virtual-keyboard__row'}>
                      {row.map((key, index) => (
                        <button
                          key={index}
                          data-key={isCaps ? key.toUpperCase() : key}
                          className={clsx(
                            'virtual-keyboard__key',
                            `virtual-keyboard__key--${key}`,
                          )}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
              <button className={'virtual-keyboard__close'}>
                <CloseIcon />
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
