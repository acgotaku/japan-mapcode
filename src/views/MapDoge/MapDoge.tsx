import { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Input, message } from '@/components';
import { httpSend } from '@/utils/http';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './mapdoge.module.css';

interface MapCodeResponse {
  success: boolean;
  mapcode: string;
}

interface ErrorResponse {
  status: number;
  message: string;
}

const MapDoge = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapcode, setMapcode] = useState('');
  const t = useTranslation();
  const getCurrentTab = useCallback(async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }, []);

  const queryMapCode = useCallback(async () => {
    if (formRef.current?.reportValidity()) {
      try {
        setLoading(true);
        const result = (await httpSend('https://japanmapcode.com/mapcode', {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: `lat=${lat}&lng=${lng}`
        })) as MapCodeResponse;
        setMapcode(result.mapcode);
      } catch (err) {
        const error = err as ErrorResponse;
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [lat, lng]);

  const copyMapCode = useCallback(() => {
    navigator.clipboard.writeText(mapcode);
    message.success('Copied!');
  }, [mapcode]);

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
      <form
        target="_blank"
        action="https://www.drivenippon.com/mapcode/app/dn/navicon_start.php"
        method="POST"
        ref={formRef}
        className={styles.form}
      >
        <div className={styles.formItem}>
          <label htmlFor="lat" className={styles.label}>
            {t('latitude')}
          </label>
          <Input
            id="lat"
            name="lat"
            required
            pattern="[0-9.]+"
            placeholder=" "
            value={lat}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="lng" className={styles.label}>
            {t('longitude')}
          </label>
          <Input
            id="lng"
            name="lng"
            required
            pattern="[0-9.]+"
            placeholder=" "
            value={lng}
          />
        </div>
        <div className={styles.formItem}>
          <Button type="button" loading={loading} onClick={queryMapCode}>
            Get MAPCODE
          </Button>
        </div>
        <div className={styles.formItem}>
          <input
            type="submit"
            value="View on drivenippon"
            className={styles.submit}
          />
        </div>
      </form>
      {mapcode && (
        <div className={styles.info}>
          <p>{mapcode}</p>
          <Button type="button" onClick={copyMapCode}>
            Copy
          </Button>
        </div>
      )}
    </div>
  );
};

export default MapDoge;
