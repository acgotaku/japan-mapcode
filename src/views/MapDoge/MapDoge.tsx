import { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@/components';
import styles from './mapdoge.module.css';

const MapDoge = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const getCurrentTab = useCallback(async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }, []);

  useEffect(() => {
    getCurrentTab().then(tab => {
      if (tab && tab.url?.startsWith('https://www.google.com/maps')) {
        const regex = /@([0-9.]+),([0-9.]+),([0-9.]+)z/g;
        const result = regex.exec(tab.url);
        if (result) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, lat, lng] = result;
          setLat(lat);
          setLng(lng);
        }
      }
    });
  }, [getCurrentTab]);
  return (
    <div className={styles.doge}>
      Map doge
      <form>
        <div>
          <label>lat</label>
          <Input name="lat" value={lat} />
        </div>
        <div>
          <label>lng</label>
          <Input name="lng" value={lng} />
        </div>
        <div>
          <Button>submit </Button>
        </div>
      </form>
    </div>
  );
};

export default MapDoge;
