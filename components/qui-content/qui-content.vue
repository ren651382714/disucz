<template>
  <view ref="themeCount" class="themeCount" v-if="!isDeleted">
    <image
      class="addFine"
      src="@/static/essence.png"
      alt
      v-if="themeEssence && themeType == '1'"
      lazy-load
    ></image>
    <view class="themeItem" @click="backgroundClick">
      <view class="themeItem__header" @click="headClick" @click.stop="">
        <view class="themeItem__header__img">
          <qui-avatar :user="{ avatarUrl: themeImage, username: userName }" :is-real="isReal" />
        </view>
        <view class="themeItem__header__title">
          <view class="themeItem__header__title__top">
            <text class="themeItem__header__title__username">
              {{ userName }}
            </text>
            <text v-if="isAdmin && themeType == '1'" class="themeItem__header__title__isAdmin">
              <text
                v-for="(item, index) in userGroups"
                :key="index"
                :class="item.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
              >
                {{ item.isDisplay ? `${item.name}` : '' }}
              </text>
            </text>
            <text v-if="themeType !== '1'" class="themeItem__header__title__isAdmin">
              <!-- {{ themeType === '2' ? '回复了我' : '@了我' }} -->
              {{ themeStatus }}
            </text>
            <view v-if="themeType !== '1'" class="themeItem__header__title__jumpBtn"></view>
            <view class="themeItem__header__title__reward">{{ themeReward }}</view>
          </view>
          <view class="themeItem__header__title__time">{{ localTime }}</view>
        </view>
      </view>

      <view class="themeItem__content" @click.stop="" @click="contentClick">
        <view class="themeItem__content__text">
          <view class="themeItem__content__text__longessay" v-if="threadType === 1">
            <view class="themeItem__content__text__longessay__publish">
              {{ i18n.t('home.released') }} :
            </view>
            <!-- <qui-icon
              name="icon-link"
              :color="theme === $u.light() ? '#00479B' : '#1E78F3'"
              size="28"
              style="padding-left: 8rpx;"
            ></qui-icon> -->
            <qui-icon
              name="icon-fufei"
              color="#aaaaaa"
              size="30"
              style="padding-left: 10rpx;"
              v-if="themPayBtn"
            ></qui-icon>
            <navigator class="navPost">
              {{ themeContent }}
            </navigator>
          </view>
          <view :class="themPayBtn ? 'themeItem__content__uparse' : ''" v-else>
            <qui-icon
              name="icon-fufei"
              color="#aaaaaa"
              size="30"
              v-if="themPayBtn"
              class="themeItem__content__fufei"
            ></qui-icon>
            <qui-uparse
              :content="themeContent"
              :them-pay-btn="themPayBtn"
              class="themeItem__content__wxParse"
            ></qui-uparse>
          </view>
        </view>
        <view
          class="theme__content__videocover"
          v-if="threadType == 2 && !payStatus && coverImage != null"
          :style="{ height: videoWidth > videoHeight ? '' : '860rpx' }"
        >
          <view class="theme__mark"></view>
          <image class="theme__mark__open" src="/static/video.svg"></image>
          <image
            class="themeItem__content__coverimg"
            :src="coverImage"
            :style="{ height: videoWidth > videoHeight ? '' : '100%' }"
            :mode="videoWidth > videoHeight ? 'widthFix' : 'aspectFill'"
            lazy-load
          ></image>
        </view>
        <view class="theme__content__videocover" v-if="threadType === 2 && payStatus">
          <!-- 封面图 -->
          <view
            class="theme__content__videocover-img"
            v-if="threadType === 2 && payStatus && sun"
            :style="{ height: videoWidth > videoHeight ? '' : '860rpx' }"
          >
            <image class="theme__mark__open" src="/static/video.svg" @click.stop="btn"></image>
            <image
              class="themeItem__content__coverimg"
              :src="coverImage"
              :style="{ height: videoWidth > videoHeight ? '' : '100%' }"
              :mode="videoWidth > videoHeight ? 'widthFix' : 'aspectFill'"
              lazy-load
            ></image>
          </view>
          <!-- 视频 -->
          <video
            v-show="videoShow"
            :poster="coverImage"
            controls
            ref="myVideo"
            :id="'myVideo' + currentindex"
            class="isVideo"
            :duration="duration"
            preload="none"
            bindpause="handlepause"
            playsinline
            webkit-playsinline
            x5-playsinline
            :page-gesture="false"
            :show-fullscreen-btn="true"
            :show-play-btn="true"
            :autoplay="autoplay"
            auto-pause-if-open-native
            auto-pause-if-navigate
            :enable-play-gesture="false"
            :vslide-gesture="false"
            :vslide-gesture-in-fullscreen="false"
            object-fit="contain"
            :direction="videoWidth > videoHeight ? 90 : 0"
            x5-video-player-type="h5-page"
            :src="mediaUrl"
            :style="{
              width: '100%',
              height: videoWidth > videoHeight ? blocKwidth + 'rpx' : '860rpx',
            }"
            bindfullscreenchange="fullScreen"
            bindended="closeVideo"
            @play="playVideo"
            @click.stop=""
          ></video>
        </view>
        <view v-if="imagesList.length == 1">
          <view class="themeItem__content__imgone">
            <image
              class="themeItem__content__imgone__item"
              v-for="(image, index) in imagesList"
              :key="index"
              :mode="modeVal"
              :src="image.thumbUrl"
              @click="previewPicture(index)"
              @click.stop=""
              lazy-load
              alt
            ></image>
          </view>
        </view>
        <view v-if="imagesList.length == 2">
          <view class="themeItem__content__imgtwo">
            <image
              class="themeItem__content__imgtwo__item"
              v-for="(image, index) in imagesList"
              :key="index"
              :mode="modeVal"
              :src="image.thumbUrl"
              @click="previewPicture(index)"
              @click.stop=""
              lazy-load
              alt
            ></image>
          </view>
        </view>
        <view v-if="imagesList.length >= 3">
          <view class="themeItem__content__imgmore">
            <image
              class="themeItem__content__imgmore__item"
              v-for="(image, index) in imagesList"
              :key="index"
              :mode="modeVal"
              :src="image.thumbUrl"
              @click="previewPicture(index)"
              @click.stop=""
              lazy-load
              alt
            ></image>
            <view
              class="themeItem__content__imgmore__item"
              v-if="imagesList.length % 3 != 0"
              @click.stop=""
              lazy-load
            ></view>
          </view>
        </view>

        <view class="themeItem__content__tags" v-if="themeType === '0' && getCategoryId === 0">
          <view class="themeItem__content__tags__item" v-for="(item, index) in tags" :key="index">
            {{ item.name }}
          </view>
        </view>
        <view
          class="themeItem__content__tags  themeItem__content__tags--position"
          v-if="threadPosition.length > 0"
        >
          <view class="themeItem__content__tags__item" @click="topicPosition" @click.stop="">
            <qui-icon name="icon-weizhi" size="30" color="#777"></qui-icon>
            <text class="themeItem__content__tags__item-text">
              {{ threadPosition.length > 0 && threadPosition[0] }}
            </text>
          </view>
        </view>
      </view>

      <view class="themeItem__comment" @click.stop=""></view>

      <view class="themeItem__footer" @click.stop="">
        <view v-if="themeType === '1'" class="themeItem__footer__themeType1">
          <view
            :class="[
              'themeItem__footer__themeType1__item',
              'themeItem__footer__themeType1__great',
              isGreat && 'themeItem__footer__themeType1__greated',
            ]"
            @click="handleIsGreat"
          >
            <qui-icon class="qui-icon" name="icon-liked" size="28" v-if="isGreat"></qui-icon>
            <qui-icon class="qui-icon" name="icon-like" size="28" v-else></qui-icon>
            {{ isGreat ? t.giveLikeAlready : t.like }}
            {{ themeLike === 0 ? '' : themeLike }}
          </view>

          <view
            class="themeItem__footer__themeType1__item themeItem__footer__themeType1__comment"
            @click="commentClick"
          >
            {{ t.comment }}
            {{ themeComment === 0 ? '' : themeComment }}
          </view>

          <view
            class="themeItem__footer__themeType1__item themeItem__footer__themeType1__share"
            @click="handleClickShare"
          >
            <qui-icon class="qui-icon" name="icon-share" size="28" color="#AAA"></qui-icon>
            {{ t.share }}
          </view>
        </view>

        <view v-if="themeType === '2'" class="themeItem__footer__themeType2">
          <view class="themeItem__footer__themeType2__item">
            <qui-icon
              class="qui-icon"
              :name="themeReplyBtn"
              size="28"
              color="#AAA"
              @click="handleClick"
            ></qui-icon>
            {{ themeDeleteBtn }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { time2DateAndHM } from '@/utils/time';
import { mapState } from 'vuex';

export default {
  props: {
    themeType: {
      validator: value => {
        // 1 首页  2 回复  3 @  4 我的收藏
        return ['1', '2', '3'].indexOf(value) !== -1;
      },
      default: '1',
    },
    // 用户名
    userName: {
      type: String,
      default: '',
    },
    // 用户头像
    themeImage: {
      type: String,
      default: '',
    },
    // 头像实名认证加v
    isReal: {
      type: Boolean,
      default: false,
    },
    // 是否加精
    themeEssence: {
      type: Boolean,
      default: true,
    },
    // 帖子状态（回复了我，@了我）
    themeStatus: {
      type: String,
      default: '',
    },
    // icon图标
    themeBtn: {
      type: [String, Boolean],
      default: '',
    },
    // 回复的图标
    themeReplyBtn: {
      type: [String, Boolean],
      default: '',
    },
    // 删除的图标
    themeDeleteBtn: {
      type: String,
      default: '',
    },
    // 大赏的图标
    themeReward: {
      type: String,
      default: '',
    },
    // 用户组
    userGroups: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 内容
    themeContent: {
      type: String,
      default: '',
    },
    // 内容类型：0 文字 1 帖子 2 视频 3 图片
    threadType: {
      type: Number,
      default: 0,
    },
    // 内容区域图片
    imagesList: {
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    // 时间
    themeTime: {
      type: String,
      default: '',
    },
    // 点赞数量
    themeLike: {
      type: Number,
      default: 0,
    },
    // 评论数量
    themeComment: {
      type: Number,
      default: 0,
    },
    // 标签
    tagName: {
      type: String,
      default: '',
    },
    // 标签组
    tags: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否点赞 (赞，已赞)
    isGreat: {
      type: Boolean,
      default: false,
    },
    // 图片裁剪、缩放的模式
    modeVal: {
      type: String,
      default: 'aspectFill',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    threadVideo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    videoWidth: {
      type: Number,
      default: 0,
    },
    videoHeight: {
      type: Number,
      default: 0,
    },
    videoId: {
      type: [Number, String],
      default: 0,
    },
    currentindex: {
      type: Number,
      default: 0,
    },
    // 视频显示缩略图
    coverImage: {
      type: String,
      default: '',
    },
    // 是否支付
    payStatus: {
      type: Boolean,
      default: true,
    },
    // 是否删除
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // 滚动高度
    // scrollTop: {
    //   type: Number,
    //   default: 0,
    // },
    // 视频时间
    duration: {
      type: String,
      default: '',
    },
    // 内容是否付费
    themPayBtn: {
      type: Boolean,
      default: false,
    },
    threadPosition: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  data: () => {
    return {
      isAdmin: true,
      // threadVideo: '',
      threadWidth: '',
      threadHeight: '',
      videoContext: null, // 用于记录当前播放的视频的索引值
      // isGreat: false,
      preid: 0,
      currentid: 0,
      categoryShow: true,
      imageStatus: true,
      currentTop: 0,
      currentBottom: 0,
      videoShow: false,
      autoplay: false,
      sun: true,
      appear: false,
      blocKwidth: 224,
    };
  },

  computed: {
    // 语言包
    t() {
      return this.i18n.t('topic');
    },
    // 时间转化
    localTime() {
      return time2DateAndHM(this.themeTime);
    },
    ...mapState({
      getCategoryId: state => state.session.categoryId,
      getCategoryIndex: state => state.session.categoryIndex,
    }),
  },
  // watch: {
  //   scrollTop(newValue) {
  //     if (this.currentTop === 0 && this.currentBottom === 0) {
  //       return;
  //     }

  //     // console.log(
  //     //   newValue,
  //     //   this.currentBottom,
  //     //   this.currentTop,
  //     //   newValue > this.currentBottom || newValue < this.currentTop,
  //     //   'watch',
  //     // );
  //     if (newValue > this.currentBottom || newValue < this.currentTop) {
  //       this.videoContext.pause();
  //     }
  //   },
  // },
  onLoad() {
    // this.blocKwidth = (660 / this.videoWidth) * this.videoHeight;
  },
  mounted() {
    this.videoContext = wx.createVideoContext(`myVideo${this.$props.currentindex}`, this);
    this.blocKwidth = (660 / this.videoWidth) * this.videoHeight;
    // // #ifdef MP-WEIXIN
    // if (this.$props.threadType === 2 && this.$props.payStatus) {
    //   wx.createSelectorQuery()
    //     .in(this)
    //     .select(`#${`myVideo${this.$props.currentindex}`}`)
    //     .boundingClientRect(rect => {
    //       this.currentTop = this.$props.scrollTop + rect.top - wx.getSystemInfoSync().windowHeight;
    //       this.currentBottom = this.$props.scrollTop + rect.top + rect.height;
    //     })
    //     .exec();
    // }
    // // #endif
    // // #ifdef H5
    // const myVideo = document.querySelector(`#${`myVideo${this.$props.currentindex}`}`);
    // if (myVideo) {
    //   const offsetInfo = myVideo.getBoundingClientRect();
    //   this.currentTop = this.$props.scrollTop + offsetInfo.top - document.body.offsetHeight;
    //   this.currentBottom = this.$props.scrollTop + offsetInfo.top + offsetInfo.height;
    // }
    // // #endif
  },
  methods: {
    // 点击删除按钮
    deleteClick(evt) {
      this.$emit('deleteClick', evt);
    },
    // 分享按钮点击事件
    handleClickShare(evt) {
      this.$emit('click', evt);
    },
    // 点赞按钮点击事件
    handleIsGreat(evt) {
      this.$emit('handleIsGreat', evt);
    },
    // 点击评论跳转到详情页
    commentClick(evt) {
      this.$emit('commentClick', evt);
    },
    // 点击内容区域跳转到详情页
    contentClick(evt) {
      this.$emit('contentClick', evt);
    },
    // 点击头像跳转到个人主页
    headClick(evt) {
      this.$emit('headClick', evt);
    },
    // 点击整个区域, 优先级最低，如果覆盖有别的可点击区域，则此事件不会触发
    backgroundClick(evt) {
      this.$emit('backgroundClick', evt);
    },

    // 当开始/继续播放时触发play事件
    playVideo() {
      this.$emit('videoPlay', this.$props.currentindex, true);
    },
    // 视频不能同时播放
    pauseVideo() {
      this.videoContext.pause();
    },
    // 预览图片
    previewPicture(index) {
      if (this.threadType === 3 && !this.payStatus) {
        this.contentClick();
      } else {
        const _this = this;
        const preview = [];
        for (let i = 0, len = _this.imagesList.length; i < len; i += 1) {
          preview.push(_this.imagesList[i].url);
        }
        uni.previewImage({
          current: index,
          urls: preview,
          indicator: 'number',
        });
      }
    },
    // 头像加载失败,显示默认头像
    imageError() {
      this.imageStatus = false;
    },
    // 地理位置
    topicPosition() {
      const { threadPosition } = this;
      uni.navigateTo({
        url: `/pages/topic/position?longitude=${threadPosition[2]}&latitude=${threadPosition[3]}`,
      });
    },
    btn() {
      this.sun = false;
      this.videoShow = true;
      this.autoplay = true;
      setTimeout(() => {
        // console.log('视频开始播放', `myVideo${this.currentindex}`);
        const videoContext = uni.createVideoContext(`myVideo${this.currentindex}`, this);
        videoContext.play();
      }, 200);
      setTimeout(() => {
        const sun = uni.createSelectorQuery().in(this);
        sun
          .select('.isVideo')
          .boundingClientRect(data => {
            // console.log(data);
            this.$emit('scrollheight', data.top, this.$props.currentindex);
          })
          .exec();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.themeCount {
  position: relative;
  .addFine {
    position: absolute;
    top: -10rpx;
    left: 679rpx;
    width: 36rpx;
    height: 42rpx;
  }
}
.themeItem {
  padding: 30rpx;
  margin: 20rpx 0;
  background: --color(--qui-BG-2);
  // border-radius: 6rpx;
  // box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.05);
  border-top: solid 2rpx --color(--qui-BOR-ED);
  border-bottom: solid 2rpx --color(--qui-BOR-ED);
  box-sizing: border-box;

  &__header {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    width: auto;
    padding-bottom: 12rpx;
    box-sizing: border-box;

    &__img {
      width: 80rpx;
      height: 80rpx;
      margin-right: 18rpx;
      // background: #ccc;
      border-radius: 100%;

      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    &__title {
      flex: 1;

      &__top {
        display: flex;
        height: 37rpx;
        margin-left: 2rpx;
        font-family: $font-family;
        font-size: $fg-f4;
        line-height: 37rpx;
      }

      &__username {
        display: flex;
        max-width: 336rpx;
        overflow: hidden;
        font-weight: bold;
        line-height: 37rpx;
        color: --color(--qui-FC-333);
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: $switch-theme-time;
      }

      &__isAdmin {
        margin-left: 13rpx;
        font-weight: 400;
        color: --color(--qui-FC-AAA);
        transition: $switch-theme-time;
      }

      &__isAdminColor {
        padding: 2rpx 10rpx;
        font-size: $fg-f1;
        vertical-align: top;
        background: --color(--qui-BG-IT);
        border-radius: 18rpx;
        box-sizing: border-box;
      }

      &__time {
        padding-top: 10rpx;
        font-size: $fg-f2;
        font-weight: 400;
        line-height: 31rpx;
        color: --color(--qui-FC-AAA);
        transition: $switch-theme-time;
      }

      &__jumpBtn {
        float: right;
        width: 10rpx;
        height: 37rpx;
        font-size: 10rpx;
        line-height: 37rpx;
        color: #ddd;
      }
      &__deleteBtn {
        float: right;
      }
      &__reward {
        float: right;
        font-size: $fg-f4;
        font-weight: bold;
        color: --color(--qui-RED);
      }
    }
  }

  &__content {
    &__text {
      min-height: 45rpx;
      padding-bottom: 20rpx;
      overflow: hidden;
      font-family: $font-family;
      font-size: $fg-f4;
      font-weight: 400;
      line-height: 45rpx;
      color: --color(--qui-FC-333);
      word-wrap: break-word;
      &__longessay {
        // display: flex;
        // flex-direction: column;
        // word-break: break-all;
      }
    }
    &__reply {
      width: 670rpx;
      height: 145rpx;
      background: --color(--qui-BOR-ED);
      border-radius: 7rpx;
    }
    &__imgone {
      display: flex;
      justify-content: flex-start;
      margin-top: 10rpx;
      line-height: 0;
      &__item {
        max-width: 80%;
        max-height: 80%;
        border-radius: 5rpx;
      }
    }
    &__imgtwo {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      line-height: 0;
      &__item {
        display: block;
        width: 49.3%;
        height: 211rpx;
        margin-bottom: 10rpx;
        background: #fff;
        border-radius: 5rpx;
      }
    }
    &__imgmore {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
      margin-top: 30rpx;
      line-height: 0;
      &__item {
        display: block;
        width: 32%;
        height: 211rpx;
        margin-right: 1.33%;
        margin-bottom: 10rpx;
        border-radius: 5rpx;
      }
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;

      &__item {
        height: 50rpx;
        padding: 0 20rpx;
        margin: 0rpx 10rpx 8rpx 0;
        margin-bottom: 8rpx;
        font-family: $font-family;
        font-size: $fg-f2;
        font-weight: 400;
        line-height: 50rpx;
        color: rgba(119, 119, 119, 1);
        text-align: center;
        background: rgba(247, 247, 247, 1);
        border-radius: 6rpx;
      }
    }
    &__tags__item-text {
      margin-left: 10rpx;
    }
  }

  &__footer {
    &__themeType1 {
      display: flex;
      justify-content: space-between;
      margin-top: 60rpx;

      &__item {
        font-family: $font-family;
        font-size: $fg-f4;
        font-weight: 400;
        line-height: 37rpx;
        color: rgba(170, 170, 170, 1);
      }

      .qui-icon {
        margin-right: 15rpx;
      }
    }

    &__themeType2 {
      &__item {
        font-family: $font-family;
        font-size: $fg-f4;
        font-weight: 400;
        line-height: 37rpx;
        color: rgba(170, 170, 170, 1);
        text-align: right;
      }
      .qui-icon {
        margin-right: 15rpx;
      }
    }
  }
}

.themeItem__content__text__longessay__publish {
  display: inline-block;
}
.navPost {
  display: inline;
  padding-left: 8rpx;
  // font-weight: 900;
  color: var(--qui-LINK);
}
.themeItem__content__coverimg {
  width: 100%;
}
.theme__content__videocover {
  position: relative;
  &-img {
    z-index: 1;
    width: 100%;
  }
}
/deep/ .uni-video-cover {
  z-index: 0;
}
.theme__mark__open {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 80rpx;
  height: 80rpx;
  margin-top: -40rpx;
  margin-left: -40rpx;
}
.theme__mark {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
}
.themeItem__content__uparse {
  position: relative;
}
/deep/ .themeItem__content__uparse .themeItem__content__wxParse {
  text-indent: 40rpx;
}
.themeItem__content__uparse .themeItem__content__fufei {
  position: absolute;
  top: -2rpx;
}
</style>
