//Referenced : https://github.com/SerjoPepper/delorean_bot/blob/master/src/bot.js

const config = require('./config.json');
const TOKEN = config.TOKEN;
const _q = require('./questions.json'); //questions
var _r = require('./result_default.json'); //result default answers

const bb = require('bot-brother');

const bot = bb({
  key: TOKEN,
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});


// Let's create command '/start'.
bot.command('start')
.invoke( ctx => {
  console.log("hello");
  // console.log(_q._comment);
  // Setting data, data is used in text message templates.
  ctx.data.user = ctx.meta.user;
  // console.log(ctx.data);
  let message =
    '안녕하세요 <%=user.first_name%>님. 토큰과 크라우드세일 설문을 시작하겠습니다. \n\n'
    +_q.General.message.triple_dilemma;
  return ctx.sendMessage(message);
})
.keyboard([
  [{'네': {value : true}}],
  [{'아니오': {value : false}}]
])
.answer( ctx => {
  if(ctx.answer){
    return ctx.go('General.project_name');
  } else {
    return ctx.repeat(); //Should be fixed. It directed to explanation of triple_dilemma
  }
});

//General.project_neme
bot.command('General.project_name')
.invoke( ctx => {
  let message = _q.General.message.project_name;
  return ctx.sendMessage(message);
})
.answer( ctx => {
  _r.project_name = ctx.answer;
  console.log('*** project_name log ***\n', _r);
  return ctx.go('Token.token_name');
});

//Token.token_name
bot.command('Token.token_name')
.invoke( ctx => {
  let message = _q.Token.message.token_name;
  return ctx.sendMessage(message);
})
.answer( ctx => {
  _r.token.token_name = ctx.answer;
  console.log("*** token_name log ***\n", _r.token);
  return ctx.go('Token.symbol');
});

//Token.symbol
bot.command('Token.symbol')
.invoke( ctx => {
  let message = _q.Token.message.symbol;
  return ctx.sendMessage(message);
})
.answer( ctx => {
  _r.token.token_symbol = ctx.answer;
  console.log('***token symbol log***\n\n', _r.token);
  return ctx.go('Token.is_minime');
})

//Token.is_minime
bot.command("Token.is_minime")
.invoke(ctx => {
  let message = _q.Token.message.is_minime;
  return ctx.sendMessage(message);
})
.keyboard([
  [{'ERC20토큰' : {value : false} }],
  [{'미니미토큰' :  {value : true} }]
])
.answer(ctx => {
  _r.token.token_type.is_minime = ctx.answer;
  console.log('*** is minime log ***\n', _r.token);
  return ctx.go('Token.decimal');
});

//Token.decimal
bot.command('Token.decimal')
.invoke( ctx => {
  let message = _q.Token.message.decimal;
  return ctx.sendMessage(message)
})
.answer( ctx => {
  _r.token.decimals = parseInt(ctx.answer);
  console.log('*** decimal log ***\n', _r.token);
  return ctx.go('Token.burnable');
});

//Token.burnable
bot.command('Token.burnable')
.invoke( ctx => {
  let message = _q.Token.message.burnable;
  return ctx.sendMessage(message);
})
.keyboard([
  [{'Burn 가능' : {value : true} }],
  [{'Burn 불가능' :  {value : false} }]
])
.answer(ctx => {
  _r.token.token_option.burnable = ctx.answer;
  console.log("*** burnable log ***\n", _r.token);
  return ctx.go('Token.pausable');
});

//Token.puasable
bot.command('Token.pausable')
.invoke( ctx => {
  let message = _q.Token.message.pausable;
  return ctx.sendMessage(message);
})
.keyboard([
  [{'Pause 가능' : {value : true} }],
  [{'Pause 불가능' :  {value : false} }]
])
.answer(ctx => {
  _r.token.token_option.pausable = ctx.answer;
  console.log("*** pausable log ***\n", _r.token);
  return ctx.go('Token.new_owner');
});

//Token.new_owner
bot.command('Token.new_owner')
.invoke( ctx => {
  let message = _q.Token.message.new_owner;
  return ctx.sendMessage(message);
})
.answer( ctx => {
  _r.sale.new_token_owner = ctx.answer;
  console.log("*** new owner log ***\n", _r.sale.new_token_owner);
  return ctx.go('');
});


//template


// bot.command('')
// .invoke( ctx => {
//   let message = _q.
//   return ctx.sendMessage(message);
// })
// .answer( ctx => {
//   _r.
//   console.log('*** ***', _r);
//   return ctx.go('');
// });




// Creating command '/upload_photo'.
// bot.command('upload_photo')
// .invoke(function (ctx) {
//   console.log(ctx.data);
//   return ctx.sendMessage('Drop me a photo, please');
// })
// .answer(function (ctx) {
//   // ctx.message is an object that represents Message.
//   // See https://core.telegram.org/bots/api#message
//   return ctx.sendPhoto(ctx.message.photo[0].file_id, {caption: 'I got your photo!'});
// });

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
