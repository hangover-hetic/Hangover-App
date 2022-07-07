const relativeTime = require('dayjs/plugin/relativeTime')
import dayjs from 'dayjs';

dayjs.extend(relativeTime)

export default dayjs;