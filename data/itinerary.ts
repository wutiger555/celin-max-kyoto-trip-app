

import { DayPlan, ActivityType, FlightInfo } from '../types';

export const HOTELS = {
  kyoto: {
    name: "Mitsui Garden Hotel Kyoto Shinmachi Bettei",
    address: "京都市中京區新町通六角下ル六角町361",
    japaneseAddress: "三井ガーデンホテル京都新町 別邸",
    dates: "12/19 - 12/22 (3 晚)",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/24220760.jpg?k=336125434523456",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei"
  },
  osaka: {
    name: "Candeo Hotels Osaka The Tower",
    address: "大阪府大阪市北區堂島浜1-1-27",
    japaneseAddress: "カンデオホテルズ大阪ザ・タワー",
    dates: "12/22 - 12/24 (2 晚)",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/49834567.jpg", // Generic high-rise hotel image
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower"
  }
};

export const FLIGHTS: { outbound: FlightInfo; inbound: FlightInfo } = {
  outbound: {
    code: "VZ566",
    airline: "泰越捷航空",
    status: "On Time",
    departure: { airport: "Taipei (Taoyuan)", code: "TPE", terminal: "1", time: "07:30" },
    arrival: { airport: "Osaka (Kansai)", code: "KIX", terminal: "1", time: "11:00" },
    route: "TPE (T1) ➜ KIX (T1)",
    time: "07:30 - 11:00"
  },
  inbound: {
    code: "VZ567",
    airline: "泰越捷航空",
    status: "Scheduled",
    departure: { airport: "Osaka (Kansai)", code: "KIX", terminal: "1", time: "12:00" },
    arrival: { airport: "Taipei (Taoyuan)", code: "TPE", terminal: "1", time: "14:15" },
    route: "KIX (T1) ➜ TPE (T1)",
    time: "12:00 - 14:15"
  }
};

export const ITINERARY_DATA: DayPlan[] = [
  {
    date: "12/19",
    dayOfWeek: "五",
    title: "Day 1",
    theme: "清水寺・東山・先斗町",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d1-1",
        time: "11:00",
        title: "抵達關西機場 (KIX)",
        type: ActivityType.FLIGHT,
        description: "入境後前往 2F JR 車站。購買 HARUKA 車票 & ICOCA 卡。",
        address: "関西国際空港 T1",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Station",
        walkingGuide: "入境大廳在 1F，搭手扶梯上 2F，通過空橋至對面「關西機場車站」。尋找綠色/白色售票機或櫃檯。"
      },
      {
        id: "d1-2",
        time: "12:15",
        title: "HARUKA 特急 → 京都",
        type: ActivityType.TRAIN,
        description: "搭乘 Hello Kitty 列車前往京都車站 (約 75 分)。",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
        transport: {
          line: "HARUKA 特急",
          destination: "往 京都 (Kyoto)",
          station: "關西機場站",
          platform: "4 號月台",
          duration: 75
        },
        notes: "可先在 Klook 買票，現場找白色機器兌換實體票。"
      },
      {
        id: "d1-3",
        time: "14:00",
        title: "Check-in: 三井花園新町別邸",
        type: ActivityType.HOTEL,
        description: "充滿京都風情的町家改建飯店。辦理入住手續。",
        japaneseAddress: "三井ガーデンホテル京都新町 別邸",
        address: "京都市中京區新町通六角下ル六角町361",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei",
        transport: {
          line: "地鐵烏丸線",
          destination: "往 國際會館",
          station: "京都站",
          platform: "地下月台",
          duration: 15
        },
        walkingGuide: "京都站搭地鐵至「四條站」(K09)，走 22 號出口，步行約 7 分鐘抵達飯店。"
      },
      {
        id: "d1-4",
        time: "15:30",
        title: "清水寺 & 二三年坂",
        type: ActivityType.SIGHTSEEING,
        description: "散步路線：清水寺 → 三年坂 → 二年坂。拍照點：石板坡道＋八坂の塔遠景。",
        address: "京都市東山區清水",
        location: { lat: 34.9949, lng: 135.7850 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kiyomizu-dera",
        transport: {
          line: "市營公車 206/207",
          destination: "往 清水寺",
          station: "四條烏丸",
          platform: "公車站",
          duration: 20
        },
        businessHours: "6:00 - 18:00",
        estimatedCost: "¥400 入場",
        instagramTag: "#清水寺",
        tips: [
          "清晨人較少，建議早點到",
          "從清水坂往上走可避開人潮",
          "二年坂有很多小店可逛"
        ]
      },
      {
        id: "d1-5",
        time: "17:00",
        title: "八坂神社 & 祇園花見小路",
        type: ActivityType.SIGHTSEEING,
        description: "拍照點：鳥居、石燈籠、町家街景。感受京都夜色。",
        address: "京都市東山区祇園町北側625",
        location: { lat: 35.0037, lng: 135.7785 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yasaka+Shrine"
      },
      {
        id: "d1-6",
        time: "18:30",
        title: "晚餐：柚子元 (Yuzugen)",
        type: ActivityType.FOOD,
        description: "先斗町的柚子豬肉鍋名店。清爽柚子湯底，搭配大量蔥花。",
        japaneseAddress: "先斗町の柚子元（ゆずげん）",
        address: "京都市中京区鍋屋町178",
        location: { lat: 35.0039, lng: 135.7709 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yuzugen+Kyoto",
        notes: "需提前預約。",
        businessHours: "17:00 - 23:00",
        closedDays: "週日休",
        phone: "+81-75-213-2123",
        estimatedCost: "¥3,000 ~ ¥5,000/人",
        reservationRequired: true,
        instagramTag: "#柚子元",
        tips: [
          "招牌是柚子豬肉鍋",
          "可請飯店協助預約",
          "先斗町很有氣氛，可早點去逛逛"
        ]
      },
      {
        id: "d1-7",
        time: "20:30",
        title: "鴨川散步 & 咖啡備案",
        type: ActivityType.SIGHTSEEING,
        description: "回飯店途中，可順路去 Coffee to Canele 或 Goodman Roaster 外帶一杯。",
        location: { lat: 35.0050, lng: 135.7700 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kamogawa+River",
        backups: [
          { name: "Coffee to Canele", description: "精緻可麗露與咖啡", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffee+to+Canele+Kyoto" },
          { name: "Goodman Roaster", description: "高品質手沖咖啡", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Goodman+Roaster+Kyoto" }
        ],
        walkingGuide: "沿著鴨川漫步，享受夜晚寧靜。步行回飯店約 20 分鐘。",
        notes: "傳說在鴨川邊許願的情侶會永遠幸福 ♡"
      }
    ]
  },
  {
    date: "12/20",
    dayOfWeek: "六",
    title: "Day 2",
    theme: "嵐山竹林・蕎麥麵・金閣",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d2-1",
        time: "08:30",
        title: "前往嵐山",
        type: ActivityType.TRAIN,
        description: "阪急四條 → 嵐山站。準備開始嵐山行程。",
        location: { lat: 35.0035, lng: 135.7595 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Karasuma+Station",
        transport: {
          line: "阪急京都線 -> 嵐山線",
          destination: "往 嵐山",
          station: "烏丸站",
          platform: "需在桂站轉乘",
          duration: 35
        }
      },
      {
        id: "d2-2",
        time: "09:00",
        title: "嵐山竹林小徑 & 野宮神社",
        type: ActivityType.SIGHTSEEING,
        description: "拍照重點：竹林步道、神社鳥居。可繞去渡月橋拍河景。",
        address: "京都市右京區嵯峨野",
        location: { lat: 35.0170, lng: 135.6730 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Bamboo+Grove",
        notes: "野宮神社是戀愛成就的聖地。撫摸「龜石」許願，據說一年內願望會實現 🐢✨"
      },
      {
        id: "d2-3",
        time: "11:00",
        title: "午餐：嵐山 よしむら (Yoshimura)",
        type: ActivityType.FOOD,
        description: "河畔老字號手打蕎麥麵+天婦羅。窗邊可看桂川與渡月橋。",
        japaneseAddress: "嵐山よしむら（蕎麦）",
        address: "京都市右京区嵯峨天龍寺芒ノ馬場町",
        location: { lat: 35.0135, lng: 135.6770 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Yoshimura",
        notes: "建議開店即報到，排隊時間較短。嵐山必吃午餐。"
      },
      {
        id: "d2-4",
        time: "13:00",
        title: "甜點/咖啡時光",
        type: ActivityType.FOOD,
        description: "選擇一間喜歡的咖啡廳休息。",
        address: "嵐山區域",
        location: { lat: 35.0145, lng: 135.6775 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=eX+cafe+Arashiyama",
        backups: [
          { name: "eX cafe 本店", description: "烤糰子+抹茶，庭園好拍", type: "Sweets", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=eX+cafe+Arashiyama" },
          { name: "Kumonocha Café", description: "雲朵慕斯，可愛風", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kumonocha+Cafe+Arashiyama" },
          { name: "ReUnion", description: "高評分小咖啡車", type: "Coffee", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffee+Stand+ReUnion+Arashiyama" }
        ]
      },
      {
        id: "d2-5",
        time: "15:30",
        title: "金閣寺 (夕照)",
        type: ActivityType.SIGHTSEEING,
        description: "搭乘公車前往金閣寺。欣賞夕陽下的金色倒影。",
        address: "京都市北區金閣寺町1",
        location: { lat: 35.0394, lng: 135.7292 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kinkakuji",
        transport: {
          line: "嵐電 + 公車 205",
          destination: "往 金閣寺道",
          station: "嵐山",
          platform: "路面電車轉公車",
          duration: 40
        },
        tips: ["金閣寺的金箔象徵永恆不變 — just like us 💛"]
      },
      {
        id: "d2-6",
        time: "17:00",
        title: "北野天滿宮",
        type: ActivityType.SIGHTSEEING,
        description: "楓苑落葉地毯 (若有開放)，或單純參觀神社。",
        address: "京都市上京区馬喰町",
        location: { lat: 35.0315, lng: 135.7351 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kitano+Tenmangu"
      },
      {
        id: "d2-7",
        time: "19:00",
        title: "晚餐：名代炸豬排 三條本店",
        type: ActivityType.FOOD,
        description: "搭公車回市區。經典好吃的炸豬排。",
        address: "京都市中京区三条通寺町東入石橋町16",
        location: { lat: 35.0087, lng: 135.7705 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Katsukura+Sanjo"
      }
    ]
  },
  {
    date: "12/21",
    dayOfWeek: "日",
    title: "Day 3",
    theme: "宇治・壽司・伏見稻荷",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d3-1",
        time: "09:30",
        title: "前往宇治",
        type: ActivityType.TRAIN,
        description: "京阪祇園四條 → 宇治。",
        location: { lat: 35.0037, lng: 135.7720 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Gion-Shijo+Station",
        transport: {
          line: "京阪本線 -> 宇治線",
          destination: "往 宇治",
          station: "祇園四條",
          platform: "中書島轉乘",
          duration: 35
        }
      },
      {
        id: "d3-2",
        time: "10:30",
        title: "平等院 & 宇治上神社",
        type: ActivityType.SIGHTSEEING,
        description: "參觀鳳凰堂、宇治川散步。可去中村藤吉吃甜點。",
        address: "宇治市宇治蓮華116",
        location: { lat: 34.8893, lng: 135.8077 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Byodoin+Temple"
      },
      {
        id: "d3-3",
        time: "13:00",
        title: "午餐：吉乃壽司 (Yoshino)",
        type: ActivityType.FOOD,
        description: "祇園小壽司店，握壽司為主。米其林 Bib 推薦。",
        japaneseAddress: "吉乃寿司（よしのずし）",
        address: "京都市東山区松原通大和大路東入",
        location: { lat: 34.9965, lng: 135.7730 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yoshino+Sushi+Kyoto",
        notes: "現場排隊為主，價格中高但不天價。"
      },
      {
        id: "d3-4",
        time: "16:00",
        title: "伏見稻荷千本鳥居",
        type: ActivityType.SIGHTSEEING,
        description: "建議往山腰走一小段，人會少很多。",
        address: "京都市伏見区深草藪之内町68",
        location: { lat: 34.9671, lng: 135.7727 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Fushimi+Inari+Taisha",
        transport: {
          line: "京阪本線",
          destination: "往 伏見稻荷",
          station: "祇園四條",
          platform: "紅色線",
          duration: 10
        }
      },
      {
        id: "d3-5",
        time: "18:30",
        title: "晚餐：Fujitate (藤建)",
        type: ActivityType.FOOD,
        description: "主廚おまかせ和食，小而精的高評價名店。",
        japaneseAddress: "Fujitate（フジタテ）",
        address: "京都市下京区西木屋町通松原上る",
        location: { lat: 35.0010, lng: 135.7690 }, // Approximate
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Fujitate+Kyoto",
        notes: "建議事前預約。更有代表性的和食體驗。"
      }
    ]
  },
  {
    date: "12/22",
    dayOfWeek: "一",
    title: "Day 4",
    theme: "移動日・南禪寺・大阪夜景",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d4-1",
        time: "09:00",
        title: "退房 & 行李寄放",
        type: ActivityType.HOTEL,
        description: "Check-out，行李寄放櫃台。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei"
      },
      {
        id: "d4-2",
        time: "09:15",
        title: "南禪寺 & 永觀堂",
        type: ActivityType.SIGHTSEEING,
        description: "水路閣紅磚拱橋很好拍。永觀堂周邊散步。",
        address: "京都市左京區南禪寺福地町",
        location: { lat: 35.0113, lng: 135.7936 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nanzen-ji"
      },
      {
        id: "d4-3",
        time: "11:30",
        title: "午餐：花咲 萬次郎",
        type: ActivityType.FOOD,
        description: "東山傳統町家內的懷石午膳。氛圍非常日式。",
        japaneseAddress: "花咲 萬治郎（はなさき まんじろう）",
        address: "京都市東山区高台寺北門前通下河原東入ル",
        location: { lat: 35.0015, lng: 135.7795 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hanasaki+Manjiro",
        notes: "需事前訂位。京都壓軸午餐。"
      },
      {
        id: "d4-4",
        time: "13:00",
        title: "計程車取行李 → 大阪",
        type: ActivityType.TRAIN,
        description: "回飯店取行李 → JR 京都站 → JR 大阪站。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
        transport: {
          line: "JR 新快速",
          destination: "往 大阪",
          station: "京都站",
          platform: "4/5 號月台",
          duration: 30
        }
      },
      {
        id: "d4-5",
        time: "14:30",
        title: "Check-in: 燦多酒店",
        type: ActivityType.HOTEL,
        description: "Candeo Hotels Osaka The Tower。抵達後前往高樓層大廳。",
        japaneseAddress: "カンデオホテルズ大阪ザ・タワー",
        address: "大阪府大阪市北區堂島浜1-1-27",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower"
      },
      {
        id: "d4-6",
        time: "15:30",
        title: "梅田剪髮 / 燙髮",
        type: ActivityType.SIGHTSEEING,
        description: "梅田一帶髮廊。預留約 2 小時。",
        address: "Umeda Area",
        location: { lat: 34.7024, lng: 135.4959 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Umeda+Station",
        notes: "自行預約。等待時可去 Whitebird Coffee Stand。"
      },
      {
        id: "d4-7",
        time: "17:30",
        title: "御堂筋聖誕燈飾",
        type: ActivityType.SIGHTSEEING,
        description: "散步欣賞大道燈飾。",
        location: { lat: 34.6937, lng: 135.5023 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Midosuji+Illumination"
      },
      {
        id: "d4-8",
        time: "19:30",
        title: "晚餐：北村壽喜燒 / Haruna",
        type: ActivityType.FOOD,
        description: "北村 (Kitamura)：米其林老店 (註明 No Beef)。或改吃 Haruna (壽喜燒串炸)。",
        japaneseAddress: "北むら（すき焼き）",
        address: "大阪市中央区東心斎橋1-16-27",
        location: { lat: 34.6730, lng: 135.5030 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kitamura+Sukiyaki",
        notes: "預約時請再次確認不吃牛。"
      }
    ]
  },
  {
    date: "12/23",
    dayOfWeek: "二",
    title: "Day 5",
    theme: "大阪城・春駒・聖誕市集",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d5-1",
        time: "09:00",
        title: "大阪城公園",
        type: ActivityType.SIGHTSEEING,
        description: "淀屋橋 → 谷町四丁目。散步看天守閣、護城河。",
        address: "大阪市中央区大阪城",
        location: { lat: 34.6873, lng: 135.5262 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Osaka+Castle"
      },
      {
        id: "d5-2",
        time: "11:30",
        title: "午餐：春駒壽司",
        type: ActivityType.FOOD,
        description: "天神橋筋商店街的高 CP 值壽司名店。份量足。",
        japaneseAddress: "春駒（はるこま）寿司",
        address: "大阪市北区天神橋5-5-2",
        location: { lat: 34.7105, lng: 135.5110 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Harukoma+Sushi",
        notes: "現場排隊。"
      },
      {
        id: "d5-3",
        time: "13:30",
        title: "咖啡時光：北濱/梅田",
        type: ActivityType.FOOD,
        description: "Whitebird (甜點優) 或 Brooklyn Roasting Kitahama (工業風)。",
        location: { lat: 34.6917, lng: 135.5065 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Brooklyn+Roasting+Company+Kitahama",
        backups: [
          { name: "Whitebird Coffee Stand", description: "梅田氣氛好店", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Whitebird+Coffee+Stand" },
          { name: "Brooklyn Roasting", description: "北濱河畔，景觀佳", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Brooklyn+Roasting+Company+Kitahama" }
        ]
      },
      {
        id: "d5-4",
        time: "15:00",
        title: "阿倍野 HARUKAS 300",
        type: ActivityType.SIGHTSEEING,
        description: "御堂筋線 → 天王寺。300公尺展望台看日落。",
        address: "大阪市阿倍野区阿倍野筋1-1-43",
        location: { lat: 34.6458, lng: 135.5139 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Harukas+300"
      },
      {
        id: "d5-5",
        time: "17:00",
        title: "Ten-Shiba 聖誕市集",
        type: ActivityType.SIGHTSEEING,
        description: "天王寺公園草地市集，傍晚燈光最美。",
        location: { lat: 34.6476, lng: 135.5113 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tenshiba"
      },
      {
        id: "d5-6",
        time: "19:00",
        title: "晚餐：Okonomiyaki Baby",
        type: ActivityType.FOOD,
        description: "道頓堀附近高評價大阪燒。有氣氛。",
        japaneseAddress: "Okonomiyaki Baby / Yakisoba Baby",
        address: "大阪市中央区道頓堀",
        location: { lat: 34.6687, lng: 135.5013 }, // Approximate
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Okonomiyaki+Baby+Osaka",
        backups: [
          { name: "Usagiya", description: "在地老店", type: "Food", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Usagiya+Osaka" }
        ]
      }
    ]
  },
  {
    date: "12/24",
    dayOfWeek: "三",
    title: "Day 6",
    theme: "返程日",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d6-1",
        time: "07:30",
        title: "早餐：Brooklyn Roasting",
        type: ActivityType.FOOD,
        description: "步行至北濱喝咖啡+輕食麵包。避免吃太飽。",
        japaneseAddress: "Brooklyn Roasting Company Kitahama",
        address: "大阪市中央区北浜2-1-16",
        location: { lat: 34.6917, lng: 135.5065 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Brooklyn+Roasting+Company+Kitahama"
      },
      {
        id: "d6-2",
        time: "09:00",
        title: "Check-out & 前往車站",
        type: ActivityType.HOTEL,
        description: "退房，步行或搭地鐵前往 JR 大阪站。",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower"
      },
      {
        id: "d6-3",
        time: "09:20",
        title: "JR 關空快速 → 機場",
        type: ActivityType.TRAIN,
        description: "搭乘關空快速前往關西機場 T1。",
        location: { lat: 34.7024, lng: 135.4959 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Osaka+Station",
        transport: {
          line: "JR 關空快速",
          destination: "往 關西機場",
          station: "JR 大阪站",
          platform: "1 號月台",
          duration: 50
        },
        walkingGuide: "⚠ 重要：請務必搭乘「前 4 節車廂」。後 4 節會往和歌山。"
      },
      {
        id: "d6-4",
        time: "10:10",
        title: "抵達 KIX T1",
        type: ActivityType.FLIGHT,
        description: "泰越捷 VZ567 報到、安檢、免稅店採購。",
        address: "KIX Terminal 1",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Terminal+1"
      },
      {
        id: "d6-5",
        time: "12:00",
        title: "VZ567 起飛",
        type: ActivityType.FLIGHT,
        description: "飛往台北桃園 (14:15 抵達)。",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport"
      }
    ]
  }
];

