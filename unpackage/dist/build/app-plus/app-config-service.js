
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/share/weixinchome","pages/topic/content","pages/topic/position","pages/topic/list","pages/topic/topic","pages/user/phone-login","pages/user/uc-login","pages/user/login-bind","pages/user/register-bind","pages/user/login","pages/user/register","pages/topic/index","pages/topic/comment","pages/my/profile","pages/my/wallet","pages/my/freeze","pages/my/withdrawalslist","pages/my/walletlist","pages/my/orderlist","pages/my/favorite","pages/my/shield","pages/profile/index","pages/site/index","pages/site/info","pages/site/payH5","pages/site/partner-invite","pages/site/search","pages/site/search-theme","pages/site/search-user","pages/invite/index","pages/invite/invited","pages/invite/income","pages/invite/user","pages/notice/notice","pages/notice/msglist","pages/manage/index","pages/manage/member","pages/manage/users","pages/manage/invite","pages/topic/post","pages/user/at-member","pages/common/message","pages/share/topic","pages/share/site","pages/modify/editusername","pages/modify/mobile","pages/modify/setphon","pages/modify/paypwd","pages/modify/withdrawals","pages/modify/editpwd","pages/modify/realname","pages/modify/signature","pages/modify/newpwd","pages/modify/findpwd","pages/modify/authen","pages/user/wechat","pages/common/view"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#fff","backgroundColor":"#F8F8F8","softinputMode":"adjustResize"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"h5luntan","compilerVersion":"2.8.6","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"backgroundTextStyle":"dark","onReachBottomDistance":100}},{"path":"/pages/share/weixinchome","meta":{},"window":{"navigationBarTitleText":"相册选取"}},{"path":"/pages/topic/content","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationStyle":"default","enablePullDownRefresh":true}},{"path":"/pages/topic/position","meta":{},"window":{"navigationBarTitleText":"位置信息"}},{"path":"/pages/topic/list","meta":{},"window":{"navigationBarTitleText":"话题列表","navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationStyle":"default","enablePullDownRefresh":true}},{"path":"/pages/topic/topic","meta":{},"window":{"navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationBarTitleText":"#话题#"}},{"path":"/pages/user/phone-login","meta":{},"window":{"navigationBarTitleText":"手机号码登录"}},{"path":"/pages/user/uc-login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/user/login-bind","meta":{},"window":{"navigationBarTitleText":"登录并绑定"}},{"path":"/pages/user/register-bind","meta":{},"window":{"navigationBarTitleText":"注册并绑定"}},{"path":"/pages/user/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/user/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/topic/index","meta":{},"window":{"navigationBarTitleText":"内容详情页","enablePullDownRefresh":true}},{"path":"/pages/topic/comment","meta":{},"window":{"navigationBarTitleText":"评论详情页","enablePullDownRefresh":true}},{"path":"/pages/my/profile","meta":{},"window":{"navigationBarTitleText":"我的资料"}},{"path":"/pages/my/wallet","meta":{},"window":{"navigationBarTitleText":"我的钱包"}},{"path":"/pages/my/freeze","meta":{},"window":{"navigationBarTitleText":"冻结金额"}},{"path":"/pages/my/withdrawalslist","meta":{},"window":{"navigationBarTitleText":"提现记录"}},{"path":"/pages/my/walletlist","meta":{},"window":{"navigationBarTitleText":"钱包明细"}},{"path":"/pages/my/orderlist","meta":{},"window":{"navigationBarTitleText":"订单明细"}},{"path":"/pages/my/favorite","meta":{},"window":{"navigationBarTitleText":"我的收藏"}},{"path":"/pages/my/shield","meta":{},"window":{"navigationBarTitleText":"屏蔽设置"}},{"path":"/pages/profile/index","meta":{},"window":{"navigationBarTitleText":"个人主页","enablePullDownRefresh":true,"onReachBottomDistance":80}},{"path":"/pages/site/index","meta":{},"window":{"navigationBarTitleText":"站点信息"}},{"path":"/pages/site/info","meta":{},"window":{"navigationBarTitleText":"站点信息"}},{"path":"/pages/site/payH5","meta":{},"window":{"navigationBarTitleText":"站点信息"}},{"path":"/pages/site/partner-invite","meta":{},"window":{"navigationBarTitleText":"站点信息"}},{"path":"/pages/site/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/site/search-theme","meta":{},"window":{"navigationBarTitleText":"主题搜索"}},{"path":"/pages/site/search-user","meta":{},"window":{"navigationBarTitleText":"用户搜索"}},{"path":"/pages/invite/index","meta":{},"window":{"navigationBarTitleText":"邀请朋友"}},{"path":"/pages/invite/invited","meta":{},"window":{"navigationBarTitleText":"受邀朋友"}},{"path":"/pages/invite/income","meta":{},"window":{"navigationBarTitleText":"收益明细"}},{"path":"/pages/invite/user","meta":{},"window":{"navigationBarTitleText":"用户收益"}},{"path":"/pages/notice/notice","meta":{},"window":{"navigationBarTitleText":"通知"}},{"path":"/pages/notice/msglist","meta":{},"window":{"navigationBarTitleText":"来往记录","enablePullDownRefresh":true}},{"path":"/pages/manage/index","meta":{},"window":{"navigationBarTitleText":"站点管理"}},{"path":"/pages/manage/member","meta":{},"window":{"navigationBarTitleText":"成员管理"}},{"path":"/pages/manage/users","meta":{},"window":{"navigationBarTitleText":"站点成员"}},{"path":"/pages/manage/invite","meta":{},"window":{"navigationBarTitleText":"邀请成员"}},{"path":"/pages/topic/post","meta":{},"window":{"navigationBarTitleText":"发布","navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationStyle":"default"}},{"path":"/pages/user/at-member","meta":{},"window":{"navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","navigationBarTitleText":""}},{"path":"/pages/common/message","meta":{},"window":{"navigationBarBackgroundColor":"#fff","navigationBarTitleText":"信息提示","disableScroll":true}},{"path":"/pages/share/topic","meta":{},"window":{"navigationBarTitleText":"分享海报"}},{"path":"/pages/share/site","meta":{},"window":{"navigationBarTitleText":"分享海报"}},{"path":"/pages/modify/editusername","meta":{},"window":{"navigationBarTitleText":"修改用户名"}},{"path":"/pages/modify/mobile","meta":{},"window":{"navigationBarTitleText":"修改手机号"}},{"path":"/pages/modify/setphon","meta":{},"window":{"navigationBarTitleText":"设置新手机"}},{"path":"/pages/modify/paypwd","meta":{},"window":{"navigationBarTitleText":"设置支付密码"}},{"path":"/pages/modify/withdrawals","meta":{},"window":{"navigationBarTitleText":"提现"}},{"path":"/pages/modify/editpwd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/modify/realname","meta":{},"window":{"navigationBarTitleText":"实名认证"}},{"path":"/pages/modify/signature","meta":{},"window":{"navigationBarTitleText":"签名"}},{"path":"/pages/modify/newpwd","meta":{},"window":{"navigationBarTitleText":"设置新密码"}},{"path":"/pages/modify/findpwd","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/modify/authen","meta":{},"window":{"navigationBarTitleText":"验证身份"}},{"path":"/pages/user/wechat","meta":{},"window":{"navigationBarTitleText":"微信授权"}},{"path":"/pages/common/view","meta":{},"window":{"navigationBarTitleText":""}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});