import { memo } from 'react';

// TODO: Let's use memo to improve Re-render performance
function FunctionPipe({ value, handler }: { value: any, handler: Function }) {
  return <>{ handler(value) }</>
}

export default memo(FunctionPipe);

/**
 * To use:

const convertDate = useCallback((createdAt: string) => {
    return new Date(createdAt).toDateString();
}, []);

<FunctionPipe value={preview.createdAt}
              handler={convertDate}/>
 */