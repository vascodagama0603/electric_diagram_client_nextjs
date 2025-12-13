import * as data from './signalsData'
import {Specification } from '../type'

export const SpecificationOrder = [
    "type",
    "signature",
    "phase",
    "volt",
    "amp",
    "ampTemp",
    "ampLimit",
    "sensitivity",
    "watt",
    "OffDelay",
    "OnDelay",
    "color",
    "maker",
    "modelNumber",
];

// SignalPropoertiesの単一要素の型
export type SignalProperty = {
    id: string;
    specification: Specification;
};

export const SignalPropoerties: SignalProperty[] = [
    {
        id:"3φ3w",
        specification:{
            type: "POWER",
            volt:0,
            phase:"3φ3w",
            amp: 0,
            signature: "POWER",
            signatureNumber:"01",
        }
    },
    {
        id:"1φ2w",
        specification:{
            type: "POWER",
            volt:0,
            phase:"1φ2w",
            amp: 0,
            signature: "POWER",
            signatureNumber:"01",
        }
    },
    {
        id:data.DEVICE_1P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "DEV",
            signatureNumber: "01",
            type: "DEVICE",
            amp: 0,
        }
    },
    {
        id:data.DEVICE_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "DEV",
            signatureNumber: "01",
            type: "DEVICE",
            amp: 0,
        }
    },
    {
        id:data.DEVICE_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "DEV",
            signatureNumber: "01",
            type: "DEVICE",
            amp: 0,
        }
    },
    {
        id:data.MAKE_CONTACT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.TWO_MAKE_CONTACT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.TWO_BREAK_CONTACT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MIRROR_CONTACT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACT_DELAYED_CLOSING,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "OFFDELAYSW",
            OffDelay: 0.0,
        }
    },
    {
        id:data.MAKE_CONTACT_DELAYED_OPENING,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "ONDELAYSW",
            OnDelay: 0.0,
        }
    },
    {
        id:data.BREAK_CONTACT_DELAYED_OPENING,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "OFFDELAYSW",
            OffDelay: 0.0,
        }
    },
    {
        id:data.BREAK_CONTACT_DELAYED_CLOSING,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "ONDELAYSW",
            OnDelay: 0.0,
        }
    },
    {
        id:data.MAKE_CONTACT_DELAYED,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "ONDELAYOFFDELAYSW",
            OnDelay: 0.0,
            OffDelay: 0.0,
        }
    },
    {
        id:data.BREAK_CONTACT_DELAYED,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "ONDELAYOFFDELAYSW",
            OnDelay: 0.0,
            OffDelay: 0.0,
        }
    },
    {
        id:data.MAKE_CONTACT_PUSH_BUTTON,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT_PUSH_BUTTON,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACT_PUSH_BUTTON_POSITIBVE,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACT_PULL_BUTTON,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACT_TWIST_BUTTON,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT_EMERGENCY_STOP,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACT_LIMIT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT_LIMIT,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT_LIMIT_POSITIVE,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACT_TEMPERRATURE,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT_TEMPERRATURE,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.BREAK_CONTACT_THERMAL,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "SW",
            signatureNumber: "01",
            type: "SW",
        }
    },
    {
        id:data.MAKE_CONTACTOR,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "MC",
            signatureNumber: "01",
            type: "MC",
            amp: 0,
        }
    },
    {
        id:data.MAKE_CONTACTOR_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "MC",
            signatureNumber: "01",
            type: "MC",
            amp: 0,
        }
    },
    {
        id:data.MAKE_CONTACTOR_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "MC",
            signatureNumber: "01",
            type: "MC",
            amp: 0,
        }
    },
    {
        id:data.BREAK_CONTACTOR,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "MC",
            signatureNumber: "01",
            type: "MC",
            amp: 0,
        }
    },
    {
        id:data.CIRCUIT_BREAKER,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "MC",
            signatureNumber: "01",
            type: "MC",
            amp: 0,
        }
    },
    {
        id:data.CIRCUIT_BREAKER,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "CP",
            signatureNumber: "01",
            type: "CP",
            amp: 0,
        }
    },
    {
        id:data.CIRCUIT_2P_BREAKER,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "CP",
            signatureNumber: "01",
            type: "CP",
            amp: 0,
        }
    },
    {
        id:data.CIRCUIT_3P_BREAKER,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "CP",
            signatureNumber: "01",
            type: "CP",
            amp: 0,
        }
    },
    {
        id:data.ELB_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "ELB",
            signatureNumber: "01",
            type: "ELB",
            amp: 0,
            sensitivity:0, 
        }
    },
    {
        id:data.ELB_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "ELB",
            signatureNumber: "01",
            type: "ELB",
            amp: 0,
            sensitivity:0, 
        }
    },
    {
        id:data.COIL_GENEREL,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "COIL",
            signatureNumber: "01",
            type: "COIL",
        }
    },
    {
        id:data.THERMAL_RERAY_1P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "THR",
            signatureNumber: "01",
            type: "THR",
            ampTemp: 0,
        }
    },
    {
        id:data.THERMAL_RERAY_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "THR",
            signatureNumber: "01",
            type: "THR",
            ampTemp: 0,
        }
    },
    {
        id:data.THERMAL_RERAY_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "THR",
            signatureNumber: "01",
            type: "THR",
            ampTemp: 0,
        }
    },
    {
        id:data.TOUCH_SENSOR,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "TS",
            signatureNumber: "01",
            type: "TS",
        }
    },
    {
        id:data.TOUCH_SENSITIVE_SWITCH,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "TS",
            signatureNumber: "01",
            type: "TS",
        }
    },
    {
        id:data.PROXIMITY_SWITCH,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "AP",
            signatureNumber: "01",
            type: "AP",
        }
    },
    {
        id:data.FUSE,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "FZ",
            signatureNumber: "01",
            type: "FZ",
            ampLimit:0
        }
    },
    {
        id:data.FUSE_STRIKER,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "FZ",
            signatureNumber: "01",
            type: "FZ",
            ampLimit:0
        }
    },
    {
        id:data.FUSE_SWITCH,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "FZ",
            signatureNumber: "01",
            type: "FZ",
            ampLimit:0
        }
    },
    {
        id:data.MOTOR_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "M",
            signatureNumber: "01",
            type: "M",
            watt:0
        }
    },
    {
        id:data.MOTOR_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "M",
            signatureNumber: "01",
            type: "M",
            watt:0
        }
    },
    {
        id:data.LINER_MOTOR_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "LM",
            signatureNumber: "01",
            type: "M",
            watt:0
        }
    },
    {
        id:data.LINER_MOTOR_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "LM",
            signatureNumber: "01",
            type: "M",
            watt:0
        }
    },
    {
        id:data.STEPPING_MOTOR_2P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "PM",
            signatureNumber: "01",
            type: "M",
            watt:0
        }
    },
    {
        id:data.STEPPING_MOTOR_3P,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "PM",
            signatureNumber: "01",
            type: "M",
            watt:0
        }
    },
    {
        id:data.THEMOCOUPLE,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "TC",
            signatureNumber: "01",
            type: "TC",
        }
    },
    {
        id:data.LAMP,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "PL",
            signatureNumber: "01",
            type: "PL",
            color: "",
        }
    },
    {
        id:data.BUZZER,
        specification:{
            modelNumber:"",
            maker:"",
            signature: "BZ",
            signatureNumber: "01",
            type: "BZ",
        }
    },
]
