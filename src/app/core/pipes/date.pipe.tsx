import { parseISO, format as formatDate } from 'date-fns';
import { memo } from 'react';

// TODO: Let's use memo to improve Re-render performance
function DatePipe({ dateString, format }: { dateString: string, format?: string }) {
  format = format ?? 'LLLL d, yyyy';
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{formatDate(date, format)}</time>;
}

export default memo(DatePipe);

/**
<DatePipe dateString={preview.createdAt}></DatePipe>

 */