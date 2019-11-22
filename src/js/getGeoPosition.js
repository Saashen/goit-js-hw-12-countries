import 'pnotify/dist/PNotifyBrightTheme.css';
import PNotify from 'pnotify/dist/es/PNotify';

export default function getGeoPosition() {
  const options = {
    maximumAge: 1000 * 60 * 30,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

getGeoPosition()
  .then(location => location)
  .catch(error => {
    console.error(error);
    const notice = PNotify.notice({
      text: 'Нет прав доступа к геопозиции, используйте поиск по имени города.',
    });
    return notice;
  });
