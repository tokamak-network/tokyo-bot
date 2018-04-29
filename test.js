//Referenced : https://github.com/SerjoPepper/delorean_bot/blob/master/src/bot.js

const config = require('./config.json');
const TOKEN = config.TOKEN;
const _q = require('./questions.json');

const bb = require('bot-brother');

const bot = bb({
  key: TOKEN,
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});


const targetJSON = {};

// Let's create command '/start'.
bot.command('start')
.invoke(function (ctx) {
  // Setting data, data is used in text message templates.
  ctx.data.user = ctx.meta.user;
  console.log(ctx.data);
  let message = '안녕하세요 <%=user.first_name%>님. 토큰과 크라우드세일 설문을 시작하겠습니다. \n'+_q.q1;
  return ctx.sendMessage(message);
})
.keyboard([
  [{'button.locale': {go: 'settings_locale'}}],
  [{'button.timezone': {go: 'settings_timezone'}}]
]);;

// Creating command '/upload_photo'.
bot.command('upload_photo')
.invoke(function (ctx) {
  console.log(ctx.data);
  return ctx.sendMessage('Drop me a photo, please');
})
.answer(function (ctx) {
  // ctx.message is an object that represents Message.
  // See https://core.telegram.org/bots/api#message
  return ctx.sendPhoto(ctx.message.photo[0].file_id, {caption: 'I got your photo!'});
});

// bot.use('before', function (ctx) {
//   return ctx.sendMessage('bot before');
// })
// .use('beforeInvoke', function (ctx) {
//   return ctx.sendMessage('bot beforeInvoke');
// })
// .use('beforeAnswer', function (ctx) {
//   return ctx.sendMessage('bot beforeAnswer');
// });
//
// // This callback cathes all commands.
// bot.command(/.*/).use('before', function (ctx) {
//   return ctx.sendMessage('rgx before');
// })
// .use('beforeInvoke', function (ctx) {
//   return ctx.sendMessage('rgx beforeInvoke');
// })
// .use('beforeAnswer', function (ctx) {
//   return ctx.sendMessage('rgx beforeAnswer');
// });
//
// bot.command('hello')
// .use('before', function (ctx) {
//   return ctx.sendMessage('hello before');
// })
// .use('beforeInvoke', function (ctx) {
//   return ctx.sendMessage('hello beforeInvoke');
// })
// .use('beforeAnswer', function (ctx) {
//   return ctx.sendMessage('hello beforeAnswer');
// })
// .invoke(function (ctx) {
//   return ctx.sendMessage('hello invoke');
// })
// .answer(function (ctx) {
//   return ctx.go('world');
// });
//
// bot.command('world')
// .use('before', function (ctx) {
//   return ctx.sendMessage('world before');
// })
// .invoke(function (ctx) {
//   return ctx.sendMessage('world invoke');
// });
