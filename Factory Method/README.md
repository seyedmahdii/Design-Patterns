# دیزاین پترن Factory Method

فرض کنید توی پروژه‌مون یه سیستم ارسال اعلان داریم که از Email، SMS و Push Notification پشتیبانی می‌کنه. در نسخه‌های اولیه ممکنه ساختن این سرویس‌ها رو مستقیما داخل کد انجام بدیم (فایل `before.ts`).

این روش در ابتدا شاید مشکلی نداشته باشه؛ ولی با اضافه شدن typeهای اعلان جدید، شرط‌ها و وابستگی‌های این تابع هم بیشتر میشن. در نتیجه هر بار که بخوایم یک type جدید اضافه کنیم، باید کد قبلی رو تغییر بدیم. کم‌کم مسئولیت ساختن آبجکت‌ها هم با منطق اصلی برنامه قاطی میشه.

پترن Factory Method می‌تونه کمک کنه. ایده اینه که به‌جای اینکه کد اصلی مستقیما تصمیم بگیره چه آبجکتی بسازه، این مسئولیت رو به یک متد جداگونه واگذار کنیم.

برای پیاده‌سازی اول یه interface برای محصول (Product) تعریف می‌کنیم. توی این پترن منظور از Product، آبجکت‌هایی هستن که از Factory Method برگردونده می‌شن. توی مثال ما می‌شن Notificationها:

```typescript
interface Notification {
  send(message: string): void;
}
```

بعد کلاس‌های مختلف این interface رو پیاده‌سازی می‌کنن:

```typescript
class EmailNotification implements Notification {
  send(message: string) {
    console.log(`Email: ${message}`);
  }
}

class SMSNotification implements Notification {
  send(message: string) {
    console.log(`SMS: ${message}`);
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log(`Push: ${message}`);
  }
}
```

حالا به‌جای اینکه مستقیماً این کلاس‌ها رو داخل منطق اصلی بسازیم، یک Creator تعریف می‌کنیم که متد ساخت Notification رو در اختیارمون قرار می‌ده:

```typescript
abstract class NotificationCreator {
  abstract create(): Notification;

  send(message: string) {
    const notification = this.create();
    notification.send(message);
  }
}
```

متد `create` یک Factory Method هست که به‌صورت abstract تعریف شده تا subclassها حتماً overrideش کنن. البته می‌تونستیم به‌جای abstract تعریف کردنش، یک محصول پیش‌فرض برگردونیم.

حالا برای هر نوع اعلان یک Creator می‌سازیم:

```typescript
class EmailCreator extends NotificationCreator {
  create(): Notification {
    return new EmailNotification();
  }
}

class SMSCreator extends NotificationCreator {
  create(): Notification {
    return new SMSNotification();
  }
}

class PushCreator extends NotificationCreator {
  create(): Notification {
    return new PushNotification();
  }
}
```

نحوه استفاده از این ساختار به این شکله:

```typescript
const creator: NotificationCreator = new EmailCreator();
creator.send("Hello!");
```

توی این مثال متد `send` نیازی نداره بدونه دقیقاً با چه نوع اعلانی کار می‌کنه. فقط با interface مشترک `Notification` سروکار داره و ساخت آبجکت به کلاس‌های Creator سپرده شده.

دیاگرام UML این پترن هم می‌تونه به درک بهتر کمک کنه:

<img width="2456" height="1448" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/0ca0b4c1-1f13-4bd4-914b-539afd0c2588" />

**چند تا نکته:**

- اضافه کردن نوع جدید محصول، معمولاً با اضافه کردن یک Product و Creator جدید انجام می‌شه.
- این الگو زمانی مفیده که منطق ساخت آبجکت‌ها پیچیده شده یا کلاس اصلی بیش از حد درگیر انتخاب و ساخت انواع مختلف آبجکت‌هاست.
- استفاده ازش برای پروژه‌های ساده ممکنه فقط پیچیدگی اضافه ایجاد کنه.

کل سورس توی فایل `index.ts` قرار گرفته.

