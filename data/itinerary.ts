

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
    theme: "清水寺・祇園・關東煮老店",
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
        time: "12:30",
        title: "HARUKA 特急 → 京都",
        type: ActivityType.TRAIN,
        description: "搭乘 HARUKA 列車前往京都車站 (約 75 分)。",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
        transport: {
          line: "HARUKA 特急",
          destination: "往 京都 (Kyoto)",
          station: "關西機場站",
          platform: "4 號月台",
          duration: 120
        },
        notes: "12:30-14:30 搭乘 HARUKA 至京都站，再前往飯店 check-in。"
      },
      {
        id: "d1-3",
        time: "14:30",
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
        title: "清水寺 → 二三年坂/產寧坂",
        type: ActivityType.SIGHTSEEING,
        description: "經典觀光路線：清水寺 → 三年坂 → 二年坂/產寧坂。冬天不靠楓葉也成立。",
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
          "石板坡道＋八坂の塔遠景是拍照重點",
          "從清水坂往上走可避開人潮",
          "二年坂有很多小店可逛"
        ]
      },
      {
        id: "d1-5",
        time: "17:00",
        title: "八坂神社 → 祇園散步拍照",
        type: ActivityType.SIGHTSEEING,
        description: "拍照點：鳥居、石燈籠、町家街景。感受京都夜色，祇園花見小路散步。",
        address: "京都市東山区祇園町北側625",
        location: { lat: 35.0037, lng: 135.7785 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yasaka+Shrine"
      },
      {
        id: "d1-6",
        time: "18:30",
        title: "晚餐：Takocho（たこ長／關東煮）",
        type: ActivityType.FOOD,
        description: "京都老字號關東煮名店，溫暖的冬日首選。現金制。",
        japaneseAddress: "蛸長（たこちょう）",
        address: "京都市東山区宮川筋4丁目",
        location: { lat: 35.0025, lng: 135.7735 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Takocho+Kyoto+Oden",
        businessHours: "17:30 - 21:30",
        closedDays: "週二、週三休",
        estimatedCost: "¥2,000 ~ ¥4,000/人",
        notes: "現金制，週二三休，建議早點到避免排隊。",
        tips: [
          "招牌是各式關東煮",
          "店內座位有限，可能需要排隊",
          "冬天來一碗熱騰騰的關東煮超讚"
        ]
      },
      {
        id: "d1-7",
        time: "20:10",
        title: "鴨川夜景散步 → 回飯店",
        type: ActivityType.SIGHTSEEING,
        description: "回飯店途中，沿著鴨川漫步，感受京都夜晚氣氛。",
        location: { lat: 35.0050, lng: 135.7700 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kamogawa+River",
        walkingGuide: "沿著鴨川漫步，享受夜晚寧靜。步行回飯店約 20 分鐘。",
        notes: "傳說在鴨川邊許願的情侶會永遠幸福 ♡"
      }
    ]
  },
  {
    date: "12/20",
    dayOfWeek: "六",
    title: "Day 2",
    theme: "嵐山・河岸蕎麥・先斗町壽司",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d2-1",
        time: "08:30",
        title: "飯店出發前往嵐山",
        type: ActivityType.TRAIN,
        description: "阪急四條 → 嵐山站。開始嵐山整天行程。",
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
        time: "09:30",
        title: "竹林小徑 → 野宮神社 → 渡月橋",
        type: ActivityType.SIGHTSEEING,
        description: "拍照散步路線：竹林小徑 → 野宮神社 → 渡月橋河景。清晨光線最美。",
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
        description: "河畔老字號手打蕎麥麵名店。窗邊可看桂川與渡月橋，可接受訂位但常需等候。",
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
        title: "嵐山散步/小店（保留彈性）",
        type: ActivityType.SIGHTSEEING,
        description: "不塞太滿，保留拍照與休息彈性。嵐山區域慢慢走。",
        address: "嵐山區域",
        location: { lat: 35.0145, lng: 135.6775 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Kyoto",
        backups: [
          { name: "eX cafe 本店", description: "烤糰子+抹茶，庭園好拍", type: "Sweets", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=eX+cafe+Arashiyama" },
          { name: "Kumonocha Café", description: "雲朵慕斯，可愛風", type: "Cafe", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kumonocha+Cafe+Arashiyama" },
          { name: "ReUnion", description: "高評分小咖啡車", type: "Coffee", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffee+Stand+ReUnion+Arashiyama" }
        ]
      },
      {
        id: "d2-5",
        time: "16:30",
        title: "回京都市中心",
        type: ActivityType.TRAIN,
        description: "結束嵐山行程，搭車回市區飯店稍作休息。",
        location: { lat: 35.0135, lng: 135.6770 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arashiyama+Station",
        transport: {
          line: "阪急嵐山線",
          destination: "往 烏丸",
          station: "嵐山站",
          platform: "桂站轉乘",
          duration: 35
        }
      },
      {
        id: "d2-6",
        time: "18:00",
        title: "晚餐：先斗町壽司よし乃",
        type: ActivityType.FOOD,
        description: "Pontocho Sushi Yoshino，位在先斗町、很有京都夜晚氛圍的老店感壽司名店。可預約。",
        japaneseAddress: "先斗町 寿司よし乃",
        address: "京都市中京区先斗町通四条上ル",
        location: { lat: 35.0039, lng: 135.7709 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pontocho+Sushi+Yoshino",
        businessHours: "18:00 - 22:00",
        reservationRequired: true,
        notes: "可用 Tabelog/電話預約 18:00-19:00。",
        tips: [
          "先斗町氣氛很有京都夜晚感",
          "建議預約",
          "新鮮握壽司為主"
        ]
      },
      {
        id: "d2-7",
        time: "20:00",
        title: "先斗町/鴨川散步 → 回飯店",
        type: ActivityType.SIGHTSEEING,
        description: "晚餐後沿著先斗町、鴨川散步，感受京都夜晚。",
        location: { lat: 35.0040, lng: 135.7700 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pontocho+Kyoto"
      }
    ]
  },
  {
    date: "12/21",
    dayOfWeek: "日",
    title: "Day 3",
    theme: "宇治抹茶一日・鳥久老舖",
    city: "Kyoto",
    cityChi: "京都",
    items: [
      {
        id: "d3-1",
        time: "08:30",
        title: "京都站出發 → 宇治",
        type: ActivityType.TRAIN,
        description: "JR 奈良線前往宇治（約 20 分車程）。",
        location: { lat: 34.9858, lng: 135.7588 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
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
        time: "09:30",
        title: "到平等院周邊卡第一輪",
        type: ActivityType.SIGHTSEEING,
        description: "抵達宇治，先到平等院周邊準備排第一輪中村藤吉。",
        address: "宇治市宇治蓮華116",
        location: { lat: 34.8893, lng: 135.8077 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Byodoin+Temple"
      },
      {
        id: "d3-3",
        time: "10:00",
        title: "早午餐/甜點：中村藤吉 平等院店",
        type: ActivityType.FOOD,
        description: "宇治抹茶名店！熱門常需等候，抹茶甜點超經典。",
        japaneseAddress: "中村藤吉 平等院店",
        address: "宇治市宇治蓮華5-1",
        location: { lat: 34.8895, lng: 135.8070 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nakamura+Tokichi+Byodoin",
        businessHours: "10:00 - 17:00",
        notes: "熱門常需等候，建議早到排隊。",
        tips: [
          "抹茶聖代是招牌",
          "生茶果凍也很推薦",
          "可以邊吃邊看庭園"
        ]
      },
      {
        id: "d3-4",
        time: "11:10",
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
        id: "d3-5",
        time: "12:45",
        title: "午餐：中村藤吉本店 宇治本店",
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
        time: "13:45",
        title: "宇治伴手禮（中村藤吉本店）",
        type: ActivityType.SIGHTSEEING,
        description: "直接在本店買抹茶點心/茶葉。人都到現場最省動線！",
        address: "宇治市宇治壱番10",
        location: { lat: 34.8910, lng: 135.8002 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nakamura+Tokichi+Honten",
        notes: "中村藤吉的抹茶伴手禮超有質感！",
        tips: [
          "抹茶巧克力推薦",
          "茶葉禮盒也很適合送禮",
          "現場試吃選購"
        ]
      },
      {
        id: "d3-7",
        time: "14:30",
        title: "宇治川散步 → 宇治神社 → 宇治上神社",
        type: ActivityType.SIGHTSEEING,
        description: "安靜、世界遺產氛圍路線。宇治上神社是日本最古老的神社建築。",
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
        id: "d3-8",
        time: "16:00",
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
        id: "d3-9",
        time: "18:30",
        title: "晚餐：鳥久（Torihisa）",
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
        notes: "建議今晚就打電話卡 18:30/19:00。不定休，訂位以電話為主。",
        tips: [
          "水炊き（雞肉鍋）是招牌",
          "名古屋コーチン 雞肉很嫩",
          "圓山公園旁很有老舖氛圍"
        ],
        backups: [
          { name: "水だき 本家 鳥初（Honke Torihatsu）", description: "晚餐 16:30-21:30；週一＋月一休；河原町/市役所前", type: "備案 A", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Honke+Torihatsu+Kyoto" },
          { name: "西陣 鳥岩楼（Toriiwaro）", description: "西陣老店，水炊き很有名；更老舖感但位置較北", type: "備案 B", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Toriiwaro+Nishijin" },
          { name: "水だきの鳥よし（Toriyoshi）", description: "京都水炊き老派路線，走在地店感", type: "備案 C", googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Toriyoshi+Kyoto" }
        ]
      }
    ]
  },
  {
    date: "12/22",
    dayOfWeek: "一",
    title: "Day 4",
    theme: "南禪寺水路閣・順正湯豆腐・大阪",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d4-1",
        time: "08:30",
        title: "退房 & 行李寄放櫃檯",
        type: ActivityType.HOTEL,
        description: "Check-out，行李寄放櫃台。先別拖行李跑景點！",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Kyoto+Shinmachi+Bettei"
      },
      {
        id: "d4-2",
        time: "09:20",
        title: "南禪寺（水路閣、三門拍照散步）",
        type: ActivityType.SIGHTSEEING,
        description: "水路閣紅磚拱橋是IG熱門打卡點。不賭楓葉，改成「水路閣建築＋湯豆腐名店」更穩。",
        address: "京都市左京區南禪寺福地町",
        location: { lat: 35.0113, lng: 135.7936 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nanzen-ji",
        notes: "永觀堂 12/14 已顯示「見頃過ぎ・落葉」，12/22 洛東不應再把楓葉當主軸。",
        tips: [
          "水路閣拱橋超好拍",
          "三門登上去可看全景",
          "建築主題比楓葉更穩"
        ]
      },
      {
        id: "d4-3",
        time: "11:30",
        title: "午餐：南禪寺 順正（湯豆腐會席）",
        type: ActivityType.FOOD,
        description: "南禪寺旁的湯豆腐名店。在庭園內享用傳統湯豆腐會席。官網提供預約入口。",
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
        id: "d4-4",
        time: "13:00",
        title: "回飯店取行李 → 京都站",
        type: ActivityType.TRAIN,
        description: "回飯店取行李，前往京都站準備移動至大阪。",
        location: { lat: 35.0062, lng: 135.7562 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kyoto+Station",
        transport: {
          line: "地鐵烏丸線",
          destination: "往 京都站",
          station: "四條站",
          platform: "地下月台",
          duration: 10
        }
      },
      {
        id: "d4-5",
        time: "15:00",
        title: "京都 → 大阪、入住飯店",
        type: ActivityType.TRAIN,
        description: "JR 新快速前往大阪，入住燦多酒店大阪塔樓。",
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
        id: "d4-6",
        time: "16:30",
        title: "Check-in: 燦多酒店大阪塔樓",
        type: ActivityType.HOTEL,
        description: "Candeo Hotels Osaka The Tower。抵達後前往高樓層大廳 check-in。",
        japaneseAddress: "カンデオホテルズ大阪ザ・タワー",
        address: "大阪府大阪市北區堂島浜1-1-27",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower"
      },
      {
        id: "d4-7",
        time: "18:00",
        title: "晚餐：Okonomiyaki Kiji",
        type: ActivityType.FOOD,
        description: "梅田 Sky Building B1 的人氣大阪燒名店。評價 4.2、評論數多。",
        japaneseAddress: "お好み焼き きじ",
        address: "大阪市北区大淀中1-1-88 梅田スカイビル B1",
        location: { lat: 34.7052, lng: 135.4897 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Okonomiyaki+Kiji+Umeda",
        businessHours: "11:30 - 21:00",
        estimatedCost: "¥1,500 ~ ¥2,500/人",
        notes: "4.2 評分、評論數多。大阪必吃大阪燒！",
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
    theme: "大阪經典・豬壽喜燒・百年關東煮・燈飾",
    city: "Osaka",
    cityChi: "大阪",
    items: [
      {
        id: "d5-1",
        time: "09:00",
        title: "大阪城公園",
        type: ActivityType.SIGHTSEEING,
        description: "第一次大阪必去！散步看天守閣、護城河，四季可看。",
        address: "大阪市中央区大阪城",
        location: { lat: 34.6873, lng: 135.5262 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Osaka+Castle",
        tips: [
          "天守閣外觀最經典",
          "護城河倒影很美",
          "可登上天守閣看全景"
        ]
      },
      {
        id: "d5-2",
        time: "11:30",
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
        id: "d5-3",
        time: "13:10",
        title: "道頓堀＋心齋橋散步拍照",
        type: ActivityType.SIGHTSEEING,
        description: "大阪辨識度最高的商圈。固力果招牌必拍！",
        address: "大阪市中央区道頓堀",
        location: { lat: 34.6687, lng: 135.5013 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dotonbori",
        tips: [
          "固力果招牌必拍",
          "道頓堀運河夜景很美",
          "心齋橋筋逛街超讚"
        ]
      },
      {
        id: "d5-4",
        time: "15:30",
        title: "伴手禮採買（551 蓬萊/甜點）",
        type: ActivityType.SIGHTSEEING,
        description: "難波/心齋橋一帶採買。以「551 蓬萊」與大阪甜點為主。",
        address: "大阪市中央区難波",
        location: { lat: 34.6650, lng: 135.5015 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Namba+Station",
        notes: "551 蓬萊肉包是大阪必買伴手禮！",
        tips: [
          "551 蓬萊肉包是大阪代表",
          "りくろーおじさんの起司蛋糕也很推",
          "店很多，不用擔心買不到"
        ]
      },
      {
        id: "d5-5",
        time: "17:30",
        title: "晚餐：すき焼き串カツ はるな（豬壽喜燒）",
        type: ActivityType.FOOD,
        description: "「不吃牛壽喜燒」最優解之一。可預約、主打品牌豬。建議先訂位並註明牛肉 NG。",
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
        time: "19:30",
        title: "第二攤：たこ梅 本店（百年關東煮老店）",
        type: ActivityType.FOOD,
        description: "道頓堀 1844 年創業的關東煮老店。年末年始以外基本無休。老店故事性滿點！",
        japaneseAddress: "たこ梅 本店（Takoume）",
        address: "大阪市中央区道頓堀1-1-8",
        location: { lat: 34.6690, lng: 135.5025 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Takoume+Dotonbori",
        businessHours: "16:00 - 21:50",
        closedDays: "年末年始以外基本無休",
        estimatedCost: "¥1,500 ~ ¥3,000/人",
        notes: "1844 年創業！道頓堀百年關東煮老店。",
        tips: [
          "章魚關東煮是招牌",
          "1844年創業超有歷史感",
          "道頓堀吃完可直接去看燈飾"
        ]
      },
      {
        id: "d5-7",
        time: "20:30",
        title: "御堂筋/中之島燈飾散步",
        type: ActivityType.SIGHTSEEING,
        description: "12月大阪重頭戲！御堂筋整條銀杏大道燈飾、中之島光之饗宴。",
        address: "大阪市北区中之島",
        location: { lat: 34.6937, lng: 135.5023 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Osaka+Hikari+Festival+Nakanoshima",
        notes: "12月大阪夜間最美活動！",
        tips: [
          "御堂筋整條銀杏大道都有燈飾",
          "中之島燈飾規模超大",
          "散步拍照超浪漫"
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
        time: "09:00",
        title: "退房 & 前往機場",
        type: ActivityType.HOTEL,
        description: "依返程班機時間，建議至少預留 2-2.5 小時到 KIX。冬季人潮變數較大。",
        location: { lat: 34.6965, lng: 135.4596 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Candeo+Hotels+Osaka+The+Tower",
        notes: "務必預留充足時間到機場！"
      },
      {
        id: "d6-2",
        time: "09:30",
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
        id: "d6-3",
        time: "10:20",
        title: "抵達 KIX T1",
        type: ActivityType.FLIGHT,
        description: "泰越捷 VZ567 報到、安檢、出境後免稅店採購。",
        address: "KIX Terminal 1",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Terminal+1"
      },
      {
        id: "d6-4",
        time: "10:30",
        title: "機場伴手禮補貨",
        type: ActivityType.SIGHTSEEING,
        description: "若市區沒買到 551 蓬萊，關西機場也有分店可補；另外免稅可補巧克力/甜點（ROYCE' 類型）。",
        location: { lat: 34.4320, lng: 135.2304 },
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kansai+Airport+Duty+Free",
        notes: "機場有大阪/關西經典伴手禮可補，含 551 關空店。",
        tips: [
          "ROYCE' 生巧克力必買",
          "可網路預約免稅品",
          "551 機場店也可補貨"
        ]
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

