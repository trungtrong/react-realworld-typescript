import { useEffect } from 'react';
// Docs: https://github.com/oldboyxx/jira_clone/blob/master/client/src/shared/hooks/onEscapeKeyDown.js
export const KeyCodes = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    M: 77,
};

const useOnEscapeKeyDown = (isListening: boolean, onEscapeKeyDown: Function) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === KeyCodes.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;