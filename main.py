Fake = False
Driving = False

def on_button_pressed_a():
    global Driving

    if not (Driving):
        if not (Fake):
            MotorDriver.motor_run(Motor.A, Dir.FORWARD, 10)
        else:
            motors.move_motor(motors.Motor.A, motors.Direction.FORWARD, 10)
    elif not (Fake):
        MotorDriver.motor_stop(Motor.A)
    else:
        motors.stop_motor(motors.Motor.A)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global Fake
    Fake = not (Fake)

    if Fake:
        basic.show_icon(IconNames.HEART)
        return
    
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_pressed_b)
