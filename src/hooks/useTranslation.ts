export function useTranslation() {
  return (messageName: string) => {
    return chrome.i18n.getMessage(messageName);
  };
}
