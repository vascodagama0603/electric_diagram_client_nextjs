const MAKE_CONTACT = "S00227"
const BREAK_CONTACT = "S00229"
const TWO_MAKE_CONTACT = "S00234"
const TWO_BREAK_CONTACT = "S00235"
const MIRROR_CONTACT = "S01462"
const MAKE_CONTACT_DELAYED_CLOSING = "S00243"
const MAKE_CONTACT_DELAYED_OPENING = "S00244"
const BREAK_CONTACT_DELAYED_OPENING = "S00245"
const BREAK_CONTACT_DELAYED_CLOSING = "S00246"
const MAKE_CONTACT_DELAYED = "S00247"
const BREAK_CONTACT_DELAYED = "S01911"
const MAKE_CONTACT_MANUAL = "S00250"
const BREAK_CONTACT_MANUAL = "S00171+S00225"
const MAKE_CONTACT_GENERAL_MANUAL = "S00253"
const MAKE_CONTACT_PUSH_BUTTON = "S00254"
const MAKE_CONTACT_PUSH_BUTTON_POSITIBVE = "S00257"
const BREAK_CONTACT_PUSH_BUTTON = "S00171+S00229"
const MAKE_CONTACT_PULL_BUTTON = "S00255"
const MAKE_CONTACT_TWIST_BUTTON = "S00256"
const BREAK_CONTACT_EMERGENCY_STOP = "S00258"
const MAKE_CONTACT_LIMIT = "S00259"
const BREAK_CONTACT_LIMIT = "S00260"
const ASSEMBLY_CONTACT_LIMIT = "S00261"
const BREAK_CONTACT_LIMIT_POSITIVE = "S00262"
const MAKE_CONTACT_TEMPERRATURE = "S00263"
const BREAK_CONTACT_TEMPERRATURE = "S00264"
const BREAK_CONTACT_THERMAL = "S00265"
const MULTI_POSITION_SWITCH = "S00270"
const FOUR_POSITION_SWITCH = "S00271"
const MULTI_POSITION_SWITCH_DIAGRAM = "S00272"
const MAKE_CONTACTOR = "S00284"
const MAKE_CONTACTOR_AUTO_TRIP = "S00285"
const BREAK_CONTACTOR = "S00286"
const CIRCUIT_BREAKER = "S00287"
const CIRCUIT_2P_BREAKER = "S00287_2P"
const CIRCUIT_3P_BREAKER = "S00287_3P"
const COIL_GENEREL = "S00305"
const THERMAL_RERAY = "S00325"
const TOUCH_SENSOR = "S00357"
const TOUCH_SENSITIVE_SWITCH = "S00358"
const PROXIMITY_SWITCH = "S00359"
const FUSE = "S00362"
const FUSE_STRIKER = "S00364"
const FUSE_SWITCH = "S00368"
const MOTOR = "S00819"
const LINER_MOTOR = "S00820"
const STEPPING_MOTOR = "S00821"
const THEMOCOUPLE = "S00952"
const LAMP = "S00965"
const BUZZER = "S00973"
/*
const FUN = "S01421"
const PUMP = "S01422"
*/  
export const Signals = [
  {
    id: MAKE_CONTACT,
    search:"make,a接点,メーク",
    caption:"a接点",
    did:"07-02-01",
  },
  {
    id: BREAK_CONTACT,
    search:"break,b接点,ブレイク",
    caption:"b接点",
    did:"07-02-03",
  },
  // {
  //   id: TWO_MAKE_CONTACT,
  //   search:"make,a接点,メーク,二重",
  //   caption:"二重a接点",
  //   did:"07-02-08",
  // },
  // {
  //   id: TWO_BREAK_CONTACT,
  //   search:"break,b接点,メーク,二重",
  //   caption:"二重b接点",
  //   did:"07-02-09",
  // },
  // {
  //   id: MIRROR_CONTACT,
  //   search:"make,a接点,メーク,ミラー",
  //   caption:"安全開離機能a接点",
  //   did:"07-02-10",
  // },
  {
    id: MAKE_CONTACT_DELAYED_CLOSING,
    search:"make,a接点,メーク,off,delay",
    caption:"a接点(オフディレイ)",
    did:"07-05-01",
  },
  {
    id: MAKE_CONTACT_DELAYED_OPENING,
    search:"make,a接点,メーク,on,delay",
    caption:"a接点(オンディレイ)",
    did:"07-05-02",
  },
  {
    id: BREAK_CONTACT_DELAYED_OPENING,
    search:"break,b接点,ブレイク,off,delay",
    caption:"b接点(オフディレイ)",
    did:"07-05-03",
  },
  {
    id: BREAK_CONTACT_DELAYED_CLOSING,
    search:"break,b接点,ブレイク,on,,delay",
    caption:"b接点(オンディレイ)",
    did:"07-05-04",
  },
  {
    id: MAKE_CONTACT_DELAYED,
    search:"make,a接点,メーク,on,off,delay",
    caption:"a接点(オンディレイオフディレイ)",
    did:"07-05-05",
  },
  {
    id: BREAK_CONTACT_DELAYED,
    search:"break,b接点,ブレイク,on,off,delay",
    caption:"b接点(オンディレイオフディレイ)",
    did:"-",
  },
  {
    id: MAKE_CONTACT_MANUAL,
    search:"make,a接点,メーク,マニュアル,ボタン,manual",
    caption:"マニュアルボタンa接点",
    did:"07-A6-02(旧図)",
  },
  // {
  // id: BREAK_CONTACT_MANUAL,
  //   search:"break,b接点,ブレイク,マニュアル,ボタン,manual",
  //   caption:"マニュアルボタンb接点",
  //   did:"-",
  // },
  // {
  //   id: MAKE_CONTACT_GENERAL_MANUAL,
  //   search:"make,a接点,メーク,マニュアル,一般",
  //   caption:"マニュアルボタンa接点(一般)",
  //   did:"07-07-01",
  // },
  {
    id: MAKE_CONTACT_PUSH_BUTTON,
    search:"make,a接点,メーク,push",
    caption:"押しボタンa接点",
    did:"07-07-02",
  },
  {
    id: BREAK_CONTACT_PUSH_BUTTON,
    search:"break,b接点,ブレイク,push",
    caption:"押しボタンb接点",
    did:"-",
  },
  // {
  //   id: MAKE_CONTACT_PUSH_BUTTON_POSITIBVE,
  //   search:"make,a接点,メーク,push",
  //   caption:"押しボタンa接点",
  //   did:"07-07-05",
  // },
  {
    id: MAKE_CONTACT_PULL_BUTTON,
    search:"make,a接点,メーク,pull",
    caption:"引きボタンa接点",
    did:"07-07-03",
  },
  {
    id: MAKE_CONTACT_TWIST_BUTTON,
    search:"make,a接点,メーク,twist",
    caption:"ひねりボタンa接点",
    did:"07-07-04",
  },
  {
    id: BREAK_CONTACT_EMERGENCY_STOP,
    search:"ブレイク,b接点,emergency,break",
    caption:"非常停止ボタン",
    did:"07-07-06",
  },
  {
    id: MAKE_CONTACT_LIMIT,
    search:"make,a接点,メーク,limit",
    caption:"リミット接点",
    did:"07-08-01",
  },
  {
    id: BREAK_CONTACT_LIMIT,
    search:"break,ブレイク,limit",
    caption:"リミットb接点",
    did:"07-08-02",
  },
  // {
  //   id: ASSEMBLY_CONTACT_LIMIT,
  //   search:"make,a接点,メーク,limit,複合",
  //   caption:"複合リミットa接点",
  //   did:"07-08-03",
  // },
  // {
  //   id: BREAK_CONTACT_LIMIT_POSITIVE,
  //   search:"break,ブレイク,limit",
  //   caption:"確実リミットb接点",
  //   did:"07-08-04",
  // },
  // {
  //   id: MAKE_CONTACT_TEMPERRATURE,
  //   search:"make,a接点,メーク,温度",
  //   caption:"温度感知a接点",
  //   did:"07-09-01",
  // },
  // {
  //   id: BREAK_CONTACT_TEMPERRATURE,
  //   search:"break,ブレイク,温度",
  //   caption:"温度感知b接点",
  //   did:"07-09-02",
  // },
  // {
  //   id: BREAK_CONTACT_THERMAL,
  //   search:"break,ブレイク,サーマル",
  //   caption:"自己動作温度b接点",
  //   did:"07-09-03",
  // },
  // {
  //   id: MULTI_POSITION_SWITCH,
  //   search:"多段,スイッチ,multi,position,switch",
  //   caption:"多段スイッチ",
  //   did:"07-11-04",
  // },
  // {
  //   id: FOUR_POSITION_SWITCH,
  //   search:"多段,4段,スイッチ,position,switch",
  //   caption:"4段スイッチ",
  //   did:"07-11-05",
  // },
  // {
  //   id: MULTI_POSITION_SWITCH_DIAGRAM,
  //   search:"多段,スイッチ,位置,multi,position,switch",
  //   caption:"位置図付き多段スイッチ",
  //   did:"07-12-04",
  // },
  {
    id: MAKE_CONTACTOR,
    search:"make,a接点,メーク,contactor,コンタクタ,電磁,接触器",
    caption:"電磁接触器a接点",
    did:"7-13-02",
  },
  // {
  //   id: MAKE_CONTACTOR_AUTO_TRIP,
  //   search:"make,a接点,メーク,contactor,コンタクタ,電磁,接触器,trip,トリップ,オート",
  //   caption:"電磁接触器a接点(オートトリップ)",
  //   did:"7-13-03",
  // },
  {
    id: BREAK_CONTACTOR,
    search:"break,b接点,ブレイク,contactor,コンタクタ,電磁,接触器",
    caption:"電磁接触器b接点",
    did:"7-13-04",
  },
  {
    id: CIRCUIT_BREAKER,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,1P",
    caption:"サーキットブレーカ1極",
    did:"7-13-08",
  },
  {
    id: CIRCUIT_2P_BREAKER,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,2P",
    caption:"サーキットブレーカ2極",
    did:"-",
  },
  {
    id: CIRCUIT_3P_BREAKER,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,3P",
    caption:"サーキットブレーカ3極",
    did:"-",
  },
  // {
  //   id: COIL_GENEREL,
  //   search:"coil,コイル,一般",
  //   caption:"コイル(一般)",
  //   did:"7-15-01",
  // },
  // {
  //   id: THERMAL_RERAY,
  //   search:"coil,reray,thermal,サーマル,リレー,コイル,熱動継電器",
  //   caption:"サーマルリレー",
  //   did:"7-15-21",
  // },
  // {
  //   id: TOUCH_SENSOR,
  //   search:"sensor,センサー,タッチ,touch",
  //   caption:"タッチセンサー",
  //   did:"7-19-04",
  // },
  // {
  //   id: TOUCH_SENSITIVE_SWITCH,
  //   search:"sensor,センサー,タッチ,スイッチ,touch",
  //   caption:"タッチセンサースイッチ",
  //   did:"7-20-01",
  // },
  // {
  //   id: PROXIMITY_SWITCH,
  //   search:"sensor,センサー,近接,PROXIMITY",
  //   caption:"近接センサ",
  //   did:"7-20-02",
  // },
  // {
  //   id: FUSE,
  //   search:"ヒューズ,fuze",
  //   caption:"ヒューズ(一般図)",
  //   did:"7-21-02",
  // },
  // {
  //   id: FUSE_STRIKER,
  //   search:"ヒューズ,fuze,striker,ストライカー",
  //   caption:"ストライカー付きヒューズ",
  //   did:"7-21-03",
  // },
  // {
  //   id: FUSE_SWITCH,
  //   search:"ヒューズ,fuze,スイッチ",
  //   caption:"ヒューズスイッチ",
  //   did:"7-21-07",
  // },
  // {
  //   id: MOTOR,
  //   search:"motor,モータ,",
  //   caption:"モータ（一般図)",
  //   did:"06-04-01",
  // },
  // {
  //   id: LINER_MOTOR,
  //   search:"motor,モータ,liner,リニア",
  //   caption:"リニアモータ（一般図)",
  //   did:"06-04-02",
  // },
  // {
  //   id: STEPPING_MOTOR,
  //   search:"motor,モータ,stepping,ステッピング",
  //   caption:"ステッピングモータ",
  //   did:"06-04-03",
  // },
  // {
  //   id: THEMOCOUPLE,
  //   search:"themocouple,熱電対",
  //   caption:"熱電対",
  //   did:"08-06-01",
  // },
  // {
  //   id: LAMP,
  //   search:"lamp,ランプ",
  //   caption:"ランプ",
  //   did:"08-10-01",
  // },
  // {
  //   id: BUZZER,
  //   search:"ブザー,buzzer",
  //   caption:"ブザー",
  //   did:"08-10-10",
  // },
  /*
  {
    id: FUN,
    search:"fun,ファン",
    caption:"ファン",
    did:"11-19-03",
  },
  {
    id: PUMP,
    search:"pump,ポンプ",
    caption:"ポンプ",
    did:"11-19-04",
  },*/
];