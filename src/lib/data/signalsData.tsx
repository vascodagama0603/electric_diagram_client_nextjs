
export const DEVICE_1P = "S00060_1P"
export const DEVICE_2P = "S00060_2P"
export const DEVICE_3P = "S00060_3P"
export const MAKE_CONTACT = "S00227"
export const BREAK_CONTACT = "S00229"
export const TWO_MAKE_CONTACT = "S00234"
export const TWO_BREAK_CONTACT = "S00235"
export const MIRROR_CONTACT = "S01462"
export const MAKE_CONTACT_DELAYED_CLOSING = "S00243"
export const MAKE_CONTACT_DELAYED_OPENING = "S00244"
export const BREAK_CONTACT_DELAYED_OPENING = "S00245"
export const BREAK_CONTACT_DELAYED_CLOSING = "S00246"
export const MAKE_CONTACT_DELAYED = "S00247"
export const BREAK_CONTACT_DELAYED = "S01911"
//export const MAKE_CONTACT_MANUAL = "S00250"
//export const BREAK_CONTACT_MANUAL = "S00171+S00225"
//export const MAKE_CONTACT_GENERAL_MANUAL = "S00253"
export const MAKE_CONTACT_PUSH_BUTTON = "S00254"
export const MAKE_CONTACT_PUSH_BUTTON_POSITIBVE = "S00257"
export const BREAK_CONTACT_PUSH_BUTTON = "S00171+S00229"
export const MAKE_CONTACT_PULL_BUTTON = "S00255"
export const MAKE_CONTACT_TWIST_BUTTON = "S00256"
export const BREAK_CONTACT_EMERGENCY_STOP = "S00258"
export const MAKE_CONTACT_LIMIT = "S00259"
export const BREAK_CONTACT_LIMIT = "S00260"
//export const ASSEMBLY_CONTACT_LIMIT = "S00261"
export const BREAK_CONTACT_LIMIT_POSITIVE = "S00262"
export const MAKE_CONTACT_TEMPERRATURE = "S00263"
export const BREAK_CONTACT_TEMPERRATURE = "S00264"
export const BREAK_CONTACT_THERMAL = "S00265"
//export const MULTI_POSITION_SWITCH = "S00270"
//export const FOUR_POSITION_SWITCH = "S00271"
//export const MULTI_POSITION_SWITCH_DIAGRAM = "S00272"
export const MAKE_CONTACTOR = "S00284"
export const MAKE_CONTACTOR_2P = "S00284_2P"
export const MAKE_CONTACTOR_3P = "S00284_3P"
//export const MAKE_CONTACTOR_AUTO_TRIP = "S00285"
export const BREAK_CONTACTOR = "S00286"
export const CIRCUIT_BREAKER = "S00287"
export const CIRCUIT_2P_BREAKER = "S00287_2P"
export const CIRCUIT_3P_BREAKER = "S00287_3P"
export const ELB_2P = "S00144+S00287_2P"
export const ELB_3P = "S00144+S00287_3P"
export const COIL_GENEREL = "S00305"
export const THERMAL_RERAY_1P = "S00325"
export const THERMAL_RERAY_2P = "S00325_2P"
export const THERMAL_RERAY_3P = "S00325_3P"
export const TOUCH_SENSOR = "S00357"
export const TOUCH_SENSITIVE_SWITCH = "S00358"
export const PROXIMITY_SWITCH = "S00359"
export const FUSE = "S00362"
export const FUSE_STRIKER = "S00364"
export const FUSE_SWITCH = "S00368"
export const MOTOR_2P = "S00819_2P"
export const MOTOR_3P = "S00819_3P"
export const LINER_MOTOR_2P = "S00820_2P"
export const LINER_MOTOR_3P = "S00820_3P"
export const STEPPING_MOTOR_2P = "S00821_2P"
export const STEPPING_MOTOR_3P = "S00821_3P"
export const THEMOCOUPLE = "S00952"
export const LAMP = "S00965"
export const BUZZER = "S00973"
/*
const FUN = "S01421"
const PUMP = "S01422"
*/  
export const Signals = [
  {
    id: DEVICE_1P,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"device,デバイス,四角,装置,部品,1P",
    caption:"デバイス1極",
    did:"02-01-02(1P)",
    discription:"1極の装置,デバイス,機能部品,構成部品などに使用します。"
  },
  {
    id: DEVICE_2P,
    wire:2,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"device,デバイス,四角,装置,部品,2P",
    caption:"デバイス2極",
    did:"02-01-02(2P)",
    discription:"2極の装置,デバイス,機能部品,構成部品などに使用します。"
  },
  {
    id: DEVICE_3P,
    wire:3,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"device,デバイス,四角,装置,部品,3P",
    caption:"デバイス3極",
    did:"02-01-02(3P)",
    discription:"3極の装置,デバイス,機能部品,構成部品などに使用します。"
  },
  {
    id: MAKE_CONTACT,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク",
    caption:"a接点",
    did:"07-02-01",
    discription:"a接点（常開接点）は、リレーや接触器に電源が投入されていない待機状態（非励磁状態）のときに開いており、電源が投入されると閉じる接点です。最も一般的に使用される接点で、回路図では接点番号の末尾に「a」を付けて示されます。主に回路の投入や起動に使用されます。"
  },
  {
    id: BREAK_CONTACT,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"break,b接点,ブレイク",
    caption:"b接点",
    did:"07-02-03",
    discription:"b接点（常閉接点）は、待機状態（非励磁状態）のときに閉じており、電源が投入されると開く接点です。回路図では接点番号の末尾に「b」を付けて示されます。主に回路の停止やインターロック、安全回路に使用され、電源喪失時に回路が遮断されるフェイルセーフな用途にも適しています。"
  },
  {
    id: TWO_MAKE_CONTACT,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,二重",
    caption:"二重a接点",
    did:"07-02-08",
    discription:"二つのa接点を並列に接続したシンボルで、冗長性（信頼性）を高めるために使用されます。片方の接点が故障してももう一方が動作することで、回路の投入を確実に行います。"
  },
  {
    id: TWO_BREAK_CONTACT,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"break,b接点,メーク,二重",
    caption:"二重b接点",
    did:"07-02-09",
    discription:"二つのb接点を直列に接続したシンボルで、安全性を高めるために使用されます。両方の接点が開かない限り回路は遮断されないため、安全インターロックや非常停止回路の信頼性向上に利用されます。"
  },
  {
    id: MIRROR_CONTACT,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,ミラー",
    caption:"安全開離機能a接点",
    did:"07-02-10",
    discription:"ミラー接点とも呼ばれ、安全リレーなどに使用される信頼性の高いa接点です。リレーのb接点が開く前に、このa接点が閉じることはないという安全機能が保証されており、非常停止などの安全回路の監視に使用されます。"
  },
  {
    id: MAKE_CONTACT_DELAYED_CLOSING,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,off,delay",
    caption:"a接点(オフディレイ)",
    did:"07-05-01",
    discription:"a接点(オフディレイ)は、リレーへの電源が切断された後、設定された時間が経過してから動作（開く）するタイマー接点です。オフディレイは「復帰遅延」とも呼ばれ、特定の機器を一定時間動かし続ける場合などに利用されます。"
  },
  {
    id: MAKE_CONTACT_DELAYED_OPENING,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,on,delay",
    caption:"a接点(オンディレイ)",
    did:"07-05-02",
    discription:"a接点(オンディレイ)は、リレーに電源が投入されてから、設定された時間が経過した後に動作（閉じる）するタイマー接点です。オンディレイは「動作遅延」とも呼ばれ、機器の起動タイミングを遅らせるインターロックやシーケンス制御で頻繁に利用されます。"
  },
  {
    id: BREAK_CONTACT_DELAYED_OPENING,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"break,b接点,ブレイク,off,delay",
    caption:"b接点(オフディレイ)",
    did:"07-05-03",
    discription:"b接点(オフディレイ)は、リレーへの電源が切断された後、設定された時間が経過するまで動作（開く→閉じる）しないタイマー接点です。回路の停止や復旧の順序を調整する目的で利用されます。"
  },
  {
    id: BREAK_CONTACT_DELAYED_CLOSING,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"break,b接点,ブレイク,on,,delay",
    caption:"b接点(オンディレイ)",
    did:"07-05-04",
    discription:"b接点(オンディレイ)は、リレーに電源が投入されてから、設定された時間が経過した後に動作（閉じる→開く）するタイマー接点です。特定の条件が満たされた後、一定の時間を置いてから回路を遮断する用途に利用されます。"
  },
  {
    id: MAKE_CONTACT_DELAYED,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,on,off,delay",
    caption:"a接点(オンディレイオフディレイ)",
    did:"07-05-05",
    discription:"a接点(オンディレイオフディレイ)は、電源投入時と切断時の両方で時間遅れ動作を持つタイマー接点です。複雑なシーケンス制御において、起動と停止の両方のタイミングを精密に調整する際に使用されます。"
  },
  {
    id: BREAK_CONTACT_DELAYED,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"break,b接点,ブレイク,on,off,delay",
    caption:"b接点(オンディレイオフディレイ)",
    did:"-",
    discription:"b接点(オンディレイオフディレイ)は、電源投入時と切断時の両方で時間遅れ動作を持つタイマー接点です。複雑なインターロックや安全回路において、遮断と復帰の両方のタイミングを精密に調整する際に使用されます。"
  },
  // {
  //   id: MAKE_CONTACT_MANUAL,
  //   search:"make,a接点,メーク,マニュアル,ボタン,manual",
  //   caption:"マニュアルボタンa接点",
  //   did:"07-A6-02(旧図)",
  //   discription:"保護枠付きや手動操作を示す押しボタンスイッチのa接点です。通常、操作者が直接触れて回路を投入するために使用されます。"
  // },
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
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,push",
    caption:"押しボタンa接点",
    did:"07-07-02",
    discription:"押しボタンスイッチのa接点（常開）を示します。ボタンを押している間だけ回路を閉じるモーメンタリ動作に多く利用され、回路の始動（スタート）に用いられます。"
  },
  {
    id: BREAK_CONTACT_PUSH_BUTTON,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"break,b接点,ブレイク,push",
    caption:"押しボタンb接点",
    did:"-",
    discription:"押しボタンスイッチのb接点（常閉）を示します。ボタンを押している間だけ回路を開くモーメンタリ動作に多く利用され、回路の停止（ストップ）に用いられます。"
  },
  {
    id: MAKE_CONTACT_PUSH_BUTTON_POSITIBVE,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,push",
    caption:"押しボタンa接点",
    did:"07-07-05",
    discription:"強制開離（ポジティブオープニング）機能を持つ押しボタンスイッチのa接点です。接点の溶着などの異常時でも、ボタンを操作すれば必ず接点が開く構造となっており、安全規格が要求される回路に用いられます。"
  },
  {
    id: MAKE_CONTACT_PULL_BUTTON,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,pull",
    caption:"引きボタンa接点",
    did:"07-07-03",
    discription:"プルスイッチや、操作部を引くことで動作するタイプの押しボタンスイッチのa接点を示します。主に特定の操作や解除に使用されます。"
  },
  {
    id: MAKE_CONTACT_TWIST_BUTTON,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,twist",
    caption:"ひねりボタンa接点",
    did:"07-07-04",
    discription:"**ひねり操作（ツイスト）**で保持・解除を行うタイプのスイッチのa接点を示します。ロックされた状態を解除してから操作する用途などに用いられます。"
  },
  {
    id: BREAK_CONTACT_EMERGENCY_STOP,
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"ブレイク,b接点,emergency,break",
    caption:"非常停止ボタン",
    did:"07-07-06",
    discription:"危険な状態が発生した際に、回路を強制的に遮断するためのラッチング式のb接点です。フェイルセーフ設計に基づいており、最も高い安全性が求められる回路で使用されます。"
  },
  {
    id: MAKE_CONTACT_LIMIT,
    wire:1,
    search:"make,a接点,メーク,limit",
    caption:"リミット接点",
    did:"07-08-01",
    discription:"機械的な移動や位置を検出するリミットスイッチのa接点です。機械部品が所定の位置に到達したことを検出する用途（例：動作開始条件）に用いられます。"
  },
  {
    id: BREAK_CONTACT_LIMIT,
    wire:1,
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
  {
    id: BREAK_CONTACT_LIMIT_POSITIVE,
    wire:1,
    search:"break,ブレイク,limit",
    caption:"確実リミットb接点",
    did:"07-08-04",
    discription:"強制開離（ポジティブオープニング）機能を持つリミットスイッチのb接点です。接点の溶着などの異常時でも、機械的な力によって確実に開く（回路を遮断する）構造となっており、機械の安全機構などに利用されます。"
  },
  {
    id: MAKE_CONTACT_TEMPERRATURE,
    wire:1,
    search:"make,a接点,メーク,温度",
    caption:"温度感知a接点",
    did:"07-09-01",
    discription:"温度上昇により動作する温度スイッチのa接点です。設定温度を超えると閉じ、回路を投入（例：冷却ファン起動）するなどの制御に使用されます。"
  },
  {
    id: BREAK_CONTACT_TEMPERRATURE,
    wire:1,
    search:"break,ブレイク,温度",
    caption:"温度感知b接点",
    did:"07-09-02",
    discription:"温度上昇により動作する温度スイッチのb接点です。設定温度を超えると開き、回路を遮断（例：ヒーター停止）するなどの制御に使用されます。"
  },
  {
    id: BREAK_CONTACT_THERMAL,
    wire:1,
    search:"break,ブレイク,サーマル",
    caption:"自己動作温度b接点",
    did:"07-09-03",
    discription:"機器自体（例：モーター巻線）の過熱を感知して動作するb接点です。サーマルプロテクターの接点として利用され、異常発熱時に回路を遮断し、機器の焼損を防ぎます。"
  },
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
    wire:1,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,contactor,コンタクタ,電磁接触器,電磁,接触器,1極,1P",
    caption:"電磁接触器a接点",
    did:"7-13-02",
    discription:"電磁接触器の主回路または補助回路のa接点を示します。リレーよりも大電流の開閉能力を持ち、モータなどの高負荷機器の起動・運転に使用されます。"
  },
  {
    id: MAKE_CONTACTOR_2P,
    wire:2,
    start_x:[0],
    start_y:[0],
    end_x:[0],
    end_y:[0],
    search:"make,a接点,メーク,contactor,コンタクタ,電磁接触器,電磁,接触器,2極,2P",
    caption:"電磁接触器a接点2極",
    did:"7-13-02(2P)",
    discription:"2極の電磁接触器の主回路または補助回路のa接点を示します。リレーよりも大電流の開閉能力を持ち、モータなどの高負荷機器の起動・運転に使用されます。"
  },
  {
    id: MAKE_CONTACTOR_3P,
    wire:3,
    end_x:[0,-3,-6],
    end_y:[-6,-6,-6],
    search:"make,a接点,メーク,contactor,コンタクタ,電磁接触器,電磁,接触器,3極,3P",
    caption:"電磁接触器a接点3極",
    did:"7-13-02(3P)",
    discription:"3極の電磁接触器の主回路または補助回路のa接点を示します。リレーよりも大電流の開閉能力を持ち、モータなどの高負荷機器の起動・運転に使用されます。"
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
    wire:1,
    search:"break,b接点,ブレイク,contactor,コンタクタ,電磁接触器,電磁,接触器",
    caption:"電磁接触器b接点",
    did:"7-13-04",
    discription:"電磁接触器の補助回路のb接点を示します。主に電磁接触器が動作していないことの確認や、インターロック（相互の同時動作防止）回路に利用されます。"
  },
  {
    id: CIRCUIT_BREAKER,
    wire:1,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,1極,1P",
    caption:"サーキットブレーカ1極",
    did:"7-13-05",
    discription:"1極（単相または直流）の配線用遮断器（ノーヒューズブレーカなど）を示します。過電流や短絡事故が発生した際に、自動で回路を遮断し機器を保護します。"
  },
  {
    id: CIRCUIT_2P_BREAKER,
    wire:2,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,2極,2P",
    caption:"サーキットブレーカ2極",
    did:"7-13-05(2P)",
    discription:"2極（単相2線、または三相の一部）の配線用遮断器を示します。過負荷や短絡から回路を保護し、手動での開閉操作も可能です。"
  },
  {
    id: CIRCUIT_3P_BREAKER,
    wire:3,
    search:"make,a接点,メーク,サーキットブレーカ,circuit,3極,3P",
    caption:"サーキットブレーカ3極",
    did:"7-13-05(3P)",
    discription:"3極（三相3線）の配線用遮断器を示します。動力回路などの三相電源ラインを一括で保護・遮断する目的で使用されます。"
  },
  {
    id: ELB_2P,
    wire:2,
    search:"make,a接点,メーク,漏電遮断器,ELB,circuit,2極,2P",
    caption:"漏電遮断器2極",
    did:"7-13-08 + 06-13-11(2P)",
    discription:"漏電保護と過電流保護（短絡・過負荷）の機能を併せ持つ遮断器（Earth Leakage Breaker）のシンボルです。2極（単相2線など）の回路に使用され、地絡（漏電）電流を検出した場合、または定格以上の電流が流れた場合に、瞬時に回路を遮断し、感電事故や火災を防ぎます。"
  },
  {
    id: ELB_3P,
    wire:3,
    search:"make,a接点,メーク,漏電遮断器,ELB,circuit,3極,3P",
    caption:"漏電遮断器3極",
    did:"7-13-08 + 06-13-11(3P)",
    discription:"漏電遮断器3極 | 漏電保護と過電流保護（短絡・過負荷）の機能を併せ持つ遮断器です。3極（三相3線など）の動力回路に使用され、三相電源を一括で保護します。回路の安全確保と法規遵守のために、主電源回路や特定の負荷回路に設置されます。"
  },
  {
    id: COIL_GENEREL,
    wire:1,
    search:"coil,コイル,一般",
    caption:"コイル(一般)",
    did:"7-15-01",
    discription:"リレー、電磁接触器、電磁弁などの操作部（電磁石）を示す一般的なシンボルです。このコイルに電圧をかけることで、関連する接点群が動作します。"
  },
  {
    id: THERMAL_RERAY_1P,
    wire:1,
    search:"coil,reray,thermal,サーマル,リレー,コイル,熱動継電器,1素子,1E,1P",
    caption:"サーマルリレー1素子",
    did:"7-15-21",
    discription:"熱動継電器の主回路部分のシンボルです。モーターなどの過負荷による発熱を検出・保護するリレーであり、1極（単相または直流）の電流を検出します。"
  },
  {
    id: THERMAL_RERAY_2P,
    wire:3,
    search:"coil,reray,thermal,サーマル,リレー,コイル,熱動継電器,2素子,2E,3極,3P",
    caption:"サーマルリレー3極2素子",
    did:"7-15-21(3P2E)",
    discription:"3相2素子の電流を検出する熱動継電器の主回路シンボルです。"
  },
  {
    id: THERMAL_RERAY_3P,
    wire:3,
    search:"coil,reray,thermal,サーマル,リレー,コイル,熱動継電器,3素子,3E,3極,3P",
    caption:"サーマルリレー3素子",
    did:"7-15-21(3P3E)",
    discription:"3相3素子の電流を検出する熱動継電器の主回路シンボルです。三相交流モーターの過負荷保護に最も広く利用されます。"
  },
  {
    id: TOUCH_SENSOR,
    wire:1,
    search:"sensor,センサー,タッチ,touch",
    caption:"タッチセンサー",
    did:"7-19-04",
    discription:"物理的な接触を検出するセンサーです。操作盤のボタンや、ロボットなどの接触検出に使われます。"
  },
  {
    id: TOUCH_SENSITIVE_SWITCH,
    wire:1,
    search:"sensor,センサー,タッチ,スイッチ,touch",
    caption:"タッチセンサースイッチ",
    did:"7-20-01",
    discription:"物理的な圧力や接触に感応し、接点の開閉を行うスイッチです。静電容量式や感圧式のものが含まれ、機械的な動きがない操作部に利用されます。"
  },
  {
    id: PROXIMITY_SWITCH,
    wire:1,
    search:"sensor,センサー,近接,PROXIMITY",
    caption:"近接センサ",
    did:"7-20-02",
    discription:"検出対象（金属など）が特定の距離に近づいたことを非接触で検出するセンサーです。工作機械の位置決めや、部品の有無検出に広く利用されます。"
  },
  {
    id: FUSE,
    wire:1,
    search:"ヒューズ,fuze",
    caption:"ヒューズ(一般図)",
    did:"7-21-02",
    discription:"回路の短絡や過電流が発生した際に、溶断することで回路を遮断し、後段の機器を保護する保護装置のシンボルです。"
  },
  {
    id: FUSE_STRIKER,
    wire:1,
    search:"ヒューズ,fuze,striker,ストライカー",
    caption:"ストライカー付きヒューズ",
    did:"7-21-03",
    discription:"ヒューズが溶断した際に、内蔵されたピン（ストライカー）が飛び出す構造を持つヒューズです。このピンの飛び出しを検出することで、ヒューズ切れを外部に知らせる監視機能に利用されます。"
  },
  {
    id: FUSE_SWITCH,
    wire:1,
    search:"ヒューズ,fuze,スイッチ",
    caption:"ヒューズスイッチ",
    did:"7-21-07",
    discription:"ヒューズ（過電流保護）とスイッチ（手動開閉）の機能を一体化した機器のシンボルです。回路を物理的に開閉できるため、安全な保守・点検のために電源を遮断する用途や、保護と同時に電源投入を行う主回路の開閉器として使用されます。"
  },
  {
    id: MOTOR_2P,
    wire:2,
    search:"motor,モータ,2極,2P",
    caption:"モータ2極（一般図)",
    did:"06-04-01(2P)",
    discription:"一般的な2極の電動機のシンボルです。電気エネルギーを回転運動（動力）に変換する機器を示し、ポンプ、コンベヤ、ファンなどの駆動源として使用されます。"
  },
  {
    id: MOTOR_3P,
    wire:3,
    search:"motor,モータ,3極,3P",
    caption:"モータ3極（一般図)",
    did:"06-04-01(3P)",
    discription:"一般的な3極の電動機のシンボルです。電気エネルギーを回転運動（動力）に変換する機器を示し、ポンプ、コンベヤ、ファンなどの駆動源として使用されます。"
  },
  {
    id: LINER_MOTOR_2P,
    wire:2,
    search:"motor,モータ,liner,リニア,2極,2P",
    caption:"リニアモータ2極",
    did:"06-04-02(2P)",
    discription:"電気エネルギーを直線運動に変換する2極の電動機のシンボルです。高速・高精度の位置決めが必要な搬送装置などに使用されます。"
  },
  {
    id: LINER_MOTOR_3P,
    wire:3,
    search:"motor,モータ,liner,リニア,3極,3P",
    caption:"リニアモータ3極",
    did:"06-04-02(3P)",
    discription:"電気エネルギーを直線運動に変換する3極の電動機のシンボルです。高速・高精度の位置決めが必要な搬送装置などに使用されます。"
  },
  {
    id: STEPPING_MOTOR_2P,
    wire:2,
    search:"motor,モータ,stepping,ステッピング,2極,2P",
    caption:"ステッピングモータ2極",
    did:"06-04-03(2P)",
    discription:"パルス信号に応じて段階的に回転するモーターです。正確な角度制御や位置決めが必要な用途（例：プリンター、精密機器）に使用されます。"
  },
  {
    id: STEPPING_MOTOR_3P,
    wire:3,
    search:"motor,モータ,stepping,ステッピング,3極,3P",
    caption:"ステッピングモータ3極",
    did:"06-04-03(3P)",
    discription:"パルス信号に応じて段階的に回転するモーターです。正確な角度制御や位置決めが必要な用途（例：プリンター、精密機器）に使用されます。"
  },
  {
    id: THEMOCOUPLE,
    wire:2,
    search:"themocouple,熱電対",
    caption:"熱電対",
    did:"08-06-01",
    discription:"異なる種類の金属線の接合部で発生する熱起電力を利用し、温度を測定するセンサーです。高温計測などに広く利用されます。"
  },
  {
    id: LAMP,
    wire:1,
    search:"lamp,ランプ",
    caption:"ランプ",
    did:"08-10-01",
    discription:"機器の状態（例：運転中、停止、異常）を視覚的に知らせる表示灯のシンボルです。"
  },
  {
    id: BUZZER,
    wire:2,
    search:"ブザー,buzzer",
    caption:"ブザー",
    did:"08-10-10",
    discription:"機器の異常や状態変化を聴覚的に知らせる警報器のシンボルです。"
  },
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