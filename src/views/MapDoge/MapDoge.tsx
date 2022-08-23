import { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@/components';
import { httpSend } from '@/utils/http';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './mapdoge.module.css';

const MapDoge = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [mapcode, setMapcode] = useState('');
  const t = useTranslation();
  const getCurrentTab = useCallback(async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }, []);

  const queryMapCode = useCallback(async () => {
    const result = await httpSend('https://japanmapcode.com/mapcode', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `lat=${lat}&lng=${lng}`
    });
    setMapcode(result.mapcode);
  }, [lat, lng]);

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
      {t('appShortName')}
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
          <Button type="button" onClick={queryMapCode}>
            submit
          </Button>
        </div>
      </form>
      {mapcode && <p>{mapcode}</p>}
    </div>
  );
};

export default MapDoge;
