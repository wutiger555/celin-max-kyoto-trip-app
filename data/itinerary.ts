

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
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/49834567.jpg",
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
    theme: "抵達京都：補能量＋祇園夜散步＋關東煮",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d1-1",
        time: "11:00",
        title: "抵達關西機場 (KIX)",
        type: ActivityType.FLIGHT,
        description: "入境後走「Railway」指標下樓到 JR/南海共用車站。你已買好 HARUKA 票。",
        address: "関西国際空港 T1",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Station",
        walkingGuide: "入境大廳在 1F，走「Railway」指標下樓即可到達 JR/南海共用車站。HARUKA 照票券指示進站。"
      },
      {
        id: "d1-2",
        time: "11:30",
        title: "HARUKA 特急 → 京都",
        type: ActivityType.TRAIN,
        description: "搭乘 HARUKA 列車前往京都車站（約 75 分）。你已買好票，照票券指示搭乘指定席。",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
        transport: {
          line: "HARUKA 特急",
          destination: "往 京都 (Kyoto)",
          station: "關西機場站",
          platform: "JR 月台",
          duration: 75
        },
        notes: "票務提醒：即便用 Suica 也能刷基本車資，但搭 HARUKA 需要「特急券」。你已買好票就不用再管這段。"
      },
      {
        id: "d1-3",
        time: "13:00",
        title: "抵達京都站 → 飯店 Check-in",
        type: ActivityType.HOTEL,
        description: "京都站搭地鐵烏丸線到四条站（Suica 可用），步行約 7 分鐘到飯店。備案：京都站直接搭計程車。",
        japaneseAddress: "三井ガーデンホテル京都新町 別邸",
        address: "京都市中京區新町通六角下ル六角町361",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei",
        transport: {
          line: "地鐵烏丸線",
          destination: "往 國際會館",
          station: "京都站",
          platform: "地下月台",
          duration: 5
        },
        walkingGuide: "京都站搭地鐵至「四條站」(K09)，走 22 號出口，步行約 7 分鐘抵達飯店。備案：京都站直接搭計程車到飯店（約 10 分鐘）。"
      },
      {
        id: "d1-4",
        time: "15:30",
        title: "午餐：名代とんかつ かつくら 三条本店",
        type: ActivityType.FOOD,
        description: "京都知名炸豬排名店，先補能量再開始下午行程。",
        japaneseAddress: "名代とんかつ かつくら 三条本店",
        address: "京都市中京区三条通寺町東入ル",
        location: { lat: 35.0091, lng: 135.7660 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Katsukura+Sanjo+Honten",
        businessHours: "11:00 - 20:30",
        estimatedCost: "¥1,500 ~ ¥2,500/人",
        transport: {
          line: "步行或巴士/地鐵",
          destination: "往 河原町/三条",
          station: "四条烏丸",
          duration: 15
        },
        notes: "四条/烏丸一帶可步行或搭巴士/地鐵到河原町周邊。市區段 Suica 直接刷即可。",
        tips: [
          "招牌是厚切炸豬排",
          "自己磨芝麻是特色",
          "白飯/高麗菜絲可免費續"
        ]
      },
      {
        id: "d1-5",
        time: "17:30",
        title: "祇園夜散步：花見小路 → 新橋通/白川南通",
        type: ActivityType.SIGHTSEEING,
        description: "感受京都夜色。花見小路石板路、新橋通的白川河畔、傳統町家街景。",
        address: "京都市東山区祇園町",
        location: { lat: 35.0037, lng: 135.7755 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Gion+Hanamikoji",
        tips: [
          "花見小路傍晚人較少",
          "新橋通/白川南通夜景超美",
          "可能遇見藝妓"
        ]
      },
      {
        id: "d1-6",
        time: "18:30",
        title: "八坂神社",
        type: ActivityType.SIGHTSEEING,
        description: "24 小時開放。晚間點燈的朱紅鳥居與石燈籠，氣氛獨特。",
        address: "京都市東山区祇園町北側625",
        location: { lat: 35.0037, lng: 135.7785 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yasaka+Shrine",
        businessHours: "24 小時開放",
        tips: [
          "夜間石燈籠點燈很美",
          "朱紅鳥居是拍照重點",
          "可以參拜祈福"
        ]
      },
      {
        id: "d1-7",
        time: "19:15",
        title: "晚餐：Takocho（たこ長／關東煮）",
        type: ActivityType.FOOD,
        description: "京都老字號關東煮名店，冬日首選。現金制。19:15 到門口確認能否入店/登記第二輪，不行就切備案。",
        japaneseAddress: "蛸長（たこちょう）",
        address: "京都市東山区宮川筋4丁目",
        location: { lat: 35.0025, lng: 135.7735 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Takocho+Kyoto+Oden",
        businessHours: "17:30 - 21:30",
        closedDays: "週二、週三休",
        estimatedCost: "¥2,000 ~ ¥4,000/人",
        notes: "現金制！排隊規則：19:15 到門口就要確認能否入店/登記第二輪；不行就立刻切備案（避免冷風空等）。",
        tips: [
          "招牌是各式關東煮",
          "店內座位有限，可能需要排隊",
          "冬天來一碗熱騰騰的關東煮超讚"
        ],
        backups: [
          { name: "京極スタンド", description: "晚餐備案，更容易吃到。Tabelog 標示予約不可＝現場候位/併桌型。", type: "備案", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyogoku+Stand+Kyoto" }
        ]
      },
      {
        id: "d1-8",
        time: "21:00",
        title: "回飯店休息",
        type: ActivityType.HOTEL,
        description: "回三井花園飯店。飯店官網列有 Bar/Lounge 設施，是否為頂樓請現場確認。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei",
        notes: "飯店有 Bar/Lounge，可以小酌放鬆。"
      }
    ]
  },
  {
    date: "12/20",
    dayOfWeek: "六",
    title: "Day 2",
    theme: "嵐山：完整散步＋咖啡甜點＋晚餐壽司",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d2-1",
        time: "08:30",
        title: "飯店 → 京都站 → 嵯峨嵐山站",
        type: ActivityType.TRAIN,
        description: "地鐵烏丸線到京都站，再轉 JR 嵯峨野線直達嵯峨嵐山站。全程 Suica 可用。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Saga-Arashiyama+Station",
        transport: {
          line: "JR 嵯峨野線（山陰本線）",
          destination: "往 嵯峨嵐山",
          station: "京都站",
          platform: "32-33 號月台",
          duration: 15
        },
        walkingGuide: "四条站搭地鐵烏丸線到京都站（5分），再轉 JR 嵯峨野線到嵯峨嵐山站（15分）。全程 Suica 刷進刷出即可。"
      },
      {
        id: "d2-2",
        time: "09:30",
        title: "嵐山主線：竹林小徑、渡月橋、河岸散步",
        type: ActivityType.SIGHTSEEING,
        description: "嵐山經典路線。竹林小徑 → 野宮神社 → 渡月橋河景。清晨光線最美。",
        address: "京都市右京區嵯峨野",
        location: { lat: 35.0170, lng: 135.6730 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Bamboo+Grove",
        notes: "野宮神社是戀愛成就的聖地。撫摸「龜石」許願，據說一年內願望會實現 🐢✨",
        tips: [
          "早上人較少，拍照效果最好",
          "竹林步道往神社方向人會較少",
          "渡月橋是嵐山象徵性景點"
        ]
      },
      {
        id: "d2-3",
        time: "11:30",
        title: "午餐：嵐山よしむら（蕎麥麵）",
        type: ActivityType.FOOD,
        description: "河畔老字號手打蕎麥麵名店。窗邊可看桂川與渡月橋。",
        japaneseAddress: "嵐山よしむら（蕎麦）",
        address: "京都市右京区嵯峨天龍寺芒ノ馬場町",
        location: { lat: 35.0135, lng: 135.6770 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Yoshimura",
        businessHours: "約 11:00 開始營業",
        notes: "河岸名店，嵐山必吃午餐。可接訂位但常需等候。",
        tips: [
          "建議開店即報到",
          "窗邊座位景觀最佳",
          "招牌是手打蕎麥麵+天婦羅"
        ]
      },
      {
        id: "d2-4",
        time: "13:00",
        title: "下午自由：天龍寺外圍/小店/河岸＋咖啡甜點",
        type: ActivityType.SIGHTSEEING,
        description: "不塞太滿，保留拍照與休息彈性。咖啡甜點用 Tabelog「嵐山咖啡排行榜」挑當下最近、排隊最短的。",
        address: "嵐山區域",
        location: { lat: 35.0145, lng: 135.6775 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Kyoto",
        notes: "咖啡甜點挑法（最不翻車）：直接用 Tabelog「嵐山咖啡排行榜」挑你當下最近、排隊最短的 1–2 家插入（不要硬鎖一間排到天荒地老）。",
        backups: [
          { name: "eX cafe 本店", description: "烤糰子+抹茶，庭園好拍", type: "Sweets", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=eX+cafe+Arashiyama" },
          { name: "Kumonocha Café", description: "雲朵慕斯，可愛風", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kumonocha+Cafe+Arashiyama" },
          { name: "ReUnion", description: "高評分小咖啡車", type: "Coffee", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffee+Stand+ReUnion+Arashiyama" }
        ]
      },
      {
        id: "d2-5",
        time: "16:30",
        title: "回飯店小休息/換裝",
        type: ActivityType.TRAIN,
        description: "結束嵐山行程，搭 JR 回京都站再轉地鐵回飯店，稍作休息準備晚餐。",
        location: { lat: 35.0135, lng: 135.6770 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Saga-Arashiyama+Station",
        transport: {
          line: "JR 嵯峨野線",
          destination: "往 京都",
          station: "嵯峨嵐山站",
          duration: 15
        }
      },
      {
        id: "d2-6",
        time: "18:00",
        title: "晚餐：先斗町壽司よし乃",
        type: ActivityType.FOOD,
        description: "位在先斗町，很有京都夜晚氛圍的壽司名店。壽司主題餐。",
        japaneseAddress: "先斗町 寿司よし乃",
        address: "京都市中京区先斗町通四条上ル",
        location: { lat: 35.0039, lng: 135.7709 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pontocho+Sushi+Yoshino",
        businessHours: "18:00 - 22:00",
        reservationRequired: true,
        notes: "可用 Tabelog/電話預約。Tabelog 店頁可查最新資訊。",
        tips: [
          "先斗町氣氛很有京都夜晚感",
          "建議預約",
          "新鮮握壽司為主"
        ]
      },
      {
        id: "d2-7",
        time: "20:00",
        title: "鴨川夜景散步回程",
        type: ActivityType.SIGHTSEEING,
        description: "晚餐後沿著鴨川散步回飯店，感受京都夜晚。",
        location: { lat: 35.0040, lng: 135.7700 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kamogawa+River+Kyoto",
        notes: "傳說在鴨川邊許願的情侶會永遠幸福 ♡"
      }
    ]
  },
  {
    date: "12/21",
    dayOfWeek: "日",
    title: "Day 3",
    theme: "宇治：抹茶日＋晚餐水炊き",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d3-1",
        time: "09:00",
        title: "京都站出發 → 宇治",
        type: ActivityType.TRAIN,
        description: "JR 奈良線前往宇治。Suica 可用。",
        location: { lat: 34.9858, lng: 135.7588 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Uji+Station",
        transport: {
          line: "JR 奈良線",
          destination: "往 奈良/宇治",
          station: "京都站",
          platform: "8-10 號月台",
          duration: 20
        }
      },
      {
        id: "d3-2",
        time: "10:00",
        title: "中村藤吉（平等院店＋本店）＋平等院",
        type: ActivityType.FOOD,
        description: "宇治抹茶名店！平等院店先吃甜點，再參觀平等院，最後到本店吃正餐或再加甜點。",
        japaneseAddress: "中村藤吉 平等院店",
        address: "宇治市宇治蓮華5-1",
        location: { lat: 34.8895, lng: 135.8070 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nakamura+Tokichi+Byodoin",
        businessHours: "10:00 - 17:00",
        notes: "熱門常需等候，建議早到排隊。",
        tips: [
          "抹茶聖代是招牌",
          "生茶果凍也很推薦",
          "平等院店+本店可以都去"
        ]
      },
      {
        id: "d3-3",
        time: "11:00",
        title: "平等院參觀＋拍倒影",
        type: ActivityType.SIGHTSEEING,
        description: "參觀鳳凰堂、庭園拍倒影。世界文化遺產，10 圓硬幣上的圖案。",
        address: "宇治市宇治蓮華116",
        location: { lat: 34.8893, lng: 135.8077 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Byodoin+Temple",
        businessHours: "8:30 - 17:30",
        estimatedCost: "¥600 入場",
        tips: [
          "鳳凰堂倒影是必拍",
          "內部參觀需另外購票",
          "庭園散步很舒服"
        ]
      },
      {
        id: "d3-4",
        time: "12:30",
        title: "宇治川散步",
        type: ActivityType.SIGHTSEEING,
        description: "沿著宇治川漫步，感受宇治的悠閒氛圍。",
        address: "宇治川",
        location: { lat: 34.8900, lng: 135.8080 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Uji+River"
      },
      {
        id: "d3-5",
        time: "13:00",
        title: "午餐：中村藤吉本店",
        type: ActivityType.FOOD,
        description: "宇治本店規模更大，可享用抹茶蕎麥麵等正餐。",
        japaneseAddress: "中村藤吉本店",
        address: "宇治市宇治壱番10",
        location: { lat: 34.8910, lng: 135.8002 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nakamura+Tokichi+Honten",
        businessHours: "10:00 - 17:30",
        notes: "本店比平等院店更有歷史感。",
        tips: [
          "可吃抹茶蕎麥麵等正餐",
          "抹茶甜點也很棒",
          "建築本身就很有味道"
        ]
      },
      {
        id: "d3-6",
        time: "15:00",
        title: "宇治神社/宇治上神社周邊散步收尾",
        type: ActivityType.SIGHTSEEING,
        description: "世界遺產氛圍路線。宇治上神社是日本最古老的神社建築。",
        address: "宇治市宇治山田",
        location: { lat: 34.8920, lng: 135.8095 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ujigami+Shrine",
        tips: [
          "宇治上神社是世界文化遺產",
          "沿著宇治川散步很浪漫",
          "人比較少，適合慢慢拍照"
        ]
      },
      {
        id: "d3-7",
        time: "16:30",
        title: "回京都市區",
        type: ActivityType.TRAIN,
        description: "結束宇治行程，搭車返回京都市區準備晚餐。",
        location: { lat: 34.8910, lng: 135.8010 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Uji+Station",
        transport: {
          line: "JR 奈良線",
          destination: "往 京都",
          station: "宇治站",
          platform: "1 號月台",
          duration: 20
        }
      },
      {
        id: "d3-8",
        time: "18:30",
        title: "晚餐：鳥久（Torihisa）水炊き",
        type: ActivityType.FOOD,
        description: "圓山公園旁的京料理/鍋料理老舖。水炊き主打「名古屋コーチン」雞肉。訂位以電話為主。",
        japaneseAddress: "鳥久（とりひさ）",
        address: "京都市東山区祇園町北側323",
        location: { lat: 35.0040, lng: 135.7810 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Torihisa+Kyoto+Maruyama",
        businessHours: "11:00 - 22:00（L.O. 21:00）",
        closedDays: "不定休",
        reservationRequired: true,
        estimatedCost: "¥5,000 ~ ¥10,000/人",
        phone: "075-561-0014",
        notes: "建議提早電話訂位 18:30/19:00。不定休，Tabelog 店頁可追狀況。",
        tips: [
          "水炊き（雞肉鍋）是招牌",
          "名古屋コーチン 雞肉很嫩",
          "圓山公園旁很有老舖氛圍"
        ],
        backups: [
          { name: "本家鳥初（Honke Torihatsu）", description: "若鳥久臨時不可的備案。晚餐 16:30-21:30；週一＋月一休；河原町/市役所前", type: "備案", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Honke+Torihatsu+Kyoto" }
        ]
      }
    ]
  },
  {
    date: "12/22",
    dayOfWeek: "一",
    title: "Day 4",
    theme: "南禪寺＋順正湯豆腐 → 下午進大阪 → Kiji",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d4-1",
        time: "08:30",
        title: "退房 & 行李寄放櫃檯",
        type: ActivityType.HOTEL,
        description: "Check-out，行李寄放櫃台。跑完南禪寺/午餐再回來拿，避免拖行李走寺院坡。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei"
      },
      {
        id: "d4-2",
        time: "09:00",
        title: "飯店 → 蹴上（南禪寺）",
        type: ActivityType.TRAIN,
        description: "地鐵烏丸線到烏丸御池，轉東西線到蹴上站。Suica 可用。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Keage+Station",
        transport: {
          line: "地鐵烏丸線 → 東西線",
          destination: "往 蹴上",
          station: "四条站 → 烏丸御池 → 蹴上",
          duration: 15
        },
        walkingGuide: "四条站搭烏丸線到烏丸御池轉東西線，坐到蹴上站（Keage）。"
      },
      {
        id: "d4-3",
        time: "09:30",
        title: "南禪寺/水路閣散步拍照",
        type: ActivityType.SIGHTSEEING,
        description: "水路閣紅磚拱橋是IG熱門打卡點。建築主題比楓葉更穩。",
        address: "京都市左京區南禪寺福地町",
        location: { lat: 35.0113, lng: 135.7936 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nanzen-ji",
        tips: [
          "水路閣拱橋超好拍",
          "三門登上去可看全景",
          "建築主題比楓葉更穩"
        ]
      },
      {
        id: "d4-4",
        time: "11:30",
        title: "午餐：南禪寺 順正（湯豆腐）",
        type: ActivityType.FOOD,
        description: "南禪寺旁的湯豆腐名店。在庭園內享用傳統湯豆腐會席。Tabelog 店頁可查。",
        japaneseAddress: "南禅寺 順正",
        address: "京都市左京区南禅寺草川町60",
        location: { lat: 35.0105, lng: 135.7920 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nanzenji+Junsei",
        businessHours: "午餐 11:00-15:30、晚餐 17:00-21:30",
        reservationRequired: true,
        estimatedCost: "¥3,000 ~ ¥5,000/人",
        notes: "官網預約入口先訂 11:30/12:00。京都湯豆腐名店。",
        tips: [
          "湯豆腐會席是招牌",
          "庭園景觀很美",
          "京都壓軸午餐"
        ]
      },
      {
        id: "d4-5",
        time: "14:00",
        title: "回飯店取行李 → 京都站",
        type: ActivityType.TRAIN,
        description: "回飯店取行李，前往京都站準備移動至大阪。可搭地鐵或計程車。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
        transport: {
          line: "地鐵烏丸線或計程車",
          destination: "往 京都站",
          station: "四條站",
          duration: 15
        }
      },
      {
        id: "d4-6",
        time: "15:00",
        title: "京都 → 大阪",
        type: ActivityType.TRAIN,
        description: "JR 新快速等在來線前往大阪。Suica 可用（刷進刷出）。",
        location: { lat: 34.9858, lng: 135.7588 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Osaka+Station",
        transport: {
          line: "JR 新快速",
          destination: "往 大阪",
          station: "京都站",
          platform: "4/5 號月台",
          duration: 30
        }
      },
      {
        id: "d4-7",
        time: "16:00",
        title: "大阪站 → 淀屋橋 → 飯店 Check-in",
        type: ActivityType.HOTEL,
        description: "Osaka Metro 御堂筋線到淀屋橋，7 號出口步行約 6 分鐘到飯店。Suica 可用。",
        japaneseAddress: "カンデオホテルズ大阪ザ・タワー",
        address: "大阪府大阪市北區堂島浜1-1-27",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower",
        transport: {
          line: "Osaka Metro 御堂筋線",
          destination: "往 淀屋橋",
          station: "大阪站/梅田",
          duration: 5
        },
        walkingGuide: "淀屋橋站 7 號出口 → 飯店：步行約 6 分鐘。"
      },
      {
        id: "d4-8",
        time: "18:00",
        title: "晚餐：Okonomiyaki Kiji",
        type: ActivityType.FOOD,
        description: "梅田 Sky Building B1 的人氣大阪燒名店。",
        japaneseAddress: "お好み焼き きじ",
        address: "大阪市北区大淀中1-1-88 梅田スカイビル B1",
        location: { lat: 34.7052, lng: 135.4897 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Okonomiyaki+Kiji+Umeda",
        businessHours: "11:30 - 21:00",
        estimatedCost: "¥1,500 ~ ¥2,500/人",
        notes: "大阪必吃大阪燒！梅田 Sky Building 夜景也很美。",
        tips: [
          "招牌是摩登燒",
          "梅田 Sky Building 夜景也很美",
          "營業到 21:00"
        ]
      }
    ]
  },
  {
    date: "12/23",
    dayOfWeek: "二",
    title: "Day 5",
    theme: "大阪經典景點＋豬壽喜燒＋teamLab",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d5-1",
        time: "09:00",
        title: "飯店出發（淀屋橋）",
        type: ActivityType.HOTEL,
        description: "只帶小包出門，行李放房間。今天不換飯店。",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower",
        notes: "行李放房間即可，只帶小包出門。"
      },
      {
        id: "d5-2",
        time: "09:30",
        title: "大阪城公園散步拍照",
        type: ActivityType.SIGHTSEEING,
        description: "第一次大阪必去！散步看天守閣、護城河。淀屋橋搭地鐵到谷町四丁目。",
        address: "大阪市中央区大阪城",
        location: { lat: 34.6873, lng: 135.5262 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Osaka+Castle",
        transport: {
          line: "Osaka Metro",
          destination: "往 谷町四丁目",
          station: "淀屋橋",
          duration: 10
        },
        tips: [
          "天守閣外觀最經典",
          "護城河倒影很美",
          "可登上天守閣看全景"
        ]
      },
      {
        id: "d5-3",
        time: "12:00",
        title: "黑門市場午餐/小吃",
        type: ActivityType.FOOD,
        description: "大阪行程裡最常出現的「市場型必逛」。海鮮、水果、小吃應有盡有。",
        japaneseAddress: "黒門市場",
        address: "大阪市中央区日本橋2丁目",
        location: { lat: 34.6627, lng: 135.5057 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kuromon+Market",
        businessHours: "9:00 - 18:00",
        notes: "第一次大阪必逛市場！",
        tips: [
          "海鮮新鮮又便宜",
          "可以邊走邊吃",
          "水果攤的草莓超甜"
        ]
      },
      {
        id: "d5-4",
        time: "13:45",
        title: "道頓堀＋心齋橋（逛街＋伴手禮買完）",
        type: ActivityType.SIGHTSEEING,
        description: "大阪辨識度最高的商圈。固力果招牌必拍！伴手禮集中在這邊買完。",
        address: "大阪市中央区道頓堀",
        location: { lat: 34.6687, lng: 135.5013 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dotonbori",
        tips: [
          "固力果招牌必拍",
          "道頓堀運河夜景很美",
          "心齋橋筋逛街超讚",
          "551 蓬萊肉包在這邊買"
        ]
      },
      {
        id: "d5-5",
        time: "17:30",
        title: "晚餐：すき焼き 串カツ はるな 本町店（豬壽喜燒）",
        type: ActivityType.FOOD,
        description: "「不吃牛壽喜燒」最優解之一。可預約、主打品牌豬。建議先訂位並註明牛肉 NG。Tabelog 店頁可查。",
        japaneseAddress: "すき焼き 串カツ はるな 本町店",
        address: "大阪市中央区本町3-4-10",
        location: { lat: 34.6820, lng: 135.5010 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Haruna+Sukiyaki+Honmachi",
        businessHours: "11:30-14:00、17:30-23:00",
        closedDays: "不定休",
        reservationRequired: true,
        estimatedCost: "¥4,000 ~ ¥6,000/人",
        notes: "先訂位並備註 no beef！豬肉壽喜燒更符合不吃牛需求。",
        tips: [
          "豬肉壽喜燒是招牌",
          "可預約確保座位",
          "串カツ也可以點"
        ]
      },
      {
        id: "d5-6",
        time: "19:00",
        title: "本町/淀屋橋 → 長居",
        type: ActivityType.TRAIN,
        description: "Osaka Metro 御堂筋線直達長居站。Suica 可用。約 25 分鐘。",
        location: { lat: 34.6820, lng: 135.5010 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nagai+Station",
        transport: {
          line: "Osaka Metro 御堂筋線",
          destination: "往 長居",
          station: "本町/淀屋橋",
          duration: 25
        }
      },
      {
        id: "d5-7",
        time: "19:40",
        title: "teamLab Botanical Garden Osaka",
        type: ActivityType.SIGHTSEEING,
        description: "長居公園內的 teamLab 植物園。開放 18:00–21:30、最後入場 20:30。建議事先買票。",
        address: "大阪市東住吉区長居公園1-23",
        location: { lat: 34.6100, lng: 135.5200 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=teamLab+Botanical+Garden+Osaka",
        businessHours: "18:00 - 21:30（最後入場 20:30）",
        notes: "建議事先買票！長居站出站步行約 10 分鐘進會場。",
        tips: [
          "建議事先網路購票",
          "夜間燈光效果超美",
          "預留 1-1.5 小時慢慢看"
        ]
      },
      {
        id: "d5-8",
        time: "21:10",
        title: "長居 → 淀屋橋 → 回飯店",
        type: ActivityType.TRAIN,
        description: "御堂筋線回淀屋橋，步行回飯店。末班車不會是問題，晚間班次仍多。今晚早點休息，明天 06:30 起床去機場。",
        location: { lat: 34.6100, lng: 135.5200 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yodoyabashi+Station",
        transport: {
          line: "Osaka Metro 御堂筋線",
          destination: "往 淀屋橋",
          station: "長居站",
          duration: 25
        },
        notes: "這天就不再硬塞「たこ梅 第二攤」了，因為隔天 06:30 起床去機場，睡眠更重要。"
      }
    ]
  },
  {
    date: "12/24",
    dayOfWeek: "三",
    title: "Day 6",
    theme: "返程日：12:00 起飛",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d6-1",
        time: "06:30",
        title: "起床、整理、退房",
        type: ActivityType.HOTEL,
        description: "目標 09:00 抵達 KIX T1（起飛前 3 小時）。",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower",
        notes: "務必預留充足時間到機場！"
      },
      {
        id: "d6-2",
        time: "07:00",
        title: "飯店步行 → 淀屋橋站",
        type: ActivityType.TRAIN,
        description: "步行約 6 分鐘到淀屋橋站。",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yodoyabashi+Station"
      },
      {
        id: "d6-3",
        time: "07:10",
        title: "淀屋橋 → 難波",
        type: ActivityType.TRAIN,
        description: "Osaka Metro 御堂筋線到難波。Suica 可用。",
        location: { lat: 34.6680, lng: 135.5014 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Namba+Station",
        transport: {
          line: "Osaka Metro 御堂筋線",
          destination: "往 難波",
          station: "淀屋橋",
          duration: 15
        }
      },
      {
        id: "d6-4",
        time: "07:30",
        title: "難波（南海）→ KIX",
        type: ActivityType.TRAIN,
        description: "南海電鐵前往關西機場。選 Rapi:t 需另購特急券；選「空港急行」通常 Suica 直接刷即可。",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Station",
        transport: {
          line: "南海電鐵（Rapi:t 或空港急行）",
          destination: "往 關西機場",
          station: "難波站（南海）",
          duration: 50
        },
        notes: "選 Rapi:t：需要「特急券/座位」；你可以用 Suica 刷進站付基本車資，但特急券要另外買。若選「空港急行」：通常 Suica 直接刷即可（不需特急券）。"
      },
      {
        id: "d6-5",
        time: "09:00",
        title: "抵達 KIX T1 → 報到/托運/安檢/出境",
        type: ActivityType.FLIGHT,
        description: "泰越捷 VZ567 報到、辦理托運、安檢、出境。起飛前 3 小時抵達。",
        address: "KIX Terminal 1",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Terminal+1"
      },
      {
        id: "d6-6",
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

