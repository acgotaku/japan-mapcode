import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react';
import cls from 'clsx';
import styles from './input.module.css';
import { IInputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className = '',
      disabled = false,
      defaultValue = '',
      value,
      onChange,
      onFocus,
      onBlur,
      ...rest
    }: IInputProps,
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selfValue, setSelfValue] = useState(defaultValue);
    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    useImperativeHandle(ref, () => inputRef.current);

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string);
      }
    }, [isControlledComponent, value]);

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue };

    const inputProps = {
      ...rest,
      ...controlledValue
    };

    const changeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelfValue(event.target.value);
        onChange && onChange(event);
      },
      [onChange]
    );

    const focusHandler = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus && onFocus(event);
      },
      [onFocus]
    );

    const blurHandler = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(event);
      },
      [onBlur]
    );

    return (
      <div className={cls(styles.wrapper, className)}>
        <input
          ref={inputRef}
          className={styles.input}
          disabled={disabled}
          {...inputProps}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
