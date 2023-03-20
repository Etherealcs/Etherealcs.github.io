import { _decorator, Component, Node,SystemEvent ,Input,KeyCode, input,Event,EventKeyboard,Vec3  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property({ type: Vec3 })
    moveSpeed: Vec3 = new Vec3(200, 200); // 精灵移动速度

    private _direction: Vec3 = new Vec3(0, 0,0); // 精灵移动方向

    start () {
        // 监听键盘按下事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        // 监听键盘抬起事件
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        // 取消监听键盘事件
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update (deltaTime: number) {
        // 计算精灵移动距离
        let distance = this.moveSpeed.clone().multiply(this._direction).multiplyScalar(deltaTime);
        // 更新精灵位置
        this.node.position = this.node.position.add(distance);
    }

    private onKeyDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this._direction.y = 1;
                break;
            case KeyCode.ARROW_DOWN:
                this._direction.y = -1;
                break;
            case KeyCode.ARROW_LEFT:
                this._direction.x = -1;
                break;
            case KeyCode.ARROW_RIGHT:
                this._direction.x = 1;
                break;
        }
    }

    private onKeyUp (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this._direction.y = 0;
                break;
            case KeyCode.ARROW_DOWN:
                this._direction.y = 0;
                break;
            case KeyCode.ARROW_LEFT:
                this._direction.x = 0;
                break;
            case KeyCode.ARROW_RIGHT:
                this._direction.x = 0;
                break;
        }
    }
}

