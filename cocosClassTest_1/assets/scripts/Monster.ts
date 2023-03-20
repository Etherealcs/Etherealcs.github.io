import { _decorator, Component, Node, Vec3, find } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('Monster')
export class Monster extends Component {
    @property(Node)
    player: Node = null;
    @property
    speed: number = 60;

    @property
    stopDistance: number = 50;
    private direction: Vec3 = Vec3.ZERO;
    start() {
        this.schedule(this.updateDirection, 0.5);
    }

    private updateDirection() {
        if (this.player) {
            this.direction = this.player.position.clone().subtract(this.node.position).normalize();
        }
    }

    update(deltaTime: number) {
        if (this.player) {
            const distance = this.node.position.clone().subtract(this.player.position).length();
            if (distance > this.stopDistance) {
                this.node.position = this.node.position.add(this.direction.multiplyScalar(this.speed * deltaTime));
            }
        }
    }
}



