import { _decorator, Component, Node, Prefab, instantiate, RigidBody2D, Vec2, input, Input, EventKeyboard, macro } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Fire extends Component {
    @property(Prefab)
    bulletPrefab: Prefab = null;

    @property
    bulletSpeed: number = 0;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === macro.KEY.space) {
            const bullet = instantiate(this.bulletPrefab);
            bullet.position = this.node.position;
            this.node.parent?.addChild(bullet);
            const rigidBody = bullet.getComponent(RigidBody2D);
            if (rigidBody) {
                rigidBody.linearVelocity = new Vec2(this.bulletSpeed,0);
            }
        }
    }
}


