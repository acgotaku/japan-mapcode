import { useCallback, useEffect } from 'react';
import { Button } from '@/components';
import styles from './mapdoge.module.css';

const MapDoge = () => {
  const getCurrentTab = useCallback(async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }, []);

  useEffect(() => {
    getCurrentTab().then(tab => {
      console.log(tab);
    });
  }, [getCurrentTab]);
  return (
    <div className={styles.doge}>
      Map doge
      <Button>hello button</Button>
    </div>
  );
};

export default MapDoge;
