import { toast } from 'react-toastify';

const toastSuccess = (msg) => toast.success(msg);
const toastError = (msg) => toast.error(msg);
const toastInfo = (msg) => toast.info(`${msg ?? 'Something went wrong'}`);
const toastWarning = (msg) => toast.warning(msg);

export { toastSuccess, toastError, toastInfo, toastWarning };
