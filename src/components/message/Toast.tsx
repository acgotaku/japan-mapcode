import React, { useEffect, useMemo } from 'react';
import cls from 'clsx';
import styles from './message.module.css';
import { IToastProps } from './Message.types';
import { ReactComponent as Success } from '@/assets/icons/success.svg';
import { ReactComponent as Error } from '@/assets/icons/error.svg';
import { ReactComponent as Warning } from '@/assets/icons/warning.svg';
import { ReactComponent as Close } from '@/assets/icons/close.svg';

const typeToIcon = {
  success: Success,
  error: Error,
  warning: Warning
};

const Toast: React.FC<IToastProps> = ({ content, type, duration, onClose }) => {
  const IconComponent = typeToIcon[type];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (duration) {
      timer = setTimeout(onClose, duration * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  const canClose = useMemo(() => duration === 0 || duration > 5, [duration]);

  return (
    <div role="alert" className={styles.toast}>
      {IconComponent && (
        <div className={styles.iconWrapper}>
          <IconComponent className={cls(styles.icon, styles[type])} />
        </div>
      )}
      <span className={styles.text}>{content}</span>
      {canClose && (
        <button onClick={onClose} className={styles.close}>
          <Close className={styles.closeIcon} />
        </button>
      )}
    </div>
  );
};
export default Toast;
