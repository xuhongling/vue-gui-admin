import type { ErrorMessageMode } from '#/axios';
import { useMessage } from '@/hooks/web/useMessage';
// import router from '@/router';
// import { PageEnum } from '@/enums/pageEnum';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

const errMsg = {
  errMsg401: '用户没有权限（令牌、用户名、密码错误）!',
  errMsg403: '用户得到授权，但是访问是被禁止的。!',
  errMsg404: '网络请求错误,未找到该资源!',
  errMsg405: '网络请求错误,请求方法未允许!',
  errMsg408: '网络请求超时!',
  errMsg500: '服务器错误,请联系管理员!',
  errMsg501: '网络未实现!',
  errMsg502: '网络错误!',
  errMsg503: '服务不可用，服务器暂时过载或维护!',
  errMsg504: '网络超时!',
  errMsg505: 'http版本不支持该请求!',
};

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = errMsg.errMsg401;
      break;
    case 403:
      errMessage = errMsg.errMsg403;
      break;
    // 404请求不存在
    case 404:
      errMessage = errMsg.errMsg404;
      break;
    case 405:
      errMessage = errMsg.errMsg405;
      break;
    case 408:
      errMessage = errMsg.errMsg408;
      break;
    case 500:
      errMessage = errMsg.errMsg500;
      break;
    case 501:
      errMessage = errMsg.errMsg501;
      break;
    case 502:
      errMessage = errMsg.errMsg502;
      break;
    case 503:
      errMessage = errMsg.errMsg503;
      break;
    case 504:
      errMessage = errMsg.errMsg504;
      break;
    case 505:
      errMessage = errMsg.errMsg505;
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
