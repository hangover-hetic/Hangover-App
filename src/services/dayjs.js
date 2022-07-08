import relativeTime from 'dayjs/plugin/relativeTime';
import frenchLocale from 'dayjs/locale/fr';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);
dayjs.locale(frenchLocale);
export default dayjs;
