


//% color=194 weight=97 icon="\uf206" block="Motors"
namespace motors {
    let PWMA = AnalogPin.P8;
    let AIN1 = DigitalPin.P13;
    let AIN2 = DigitalPin.P12;
    let PWMB = AnalogPin.P16;
    let BIN1 = DigitalPin.P14;
    let BIN2 = DigitalPin.P15;
    let S0_PIN = AnalogPin.P0;
    let S1_PIN = AnalogPin.P1;
    let S2_PIN = AnalogPin.P2;

    export enum Motor {
        //% block="A"
        A = 0,
        //% block="B"
        B = 1
    }

    export enum Servo {
        //%block="P0"
        P0 = 0,

        //%block="P1"
        P1 = 1,

        //%block="P2"
        P2 = 2
    }

    export enum Direction {
        forward=0,
        backward=1
    }

    //% block="Start moving Motor %motor %direction in %speed speed"
    //% speed.min=0 speed.max=16 
    //% weight=3
    export function move_motor(motor: Motor, direction: Direction, speed: number) : void {
        speed = speed * 64 - 1; // map 0 to 1023
        switch (motor) {
            case Motor.A: {
                pins.digitalWritePin(AIN1, direction == Direction.forward ? 0 : 1)
                pins.digitalWritePin(AIN2, direction == Direction.forward ? 1 : 0)

                pins.analogWritePin(PWMA, speed)

                break;
            }

            case Motor.B: {
                pins.digitalWritePin(BIN1, direction == Direction.forward ? 0 : 1)
                pins.digitalWritePin(BIN2, direction == Direction.forward ? 1 : 0)

                pins.analogWritePin(PWMB, speed)

                break;
            }
        }
        

    }

    //% block="Stop Motor %motor"
    //% weight=2
    export function stop_motor(motor: Motor) {
        switch (motor) {
            case Motor.A: {
                pins.analogWritePin(PWMA, 0)
                break;
            }

            case Motor.B: {
                pins.analogWritePin(PWMB, 0)
                break;
            }
        }
    }
    //%angle.min=0 angle.max=180
    //%weight=1
    //% block="Set %servo to angle %angle"
    export function servo_write(servo: Servo, angle: number) {
        let temp = angle * 10 + 500
        switch (servo) {
            case Servo.P0:{
                pins.analogWritePin(S0_PIN, temp)

                break;
            }

            case Servo.P1: {
                pins.analogWritePin(S1_PIN, temp)

                break;
            }

            case Servo.P2: {
                pins.analogWritePin(S2_PIN, temp)

                break;
            }
        }
    }
}