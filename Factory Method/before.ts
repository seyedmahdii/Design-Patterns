class EmailNotification {}

class SMSNotification {}

class PushNotification {}

function sendNotification(type: string, message: string) {
  let notification;

  if (type === "email") {
    notification = new EmailNotification();
  } else if (type === "sms") {
    notification = new SMSNotification();
  } else if (type === "push") {
    notification = new PushNotification();
  }

  notification.send(message);
}
