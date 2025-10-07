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
    discription:"a接点（常開接点）は、リレーや接触器に電源が投入されていない待機状態（非励磁状態）のときに開いており、電源が投入されると閉じる接点です。最も一般的に使用される接点で、回路図では接点番号の末尾に「a」を付けて示されます。主に回路の投入や起動に使用されます。"
  },
  {
    id: BREAK_CONTACT,
    search:"break,b接点,ブレイク",
    caption:"b接点",
    did:"07-02-03",
    discription:"b接点（常閉接点）は、待機状態（非励磁状態）のときに閉じており、電源が投入されると開く接点です。回路図では接点番号の末尾に「b」を付けて示されます。主に回路の停止やインターロック、安全回路に使用され、電源喪失時に回路が遮断されるフェイルセーフな用途にも適しています。"
  },
  // {
  //   id: TWO_MAKE_CONTACT,
  //   search:"make,a接点,メーク,二重",
  //   caption:"二重a接点",
  //   did:"07-02-08",
  //   discription:""
  // },
  // {
  //   id: TWO_BREAK_CONTACT,
  //   search:"break,b接点,メーク,二重",
  //   caption:"二重b接点",
  //   did:"07-02-09",
  //   discription:""
  // },
  // {
  //   id: MIRROR_CONTACT,
  //   search:"make,a接点,メーク,ミラー",
  //   caption:"安全開離機能a接点",
  //   did:"07-02-10",
  //   discription:""
  // },
  {
    id: MAKE_CONTACT_DELAYED_CLOSING,
    search:"make,a接点,メーク,off,delay",
    caption:"a接点(オフディレイ)",
    did:"07-05-01",
    discription:"a接点(オフディレイ)は、リレーへの電源が切断された後、設定された時間が経過してから動作（開く）するタイマー接点です。オフディレイは「復帰遅延」とも呼ばれ、特定の機器を一定時間動かし続ける場合などに利用されます。"
  },
  {
    id: MAKE_CONTACT_DELAYED_OPENING,
    search:"make,a接点,メーク,on,delay",
    caption:"a接点(オンディレイ)",
    did:"07-05-02",
    discription:"a接点(オンディレイ)は、リレーに電源が投入されてから、設定された時間が経過した後に動作（閉じる）するタイマー接点です。オンディレイは「動作遅延」とも呼ばれ、機器の起動タイミングを遅らせるインターロックやシーケンス制御で頻繁に利用されます。"
  },
  {
    id: BREAK_CONTACT_DELAYED_OPENING,
    search:"break,b接点,ブレイク,off,delay",
    caption:"b接点(オフディレイ)",
    did:"07-05-03",
    discription:"b接点(オフディレイ)は、リレーへの電源が切断された後、設定された時間が経過するまで動作（開く→閉じる）しないタイマー接点です。回路の停止や復旧の順序を調整する目的で利用されます。"
  },
  {
    id: BREAK_CONTACT_DELAYED_CLOSING,
    search:"break,b接点,ブレイク,on,,delay",
    caption:"b接点(オンディレイ)",
    did:"07-05-04",
    discription:"b接点(オンディレイ)は、リレーに電源が投入されてから、設定された時間が経過した後に動作（閉じる→開く）するタイマー接点です。特定の条件が満たされた後、一定の時間を置いてから回路を遮断する用途に利用されます。"
  },
  {
    id: MAKE_CONTACT_DELAYED,
    search:"make,a接点,メーク,on,off,delay",
    caption:"a接点(オンディレイオフディレイ)",
    did:"07-05-05",
    discription:"a接点(オンディレイオフディレイ)は、電源投入時と切断時の両方で時間遅れ動作を持つタイマー接点です。複雑なシーケンス制御において、起動と停止の両方のタイミングを精密に調整する際に使用されます。"
  },
  {
    id: BREAK_CONTACT_DELAYED,
    search:"break,b接点,ブレイク,on,off,delay",
    caption:"b接点(オンディレイオフディレイ)",
    did:"-",
    discription:"b接点(オンディレイオフディレイ)は、電源投入時と切断時の両方で時間遅れ動作を持つタイマー接点です。複雑なインターロックや安全回路において、遮断と復帰の両方のタイミングを精密に調整する際に使用されます。"
  },
  {
    id: MAKE_CONTACT_MANUAL,
    search:"make,a接点,メーク,マニュアル,ボタン,manual",
    caption:"マニュアルボタンa接点",
    did:"07-A6-02(旧図)",
    discription:"保護枠付きや手動操作を示す押しボタンスイッチのa接点です。通常、操作者が直接触れて回路を投入するために使用されます。"
  },
  // {
  // id: BREAK_CONTACT_MANUAL,
  //   search:"break,b接点,ブレイク,マニュアル,ボタン,manual",
  //   caption:"マニュアルボタンb接点",
  //   did:"-",
  //   discription:""
  // },
  // {
  //   id: MAKE_CONTACT_GENERAL_MANUAL,
  //   search:"make,a接点,メーク,マニュアル,一般",
  //   caption:"マニュアルボタンa接点(一般)",
  //   did:"07-07-01",
  //   discription:""
  // },
  {
    id: MAKE_CONTACT_PUSH_BUTTON,
    search:"make,a接点,メーク,push",
    caption:"押しボタンa接点",
    did:"07-07-02",
    discription:"押しボタンスイッチのa接点（常開）を示します。ボタンを押している間だけ回路を閉じるモーメンタリ動作に多く利用され、回路の始動（スタート）に用いられます。"
  },
  {
    id: BREAK_CONTACT_PUSH_BUTTON,
    search:"break,b接点,ブレイク,push",
    caption:"押しボタンb接点",
    did:"-",
    discription:"押しボタンスイッチのb接点（常閉）を示します。ボタンを押している間だけ回路を開くモーメンタリ動作に多く利用され、回路の停止（ストップ）に用いられます。"
  },
  // {
  //   id: MAKE_CONTACT_PUSH_BUTTON_POSITIBVE,
  //   search:"make,a接点,メーク,push",
  //   caption:"押しボタンa接点",
  //   did:"07-07-05",
  //   discription:""
  // },
  {
    id: MAKE_CONTACT_PULL_BUTTON,
    search:"make,a接点,メーク,pull",
    caption:"引きボタンa接点",
    did:"07-07-03",
    discription:"プルスイッチや、操作部を引くことで動作するタイプの押しボタンスイッチのa接点を示します。主に特定の操作や解除に使用されます。"
  },
  {
    id: MAKE_CONTACT_TWIST_BUTTON,
    search:"make,a接点,メーク,twist",
    caption:"ひねりボタンa接点",
    did:"07-07-04",
    discription:"**ひねり操作（ツイスト）**で保持・解除を行うタイプのスイッチのa接点を示します。ロックされた状態を解除してから操作する用途などに用いられます。"
  },
  {
    id: BREAK_CONTACT_EMERGENCY_STOP,
    search:"ブレイク,b接点,emergency,break",
    caption:"非常停止ボタン",
    did:"07-07-06",
    discription:"危険な状態が発生した際に、回路を強制的に遮断するためのラッチング式のb接点です。フェイルセーフ設計に基づいており、最も高い安全性が求められる回路で使用されます。"
  },
  {
    id: MAKE_CONTACT_LIMIT,
    search:"make,a接点,メーク,limit",
    caption:"リミット接点",
    did:"07-08-01",
    discription:"機械的な移動や位置を検出するリミットスイッチのa接点です。機械部品が所定の位置に到達したことを検出する用途（例：動作開始条件）に用いられます。"
  },
  {
    id: BREAK_CONTACT_LIMIT,
    search:"break,ブレイク,limit",
    caption:"リミットb接点",
    did:"07-08-02",
    discription:"機械的な移動や位置を検出するリミットスイッチのb接点です。機械部品が所定の位置にある間、回路を閉じる用途（例：動作終了条件）に用いられます。"
  },
  // {
  //   id: ASSEMBLY_CONTACT_LIMIT,
  //   search:"make,a接点,メーク,limit,複合",
  //   caption:"複合リミットa接点",
  //   did:"07-08-03",
  //   discription:""
  // },
  // {
  //   id: BREAK_CONTACT_LIMIT_POSITIVE,
  //   search:"break,ブレイク,limit",
  //   caption:"確実リミットb接点",
  //   did:"07-08-04",
  //   discription:""
  // },
  // {
  //   id: MAKE_CONTACT_TEMPERRATURE,
  //   search:"make,a接点,メーク,温度",
  //   caption:"温度感知a接点",
  //   did:"07-09-01",
  //   discription:""
  // },
  // {
  //   id: BREAK_CONTACT_TEMPERRATURE,
  //   search:"break,ブレイク,温度",
  //   caption:"温度感知b接点",
  //   did:"07-09-02",
  //   discription:""
  // },
  // {
  //   id: BREAK_CONTACT_THERMAL,
  //   search:"break,ブレイク,サーマル",
  //   caption:"自己動作温度b接点",
  //   did:"07-09-03",
  //   discription:""
  // },
  // {
  //   id: MULTI_POSITION_SWITCH,
  //   search:"多段,スイッチ,multi,position,switch",
  //   caption:"多段スイッチ",
  //   did:"07-11-04",
  //   discription:""
  // },
  // {
  //   id: FOUR_POSITION_SWITCH,
  //   search:"多段,4段,スイッチ,position,switch",
  //   caption:"4段スイッチ",
  //   did:"07-11-05",
  //   discription:""
  // },
  // {
  //   id: MULTI_POSITION_SWITCH_DIAGRAM,
  //   search:"多段,スイッチ,位置,multi,position,switch",
  //   caption:"位置図付き多段スイッチ",
  //   did:"07-12-04",
  //   discription:""
  // },
  {
    id: MAKE_CONTACTOR,
    search:"make,a接点,メーク,contactor,コンタクタ,電磁,接触器",
    caption:"電磁接触器a接点",
    did:"7-13-02",
    discription:"電磁接触器の主回路または補助回路のa接点を示します。リレーよりも大電流の開閉能力を持ち、モータなどの高負荷機器の起動・運転に使用されます。"
  },
  // {
  //   id: MAKE_CONTACTOR_AUTO_TRIP,
  //   search:"make,a接点,メーク,contactor,コンタクタ,電磁,接触器,trip,トリップ,オート",
  //   caption:"電磁接触器a接点(オートトリップ)",
  //   did:"7-13-03",
  //   discription:""
  // },
  {
    id: BREAK_CONTACTOR,
    search:"break,b接点,ブレイク,contactor,コンタクタ,電磁,接触器",
    caption:"電磁接触器b接点",
    did:"7-13-04",
    discription:"電磁接触器の補助回路のb接点を示します。主に電磁接触器が動作していないことの確認や、インターロック（相互の同時動作防止）回路に利用されます。"
  },
  {
    id: CIRCUIT_BREAKER,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,1P",
    caption:"サーキットブレーカ1極",
    did:"7-13-08",
    discription:"1極（単相または直流）の配線用遮断器（ノーヒューズブレーカなど）を示します。過電流や短絡事故が発生した際に、自動で回路を遮断し機器を保護します。"
  },
  {
    id: CIRCUIT_2P_BREAKER,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,2P",
    caption:"サーキットブレーカ2極",
    did:"-",
    discription:"2極（単相2線、または三相の一部）の配線用遮断器を示します。過負荷や短絡から回路を保護し、手動での開閉操作も可能です。"
  },
  {
    id: CIRCUIT_3P_BREAKER,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,3P",
    caption:"サーキットブレーカ3極",
    did:"-",
    discription:"3極（三相3線）の配線用遮断器を示します。動力回路などの三相電源ラインを一括で保護・遮断する目的で使用されます。"
  },
  // {
  //   id: COIL_GENEREL,
  //   search:"coil,コイル,一般",
  //   caption:"コイル(一般)",
  //   did:"7-15-01",
  //   discription:""
  // },
  // {
  //   id: THERMAL_RERAY,
  //   search:"coil,reray,thermal,サーマル,リレー,コイル,熱動継電器",
  //   caption:"サーマルリレー",
  //   did:"7-15-21",
  //   discription:""
  // },
  // {
  //   id: TOUCH_SENSOR,
  //   search:"sensor,センサー,タッチ,touch",
  //   caption:"タッチセンサー",
  //   did:"7-19-04",
  //   discription:""
  // },
  // {
  //   id: TOUCH_SENSITIVE_SWITCH,
  //   search:"sensor,センサー,タッチ,スイッチ,touch",
  //   caption:"タッチセンサースイッチ",
  //   did:"7-20-01",
  //   discription:""
  // },
  // {
  //   id: PROXIMITY_SWITCH,
  //   search:"sensor,センサー,近接,PROXIMITY",
  //   caption:"近接センサ",
  //   did:"7-20-02",
  //   discription:""
  // },
  // {
  //   id: FUSE,
  //   search:"ヒューズ,fuze",
  //   caption:"ヒューズ(一般図)",
  //   did:"7-21-02",
  //   discription:""
  // },
  // {
  //   id: FUSE_STRIKER,
  //   search:"ヒューズ,fuze,striker,ストライカー",
  //   caption:"ストライカー付きヒューズ",
  //   did:"7-21-03",
  //   discription:""
  // },
  // {
  //   id: FUSE_SWITCH,
  //   search:"ヒューズ,fuze,スイッチ",
  //   caption:"ヒューズスイッチ",
  //   did:"7-21-07",
  //   discription:""
  // },
  // {
  //   id: MOTOR,
  //   search:"motor,モータ,",
  //   caption:"モータ（一般図)",
  //   did:"06-04-01",
  //   discription:""
  // },
  // {
  //   id: LINER_MOTOR,
  //   search:"motor,モータ,liner,リニア",
  //   caption:"リニアモータ（一般図)",
  //   did:"06-04-02",
  //   discription:""
  // },
  // {
  //   id: STEPPING_MOTOR,
  //   search:"motor,モータ,stepping,ステッピング",
  //   caption:"ステッピングモータ",
  //   did:"06-04-03",
  //   discription:""
  // },
  // {
  //   id: THEMOCOUPLE,
  //   search:"themocouple,熱電対",
  //   caption:"熱電対",
  //   did:"08-06-01",
  //   discription:""
  // },
  // {
  //   id: LAMP,
  //   search:"lamp,ランプ",
  //   caption:"ランプ",
  //   did:"08-10-01",
  //   discription:""
  // },
  // {
  //   id: BUZZER,
  //   search:"ブザー,buzzer",
  //   caption:"ブザー",
  //   did:"08-10-10",
  //   discription:""
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