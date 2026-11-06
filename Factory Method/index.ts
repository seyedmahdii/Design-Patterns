interface SystemNotification {
  send(message: string): void;
}

class EmailNotification implements SystemNotification {
  send(message: string): void {
    console.log(`Sending email notification: ${message}`);
  }
}

class SMSNotification implements SystemNotification {
  send(message: string): void {
    console.log(`Sending SMS notification: ${message}`);
  }
}

class PushNotification implements SystemNotification {
  send(message: string): void {
    console.log(`Sending push notification: ${message}`);
  }
}

abstract class NotificationCreator {
  abstract create(): SystemNotification;

  send(message: string) {
    const notification = this.create();
    notification.send(message);
  }
}

class EmailCreator extends NotificationCreator {
  create(): SystemNotification {
    return new EmailNotification();
  }
}

class SMSCreator extends NotificationCreator {
  create(): SystemNotification {
    return new SMSNotification();
  }
}

class PushCreator extends NotificationCreator {
  create(): SystemNotification {
    return new PushNotification();
  }
}

const creator: NotificationCreator = new EmailCreator();
creator.send("Hello");
