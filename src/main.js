import Vue from 'vue'
import VueI18n from 'vue-i18n'
import router from './router'

import App from './App.vue'

import en_US from './locales/en-US'
import zh_CN from './locales/zh-CN'
import zh_TW from './locales/zh-TW'
import ja_JP from './locales/ja-JP'
import ms_MY from './locales/ms-MY'

import $ from 'jquery'
global.jQuery = global.$ = $;

import 'bootstrap'
import GlobalConst from './globalconst'

import VoiceList from './voices.json'


//Extracting tags to language files
let addZh_CN = { voice: {}, voicecategory: {} };
let addZh_TW = { voice: {}, voicecategory: {} };
let adden_US = { voice: {}, voicecategory: {} };
let addja_JP = { voice: {}, voicecategory: {} };
let addms_MY = { voice: {}, voicecategory: {} };

for (let voiceCategoryList of VoiceList.voices){
  if(voiceCategoryList.categoryDescription !== undefined){
    if(voiceCategoryList.categoryDescription['zh-CN'] !== undefined){
      addZh_CN.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['zh-CN'];
    }
    if(voiceCategoryList.categoryDescription['zh-TW'] !== undefined){
      addZh_TW.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['zh-TW'];
    }
    if(voiceCategoryList.categoryDescription['en-US'] !== undefined){
      adden_US.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['en-US'];
    }
    if(voiceCategoryList.categoryDescription['ja-JP'] !== undefined){
      addja_JP.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['ja-JP'];
    }
    if(voiceCategoryList.categoryDescription['ms-MY'] !== undefined){
      addms_MY.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['ms-MY'];
    }
  }
  for (let voiceItem of voiceCategoryList.voiceList){
    if(voiceItem.description !== undefined){
      if(voiceItem.description['zh-CN'] !== undefined){
        addZh_CN.voice[voiceItem.name] = voiceItem.description['zh-CN'];
      }
      if(voiceItem.description['zh-TW'] !== undefined){
        addZh_TW.voice[voiceItem.name] = voiceItem.description['zh-TW'];
      }
      if(voiceItem.description['en-US'] !== undefined){
        adden_US.voice[voiceItem.name] = voiceItem.description['en-US'];
      }
      if(voiceItem.description['ja-JP'] !== undefined){
        addja_JP.voice[voiceItem.name] = voiceItem.description['ja-JP'];
      }
      if(voiceItem.description['ms-MY'] !== undefined){
        addms_MY.voice[voiceItem.name] = voiceItem.description['ms-MY'];
      }
    }
  }
}

let emzh_CN = Object.assign(zh_CN, addZh_CN);
let emzh_TW = Object.assign(zh_TW, addZh_TW);
let emen_US = Object.assign(en_US, adden_US);
let emja_JP = Object.assign(ja_JP, addja_JP);
let emms_MY = Object.assign(ms_MY, addms_MY);

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(GlobalConst);

const messages = {
  'en-US': emen_US,
  'zh-CN': emzh_CN,
  'zh-TW': emzh_TW,
  'ja-JP': emja_JP,
  'ms-MY': emms_MY
}

let locale = 'zh-CN';
// if(/ja/i.test(navigator.language)){
//   locale = 'ja-JP';
// }
// else
if(/cn/i.test(navigator.language)) {
  locale = 'zh-CN';
}
// else if(/ms/i.test(navigator.language)) {
//   locale = 'ms-MY';
// }

const i18n = new VueI18n({
  locale,
  messages
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
